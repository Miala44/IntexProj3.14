import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './LandingPage.css';

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const nightIn = [
  'Colony',
  'Love Storm',
  'Durarara!!',
  'Gol Maal',
  'Club Friday To Be Continued - Friend & Enemy',
  'Winter Sun',
  'The Ingenuity of the Househusband',
  'Jurassic World Camp Cretaceous',
  'That 70s Show',
  '13 Reasons Why',
  'Singles Villa',
  'The Next Step',
  'The Society',
  'Two Fathers',
  'Beirut Oh Beirut',
  'Masaba Masaba',
  'The Devil and Father Amorth',
];
const familyTime = [
  'Vivo',
  'Osmosis Jones',
  'Planet 51',
  'Kung Fu Panda',
  'The Karate Kid',
  'Beethoven',
];
const hardcodedMovies = [
  'Death Can Wait',
  'Better Call Saul',
  'Club Friday To Be Continued - The Promise',
  'Ancient Aliens',
  'Diamond City',
  'Godzilla Singular Point',
  'Brotherhood',
  'Dollar',
  'ThirTEEN Terrors',
  'Crazy Ex-Girlfriend',
  'The New Legends of Monkey',
  'Planet Earth II',
  'True Grit',
];

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const renderCarousel = (title: string, movies: string[]) => (
  <div className="carousel-section">
    <h2 className="carousel-title">{title}</h2>
    <Carousel
      responsive={responsive}
      infinite
      autoPlay={true}
      autoPlaySpeed={1200}
      keyBoardControl
      customTransition="transform 300ms ease-in-out"
      transitionDuration={300}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px"
    >
      {movies.map((title, idx) => {
        const fileName = sanitizeFileName(title);
        const posterPath = `/Movie Posters/${fileName}.jpg`;

        return (
          <div className="card movie-card" key={idx} style={{ width: '160px' }}>
            <img
              src={posterPath}
              alt={title}
              className="card-img-top"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <p
              style={{
                textAlign: 'center',
                color: '#fff',
                marginTop: '0.5rem',
              }}
            >
              {title}
            </p>
          </div>
        );
      })}
    </Carousel>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      <div className="auth-buttons">
        <button className="btn-login" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="btn-create" onClick={() => navigate('/register')}>
          Create Account
        </button>
      </div>

      <header className="main-header">
        <h1 className="main-title">CineNiche.</h1>
        <p className="slogan">
          Discover your next favorite film - tailored to your taste.
        </p>
      </header>

      <div className="carousel-wrapper">
        {renderCarousel('Perfect for a Night In', nightIn)}
        {renderCarousel('Family Movie Night', familyTime)}
        {renderCarousel('Highly Rated Picks', hardcodedMovies)}
      </div>
    </div>
  );
};

export default LandingPage;
