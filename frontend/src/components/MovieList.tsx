import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from '../types/Movie'; // Adjust the path if needed

function sanitizeFileName(title: string): string {
  return title
    .normalize('NFD') // Decomposes accented characters
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritical marks
    .replace(/[^a-zA-Z0-9\s]/g, '') // Keeps alphanumeric characters and spaces
    .trim();
}

function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const loader = useRef<HTMLDivElement | null>(null);

  // Fetch movies when pageNum changes
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Movies/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();

        setMovies((prev) => {
          const newMovies = data.movies.filter(
            (newMovie: Movie) =>
              !prev.some((movie) => movie.showId === newMovie.showId)
          );
          return [...prev, ...newMovies];
        });

        setTotalItems(data.totalMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [pageNum]);

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && movies.length < totalItems) {
          setPageNum((prev) => prev + 1);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [movies, totalItems]);

  return (
    <>
      <div className="row">
        {movies.map((movie) => {
          const posterPath = `/Movie Posters/${sanitizeFileName(movie.title || '')}.jpg`;

          return (
            <div key={movie.showId} className="col-md-3 mb-4">
              <div id="movieCard" className="card h-100">
                <img
                  src={posterPath}
                  alt={movie.title}
                  className="card-img-top"
                  style={{ height: '300px', objectFit: 'cover' }}
                  onError={(e) =>
                    (e.currentTarget.src = '/Movie Posters/default.jpg')
                  }
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    <strong>Director:</strong> {movie.director}
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/detailPage/${movie.showId}`)}
                  >
                    Movie Details!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loader div triggers the infinite scroll */}
      <div ref={loader} className="text-center my-4">
        {movies.length < totalItems && (
          <span className="spinner-border text-secondary" />
        )}
      </div>
    </>
  );
}

export default MoviesList;
