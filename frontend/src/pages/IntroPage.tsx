import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap for responsive design
import MoviesList from '../components/MovieList'; // Import MoviesList component
import TopRatedCarousel from '../components/TopRatedCarousel';

const IntroPage: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="container text-center">
        {/* Header Section */}
        <header>
          <h1 className="display-4 fw-bold text-primary">
            Welcome to Our Movie App
          </h1>
          <p className="lead text-muted">
            Discover and explore a collection of your favorite movies,
            directors, and much more. Start your cinematic journey today.
          </p>
        </header>

        {/* Image or Illustration Section */}
        <section>
          <Link to="/register" className="btn btn-outline-primary btn-lg mx-2">
            Get Started
          </Link>

          {/* Added Login and Register buttons */}
          <Link to="/login" className="btn btn-secondary btn-lg mx-2">
            Login
          </Link>
        </section>
        {/* <section className="my-5"></section> */}

        {/* Movies List Section */}
        <section className="my-5">
          <h2 className="mb-4">Featured Movies</h2>
          <MoviesList /> {/* Add MoviesList component here */}
          <TopRatedCarousel />
        </section>

        {/* Footer Section */}
        <footer className="mt-5 text-muted">
          <p>&copy; 2025 MovieApp. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default IntroPage;
