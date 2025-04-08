import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';

// Each movie is just a string (title)
type Movie = string;

function sanitizeFileName(name: string | undefined): string {
  if (!name || typeof name !== 'string') return 'default';
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2, slidesToSlide: 1 },
};

const LandingPage = () => {
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5050/api/recommend/top-rated')
      .then((res) => res.json())
      .then((data) => {
        console.log('Top Rated API Response:', data);
        if (Array.isArray(data.recommendations)) {
          setTopRated(data.recommendations);
        } else {
          console.warn('⚠️ Unexpected format:', data);
        }
      })
      .catch((err) =>
        console.error('❌ Error fetching top-rated movies:', err)
      );
  }, []);

  return (
    <div className="bg-gradient-to-b from-blue-600 to-black min-h-screen px-6 py-10 text-white relative">
      {/* Top-right Login Button */}
      <div className="absolute top-4 right-6 z-50">
        <button
          className="bg-green-500 text-black px-4 py-2 rounded font-semibold hover:bg-green-600 transition"
          onClick={() => navigate('/login')}
        >
          Sign Up / Log In
        </button>
      </div>

      {/* Company Name */}
      <h1 className="text-4xl font-bold text-center mb-10">CineNiche</h1>

      {/* Carousel */}
      <h2 className="text-xl font-semibold mb-6 text-center">
        Top Rated Movies
      </h2>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay={false}
        keyBoardControl
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {topRated.map((movieTitle, idx) => {
          console.log('Rendering movie:', movieTitle);
          const posterPath = `/Movie Posters/${sanitizeFileName(movieTitle)}.jpg`;

          return (
            <div
              key={idx}
              className="flex flex-col items-center justify-start px-2"
              style={{ width: '160px' }}
            >
              <div
                className="rounded overflow-hidden shadow-md bg-black"
                style={{ width: '160px', height: '240px' }}
              >
                <img
                  src={posterPath}
                  alt={movieTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-center">{movieTitle}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default LandingPage;
