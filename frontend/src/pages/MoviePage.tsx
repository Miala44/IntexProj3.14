import { Link } from 'react-router-dom'; // ✅ Import Link from react-router-dom
import MoviesList from '../components/MovieList';
import Header from '../components/Header';
import AuthorizeView from '../components/AuthorizeView';
// import Logout from '../components/Logout';
import CookieConsent from 'react-cookie-consent';
import { useState } from 'react';
import GenreFilter from '../components/GenreFilter';
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
  // You can add or clean up duplicates as needed
];

function MoviesPage() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [hideMature, setHideMature] = useState<boolean>(false);

  return (
    <AuthorizeView>
      <div className="container mt-4 d-flex flex-column min-vh-100">
        <Header />
        <div className="mb-3">
          <input
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

        {/* Footer */}
        <footer className="text-center mt-auto py-3 border-top">
          <small>
            © {new Date().getFullYear()} CineNiche.{' '}
            <Link to="/PrivacyPage">Privacy Policy</Link>
          </small>
        </footer>
      </div>
      <CookieConsent>
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </AuthorizeView>
  );
}

export default MoviesPage;
