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

# Recommendation logic
def recommend_movies_for_user(user_id, top_n=5):
    if user_id not in predicted_ratings_df.index:
        return []
    user_ratings = predicted_ratings_df.loc[user_id]
    already_rated = ratings_df[ratings_df['user_id'] == user_id]['show_id'].tolist()
    user_ratings = user_ratings.drop(labels=already_rated, errors='ignore')
    top_recommendations = user_ratings.sort_values(ascending=False).head(top_n).index.tolist()
    return [movie_lookup.get(show_id, f"Unknown ({show_id})") for show_id in top_recommendations]

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

if __name__ == "__main__":
    app.run(port=5050, debug=True)
