import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface SimilarMoviesCarouselProps {
  title: string; // :white_check_mark: Accept the movie title instead of ID
}
type Movie = string;
function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};
const SimilarMoviesCarousel = ({ title }: SimilarMoviesCarouselProps) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  useEffect(() => {
    if (!title) return;
    fetch(
      `https://group3-14flaskapi-hhcxf9g7f0h7cee7.westus-01.azurewebsites.net/api/recommend/movie/${encodeURIComponent(title)}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Similar movie titles:', data.recommendations);
        setRecommendations(data.recommendations || []);
      })
      .catch((err) => console.error('Error fetching similar movies:', err));
  }, [title]);
  if (recommendations.length === 0) return null;
  return (
    <div className="mt-3">
      <h2 className="text-2xl font-bold mb-3 text-white text-center">
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
        {recommendations.map((recTitle, idx) => {
          const posterPath = `/Movie Posters/${sanitizeFileName(recTitle)}.jpg`;
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
                  alt={recTitle}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <p className="mt-2 text-center text-dark fw-medium">{recTitle}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default SimilarMoviesCarousel;
