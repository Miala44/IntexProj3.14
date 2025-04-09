import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Movie from '../types/Movie';
import '../pages/identity.css';

interface MoviesListProps {
  searchTerm?: string;
}

interface MoviesListProps {
  searchTerm?: string;
  selectedGenres?: string[];
}

function sanitizeFileName(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim();
}
const MoviesList: React.FC<MoviesListProps> = ({
  searchTerm = '',
  selectedGenres = [],
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const loader = useRef<HTMLDivElement | null>(null);

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

  const filteredMovies = movies.filter((movie) => {
    const titleMatches = (movie.title ?? '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const genreList =
      movie.genre?.split(',').map((g) => g.trim().toLowerCase()) ?? [];

    const genreMatches =
      selectedGenres.length === 0 ||
      selectedGenres.some((genre) => genreList.includes(genre.toLowerCase()));

    return titleMatches && genreMatches;
  });

  return (
    <>
      <div
        className="row"
        style={{
          background: 'transparent',
          margin: 0,
          padding: 0,
          border: 'none',
        }}
      >
        {filteredMovies.map((movie) => {
          const safeTitle = movie.title ?? 'Untitled';
          const posterPath = `/Movie Posters/${sanitizeFileName(safeTitle)}.jpg`;

          return (
            <div key={movie.showId} className="col-md-2 mb-4">
              <div
                // id="movieCard"
                className="card movie-card h-100"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/detailPage/${movie.showId}`)}
              >
                <img
                  src={posterPath}
                  alt={safeTitle}
                  className="card-img-top"
                  style={{
                    width: '100%',
                    objectFit: 'cover',
                    aspectRatio: '2 / 3', // modern browsers
                  }}
                  onError={(e) =>
                    (e.currentTarget.src = '/Movie Posters/default.jpg')
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <div ref={loader} className="text-center my-4">
        {movies.length < totalItems && (
          <span className="spinner-border text-secondary" />
        )}
      </div>
    </>
  );
};

export default MoviesList;
