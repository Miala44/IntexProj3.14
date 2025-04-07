import MoviesList from '../components/MovieList';
import Header from '../components/Header';
import AuthorizeView, { AuthorizedUser } from '../components/AuthorizeView';
import Logout from '../components/Logout';

function MoviesPage() {
  return (
    <AuthorizeView>
      <span>
        <Logout>
          Logout <AuthorizedUser value="email" />
        </Logout>
      </span>
      <div className="container mt-4">
        <Header />
        <div className="row">
          <div className="col-md-12">
            <MoviesList />
          </div>
        </div>
      </div>
    </AuthorizeView>
  );
}

export default MoviesPage;
