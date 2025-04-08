from flask import Flask, jsonify
import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

# Load datasets
ratings_df = pd.read_csv("movies_ratings.csv")
titles_df = pd.read_csv("movies_titles.csv")

# Prepare user-item matrix
user_item_matrix = ratings_df.pivot_table(index='user_id', columns='show_id', values='rating')
user_item_filled = user_item_matrix.fillna(0)
R = user_item_filled.values

# Apply SVD
U, sigma, Vt = svds(R, k=15)
sigma = np.diag(sigma)
predicted_ratings = np.dot(np.dot(U, sigma), Vt)
predicted_ratings_df = pd.DataFrame(predicted_ratings, index=user_item_matrix.index, columns=user_item_matrix.columns)

# Build movie lookup
movie_lookup = titles_df[['show_id', 'title']].drop_duplicates().set_index('show_id')['title'].to_dict()

from sklearn.metrics.pairwise import cosine_similarity

# Build reverse lookup from title to show_id
reverse_lookup = {v: k for k, v in movie_lookup.items()}

def recommend_similar_movies(show_id, top_n=5):
    if show_id not in user_item_matrix.columns:
        return []

    # Get movie vector and compute cosine similarity with all others
    movie_idx = list(user_item_matrix.columns).index(show_id)
    movie_vector = Vt.T[movie_idx].reshape(1, -1)
    similarity_scores = cosine_similarity(movie_vector, Vt.T)[0]

    # Get top N most similar movies (excluding itself)
    similar_indices = np.argsort(similarity_scores)[::-1]
    similar_indices = [i for i in similar_indices if i != movie_idx][:top_n]
    similar_show_ids = [list(user_item_matrix.columns)[i] for i in similar_indices]

    return [movie_lookup.get(sid, f"Unknown ({sid})") for sid in similar_show_ids]


# Recommendation logic
def recommend_movies_for_user(user_id, top_n=5):
    if user_id not in predicted_ratings_df.index:
        return []
    user_ratings = predicted_ratings_df.loc[user_id]
    already_rated = ratings_df[ratings_df['user_id'] == user_id]['show_id'].tolist()
    user_ratings = user_ratings.drop(labels=already_rated, errors='ignore')
    top_recommendations = user_ratings.sort_values(ascending=False).head(top_n).index.tolist()
    return [movie_lookup.get(show_id, f"Unknown ({show_id})") for show_id in top_recommendations]

def get_top_movies_by_genre_column(genre_col, top_n=10, min_ratings=3):
    genre_ratings = pd.merge(ratings_df, titles_df[['show_id', 'title', genre_col]], on='show_id')
    genre_ratings = genre_ratings[genre_ratings[genre_col] == 1]

    avg_ratings = genre_ratings.groupby('show_id')['rating'].mean()
    count_ratings = genre_ratings.groupby('show_id')['rating'].count()

    filtered = avg_ratings[count_ratings >= min_ratings]
    top_ids = filtered.sort_values(ascending=False).head(top_n).index.tolist()

    return titles_df[titles_df['show_id'].isin(top_ids)][['show_id', 'title']].to_dict(orient='records')



@app.route("/")
def home():
    return "CineNiche Recommendation API"

@app.route("/api/recommend/user/<int:user_id>")
def recommend_user(user_id):
    rec_titles = recommend_movies_for_user(user_id)
    return jsonify({"user_id": user_id, "recommendations": rec_titles})

@app.route("/api/recommend/top-rated")
def top_rated():
    avg_ratings = ratings_df.groupby('show_id')['rating'].mean()
    count_ratings = ratings_df.groupby('show_id')['rating'].count()

    min_ratings = 3
    filtered = avg_ratings[count_ratings >= min_ratings]
    top_shows = filtered.sort_values(ascending=False).head(10).index.tolist()

    titles = [movie_lookup.get(show_id, f"Unknown ({show_id})") for show_id in top_shows]
    return jsonify({"recommendations": titles})

@app.route("/api/recommend/movie/<title>")
def recommend_movie(title):
    show_id = reverse_lookup.get(title)
    if show_id is None:
        return jsonify({"error": f"Movie '{title}' not found"}), 404

    similar_titles = recommend_similar_movies(show_id)
    return jsonify({"title": title, "recommendations": similar_titles})

@app.route("/api/recommend/genre")
def genre_based_recommendations():
    genre_columns = [col for col in titles_df.columns if col not in ['show_id', 'title', 'type', 'director', 'cast', 'country', 'release_year', 'rating', 'duration', 'description']]
    genre_recommendations = {}

    for genre in genre_columns:
        genre_ratings = pd.merge(ratings_df, titles_df[['show_id', 'title', genre]], on='show_id')
        genre_ratings = genre_ratings[genre_ratings[genre] == 1]

        avg_ratings = genre_ratings.groupby('show_id')['rating'].mean()
        count_ratings = genre_ratings.groupby('show_id')['rating'].count()

        filtered = avg_ratings[count_ratings >= 3]
        top_ids = filtered.sort_values(ascending=False).head(10).index.tolist()

        top_movies = titles_df[titles_df['show_id'].isin(top_ids)][['show_id', 'title']].to_dict(orient='records')

        if len(top_movies) >= 5:
            genre_recommendations[genre] = top_movies

    return jsonify(genre_recommendations)




if __name__ == "__main__":
    app.run(debug=True, port=5050)
