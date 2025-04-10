import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MoviesList from '../components/MovieList';
import Header from '../components/Header';
import { AuthorizedUser } from '../components/AuthorizedUser';
import Logout from '../components/Logout';
import CookieConsent from 'react-cookie-consent';
import GenreFilter from '../components/GenreFilter';
import { handleAuthFetch } from '../api/MoviesAPI';
import './Identity.css';

const allGenres = [
  'Action',
  'Adventure',
  'Anime Series',
  'International TV Shows',
  'British TV Shows',
  'Docuseries',
  'Children',
  'Comedies',
  'Dramas',
  'Romantic Movies',
  'Crime TV Shows',
  'Documentaries',
  'Family Movies',
  'Fantasy',
  'Horror Movies',
  'Thrillers',
  "Kids' TV",
  'Language TV Shows',
  'Musicals',
  'Nature TV',
  'Reality TV',
  'Spirituality',
  'TV Action',
  'TV Comedies',
  'TV Dramas',
  'Talk Shows',
];

const MoviesPage = () => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hideMature, setHideMature] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await handleAuthFetch(
          'https://localhost:5000/pingauth'
        );
        const data = await response.json();
        console.log('Logged in as:', data.email);
        setIsAuthenticated(true);
      } catch {
        console.warn('User not authenticated. Redirecting...');
      }
    };

    checkAuth();
  }, [navigate]);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-5" style={{ color: 'white' }}>
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="container mt-4 d-flex flex-column min-vh-100">
      <div className="d-flex justify-content-end logout-container mb-2">
        <Logout>
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout{' '}
          <span className="user-email">
            <AuthorizedUser value="email" />
          </span>
        </Logout>
      </div>

      <Header />

      <div className="mb-3">
        <input
          id="movieSearch"
          name="movieSearch"
          type="text"
          className="form-control"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <GenreFilter
        genres={allGenres}
        selectedGenres={selectedGenres}
        onChange={setSelectedGenres}
      />

      <div className="mature-toggle-wrapper mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="matureToggle"
          checked={hideMature}
          onChange={() => setHideMature((prev) => !prev)}
        />
        <label className="form-check-label" htmlFor="matureToggle">
          Kids Mode
        </label>
      </div>

      <div className="row flex-grow-1">
        <div className="col-md-12">
          <MoviesList
            searchTerm={searchTerm}
            selectedGenres={selectedGenres}
            hideMature={hideMature}
          />
        </div>
      </div>

      <footer className="text-center mt-auto py-3 border-top">
        <small>
          © {new Date().getFullYear()} CineNiche.{' '}
          <Link to="/PrivacyPage">Privacy Policy</Link>
        </small>
      </footer>

      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};

export default MoviesPage;
