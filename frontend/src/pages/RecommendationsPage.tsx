import { useEffect, useState, useRef } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
interface Movie {
  title: string;
  show_id: string;
}
interface GenreRecommendations {
  [genre: string]: Movie[];
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
  const [genreRecs, setGenreRecs] = useState<GenreRecommendations>({});
  const [visibleGenres, setVisibleGenres] = useState<string[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  // const userId = 3;
  useEffect(() => {
    fetch(
      'https://group3-14flaskapi-hhcxf9g7f0h7cee7.westus-01.azurewebsites.net/api/recommend/user/1'
    )
      .then((res) => res.json())
      .then((data) => {
        const recommendations = (data.recommendations || []).map(
          (title: string) => ({
            title,
            show_id: '',
          })
        );
        setRecs(recommendations);
      });
    fetch(
      'https://group3-14flaskapi-hhcxf9g7f0h7cee7.westus-01.azurewebsites.net/api/recommend/genre'
    )
      .then((res) => res.json())
      .then((data) => {
        setGenreRecs(data);
        setVisibleGenres(Object.keys(data).slice(0, 1)); // load first genre immediately
      });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const allGenres = Object.keys(genreRecs);
        const nextIndex = visibleGenres.length;
        if (nextIndex < allGenres.length) {
          setVisibleGenres((prev) => [...prev, allGenres[nextIndex]]);
        }
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => observer.disconnect();
  }, [genreRecs, visibleGenres]);
  return (
    <div className=" text-white min-h-screen px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        Your Recommendations
      </h1>
      {/* User-Based Recommendations */}
      {recs.length > 0 && (
        <Carousel
          {...{
            responsive,
            infinite: true,
            containerClass: 'carousel-container',
          }}
        >
          {recs.map((movie, idx) => {
            const posterPath = `/Movie Posters/${sanitizeFileName(movie.title)}.jpg`;
            return (
              <div
                key={idx}
                className="flex flex-col items-center px-2"
                style={{ width: '160px' }}
              >
                <div
                  className="shadow-md rounded overflow-hidden"
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
      )}
      {/* Genre-Based Recommendations */}
      {visibleGenres.map((genre) => (
        <div key={genre} className="mt-12">
          <h2 className="text-2xl font-semibold mb-3">
            {genre} Recommendations
          </h2>
          <Carousel
            {...{
              responsive,
              infinite: false,
              containerClass: 'carousel-container',
            }}
          >
            {genreRecs[genre].map((movie, idx) => {
              const posterPath = `/Movie Posters/${sanitizeFileName(movie.title)}.jpg`;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center px-2"
                  style={{ width: '160px' }}
                >
                  <div
                    className="bg-black shadow-md rounded overflow-hidden"
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
      ))}
      <div ref={observerRef} className="h-12 mt-8" />
    </div>
  );
};
export default RecommendationsPage;
