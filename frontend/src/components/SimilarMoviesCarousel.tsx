import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface SimilarMoviesCarouselProps {
  showId: number;
}

// Movie is just a string title
type Movie = string;

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const SimilarMoviesCarousel = ({ showId }: SimilarMoviesCarouselProps) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(`http://localhost:5050/api/recommend/movie/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Similar movie titles:', data.recommendations);
        setRecommendations(data.recommendations || []);
      })
      .catch((err) => console.error('Error fetching similar movies:', err));
  }, [showId]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">
        Similar Movies
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
        {recommendations.map((title, idx) => {
          const posterPath = `/Movie Posters/${sanitizeFileName(title)}.jpg`;

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
                  alt={title}
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
              <p className="mt-2 text-sm text-center text-white">{title}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default SimilarMoviesCarousel;
