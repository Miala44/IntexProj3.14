import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

type Movie = string;

function sanitizeFileName(name: string | undefined): string {
  if (!name || typeof name !== 'string') return 'default';
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const TopRatedCarousel = () => {
  const [topRated, setTopRated] = useState<Movie[]>([]);

  useEffect(() => {
    fetch('http://localhost:5050/api/recommend/top-rated')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.recommendations)) {
          setTopRated(data.recommendations);
        } else {
          console.warn('Unexpected response format:', data);
        }
      })
      .catch((err) => console.error('Failed to fetch top-rated movies:', err));
  }, []);

  if (topRated.length === 0) return null;

  return (
    <div>
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
        {topRated.map((title, idx) => {
          const posterPath = `/Movie Posters/${sanitizeFileName(title)}.jpg`;

          return (
            <div
              key={idx}
              className="flex flex-column align-items-center px-2"
              style={{ width: '160px' }}
            >
              <div
                className="bg-dark rounded shadow-sm"
                style={{ width: '160px', height: '240px' }}
              >
                <img
                  src={posterPath}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="mt-2 text-center text-dark fw-medium">{title}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default TopRatedCarousel;
