import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Movie {
  title: string;
}

function sanitizeFileName(title: string): string {
  return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const RecommendationsPage = () => {
  const [recs, setRecs] = useState<Movie[]>([]);
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:5050/api/recommend/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const recommendations = (data.recommendations || []).map(
          (title: string) => ({ title }) // Assuming API returns array of strings
        );
        setRecs(recommendations);
      })
      .catch((err) => console.error('Error fetching recommendations:', err));
  }, [userId]);

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Recommendations
      </h1>
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
          const posterPath = `/Movie Posters/${sanitizeFileName(movie.title)}.jpg`;
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
              <p className="mt-2 text-sm text-center">{movie.title}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default RecommendationsPage;
