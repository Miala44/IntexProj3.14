import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

interface Movie {
  title: string;
  poster?: string;
}

interface Props {
  title: string;
  movies: Movie[];
}

function sanitizeFileName(title: string): string {
  return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
};

const GenreCarousel = ({ title, movies }: Props) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4 text-white px-4">{title}</h2>
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
        {movies.map((movie, idx) => {
          const posterPath = `/Movie Posters/${sanitizeFileName(movie.poster || movie.title)}.jpg`;
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
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.currentTarget.src = '/Movie Posters/default.jpg';
                  }}
                />
              </div>
              <p className="mt-2 text-sm text-center text-white">
                {movie.title}
              </p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default GenreCarousel;
