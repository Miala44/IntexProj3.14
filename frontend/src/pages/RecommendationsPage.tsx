import { useEffect, useState } from 'react';
import CarouselLib from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Movie {
  title: string;
  poster?: string; // made optional for safety
}

function sanitizeFileName(title: string): string {
  return title
    .normalize('NFD') // Decomposes accented characters
    .replace(/[\u0300-\u036f]/g, '') // Removes diacritical marks
    .replace(/[^a-zA-Z0-9\s]/g, '') // Keeps only alphanumeric characters and spaces
    .trim();
}

// TypeScript fix: cast the Carousel as a generic React component
const Carousel = CarouselLib as unknown as React.FC<any>;

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 1 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3, slidesToSlide: 1 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2, slidesToSlide: 1 },
};

const RecommendationsPage = () => {
  const [recs, setRecs] = useState<Movie[]>([]);
  const userId = 8;

  useEffect(() => {
    fetch(`http://localhost:5050/api/recommend/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('✅ API Response:', data);
        if (Array.isArray(data.recommendations)) {
          setRecs(
            data.recommendations.map((title: string) => ({
              title,
              poster: `${sanitizeFileName(title)}.jpg`, // Optional: adjust if you sanitize file names
            }))
          );
        }
      })
      .catch((err) => console.error('❌ Error fetching recommendations:', err));
  }, [userId]);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Recommendations
      </h1>

      {recs.length === 0 && (
        <p className="text-center text-gray-400">
          No recommendations available.
        </p>
      )}

      {recs.length > 0 && (
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
          {recs.map((movie, idx) => {
            const safePoster = movie.poster ?? 'default.jpg';
            const posterPath = `/Movie Posters/${safePoster}`;

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
                    alt={movie.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.src = '/Movie Posters/default.jpg';
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-center">
                  {movie.title ?? 'Untitled'}
                </p>
              </div>
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default RecommendationsPage;
