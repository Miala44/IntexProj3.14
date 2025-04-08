import { Link } from 'react-router-dom'; // ✅ Import Link from react-router-dom
import MoviesList from '../components/MovieList';
import Header from '../components/Header';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';
import CookieConsent from "react-cookie-consent";

function MoviesPage() {
  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <div className="container mt-4 d-flex flex-column min-vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-md-12">
            <MoviesList />
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
      <CookieConsent>This website uses cookies to enhance the user experience.</CookieConsent>
    </AuthorizeView>
    
  );
}

export default MoviesPage;

