import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types/Movie'; // Adjust the path if needed

function sanitizeFileName(title: string): string {
  return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://localhost:5000/Movies/GetMovieById/${id}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div className="text-center mt-5">Loading...</div>;

  const posterPath = `/Movie Posters/${sanitizeFileName(movie.title ?? '')}.jpg`;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={posterPath}
            alt={movie.title}
            className="img-fluid"
            onError={(e) =>
              (e.currentTarget.src = '/Movie Posters/default.jpg')
            }
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Cast:</strong> {movie.cast}
          </p>
          <p>
            <strong>Country:</strong> {movie.country}
          </p>
          <p>
            <strong>Release Year:</strong> {movie.releaseYear}
          </p>
          <p>
            <strong>Rating:</strong> {movie.rating}
          </p>
          <p>
            <strong>Duration:</strong> {movie.duration}
          </p>
          <p>
            <strong>Description:</strong> {movie.description}
          </p>
          <p>
            <strong>Genres:</strong>{' '}
            {Object.entries(movie)
              .filter(([key, value]) => typeof value === 'number' && value > 0)
              .map(([key]) => key)
              .join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
