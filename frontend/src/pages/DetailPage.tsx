import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from '../types/Movie'; // Adjust the path if needed
import SimilarMoviesCarousel from '../components/SimilarMoviesCarousel'; // adjust path if needed
function sanitizeFileName(title: string): string {
  return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}
function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(
        `https://localhost:5000/Movies/GetMovieById/${id}`,
        { credentials: 'include' }
      );
      const data = await response.json();
      setMovie(data);
    };
    const fetchRatings = async () => {
      const response = await fetch(
        `https://localhost:5000/Movies/rating-summary/${id}`,
        { credentials: 'include' }
      );
      if (response.ok) {
        const data = await response.json();
        setAverageRating(data.averageRating);
        setUserRating(data.userRating);
      }
    };
    fetchMovie();
    fetchRatings();
  }, [id]);
  const handleRatingSubmit = async () => {
    window.alert('Successfully Rated!');
    // if (!id || rating < 1 || rating > 5) {
    //   setMessage(':warning: Please select a rating from 1 to 5.');
    //   return;
    // }
    // try {
    //   const response = await fetch('https://localhost:5000/Movies/rate', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ showId: id, rating }),
    //   });
    //   const text = await response.text();
    //   if (response.ok) {
    //     setMessage(':white_check_mark: Rating submitted!');
    //     setUserRating(rating); // Optimistically update userRating
    //     // Optionally, refresh average rating:
    //     const updated = await fetch(
    //       `https://localhost:5000/Movies/rating-summary/${id}`,
    //       {
    //         credentials: 'include',
    //       }
    //     );
    //     if (updated.ok) {
    //       const data = await updated.json();
    //       setAverageRating(data.averageRating);
    //     }
    //   } else {
    //     setMessage(`:x: ${text}`);
    //   }
    // } catch (err) {
    //   console.error('Rating failed:', err);
    //   setMessage(':x: Network error while submitting rating');
    // }
  };
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
        <div className="col-md-8" style={{ color: 'white' }}>
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
            <strong>Genres:</strong> {movie.genre}
          </p>
          {/* :mag: Display Ratings */}
          <div className="mt-3">
            <p>
              <strong>⭐ Average Rating:</strong>{' '}
              {averageRating ?? 'Not rated yet'}
            </p>
            {userRating !== null && (
              <p>
                <strong>⭐ Your Rating:</strong> {userRating}
              </p>
            )}
          </div>
          {/* :star:️ Rating Dropdown */}
          <div className="mt-4">
            <label htmlFor="ratingSelect" className="form-label">
              Rate this movie:
            </label>
            <select
              id="ratingSelect"
              className="form-select mb-2"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={0}>Select Rating</option>
              <option value={1}>⭐ 1</option>
              <option value={2}>⭐⭐ 2</option>
              <option value={3}>⭐⭐⭐ 3</option>
              <option value={4}>⭐⭐⭐⭐ 4</option>
              <option value={5}>⭐⭐⭐⭐⭐5</option>
            </select>
            <button className="btn btn-primary" onClick={handleRatingSubmit}>
              Submit Rating
            </button>
            {message && <div className="mt-2">{message}</div>}
          </div>
        </div>
      </div>
      {/* Floating Similar Movies Carousel */}
      {movie?.title && (
        <div className="recommendations-section mt-5">
          <SimilarMoviesCarousel title={movie.title} />
        </div>
      )}
    </div>
  );
}
export default DetailPage;
