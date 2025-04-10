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
  const userId = 3;
  useEffect(() => {
    fetch(`http://localhost:5050/api/recommend/user/${userId}`)
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
    fetch('http://localhost:5050/api/recommend/genre')
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
    <div className="bg-black text-white min-h-screen px-6 py-10">
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

// import { useEffect, useState } from 'react';
// import CarouselLib from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// interface Movie {
//   title: string;
//   poster?: string; // made optional for safety
// }

// function sanitizeFileName(title: string): string {
//   return title
//     .normalize('NFD') // Decomposes accented characters
//     .replace(/[\u0300-\u036f]/g, '') // Removes diacritical marks
//     .replace(/[^a-zA-Z0-9\s]/g, '') // Keeps only alphanumeric characters and spaces
//     .trim();
// }

// // TypeScript fix: cast the Carousel as a generic React component
// const Carousel = CarouselLib as unknown as React.FC<any>;

// const responsive = {
//   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5, slidesToSlide: 1 },
//   tablet: { breakpoint: { max: 1024, min: 768 }, items: 3, slidesToSlide: 1 },
//   mobile: { breakpoint: { max: 768, min: 0 }, items: 2, slidesToSlide: 1 },
// };

// const RecommendationsPage = () => {
//   const [recs, setRecs] = useState<Movie[]>([]);
//   const userId = 8;

//   useEffect(() => {
//     fetch(`http://localhost:5050/api/recommend/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log('✅ API Response:', data);
//         if (Array.isArray(data.recommendations)) {
//           setRecs(
//             data.recommendations.map((title: string) => ({
//               title,
//               poster: `${sanitizeFileName(title)}.jpg`, // Optional: adjust if you sanitize file names
//             }))
//           );
//         }
//       })
//       .catch((err) => console.error('❌ Error fetching recommendations:', err));
//   }, [userId]);

//   return (
//     <div className="bg-black text-white min-h-screen px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-6">
//         Your Recommendations
//       </h1>

//       {recs.length === 0 && (
//         <p className="text-center text-gray-400">
//           No recommendations available.
//         </p>
//       )}

//       {recs.length > 0 && (
//         <Carousel
//           responsive={responsive}
//           infinite
//           autoPlay={false}
//           keyBoardControl
//           customTransition="transform 300ms ease-in-out"
//           transitionDuration={300}
//           containerClass="carousel-container"
//           itemClass="carousel-item-padding-40-px"
//         >
//           {recs.map((movie, idx) => {
//             const safePoster = movie.poster ?? 'default.jpg';
//             const posterPath = `/Movie Posters/${safePoster}`;

//             return (
//               <div
//                 key={idx}
//                 className="flex flex-col items-center justify-start px-2"
//                 style={{ width: '160px' }}
//               >
//                 <div
//                   className="rounded overflow-hidden shadow-md bg-black"
//                   style={{ width: '160px', height: '240px' }}
//                 >
//                   <img
//                     src={posterPath}
//                     alt={movie.title}
//                     style={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                     }}
//                     onError={(e) => {
//                       e.currentTarget.src = '/Movie Posters/default.jpg';
//                     }}
//                   />
//                 </div>
//                 <p className="mt-2 text-sm text-center">
//                   {movie.title ?? 'Untitled'}
//                 </p>
//               </div>
//             );
//           })}
//         </Carousel>
//       )}
//     </div>
//   );
// };

// export default RecommendationsPage;

// import { useEffect, useState } from 'react';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';

// interface Movie {
//   title: string;
// }

// function sanitizeFileName(title: string): string {
//   return title.replace(/[^a-zA-Z0-9 ]/g, '').trim();
// }

// const responsive = {
//   desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
//   tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
//   mobile: { breakpoint: { max: 768, min: 0 }, items: 2 },
// };

// const RecommendationsPage = () => {
//   const [recs, setRecs] = useState<Movie[]>([]);
//   const userId = 1;

//   useEffect(() => {
//     fetch(`http://localhost:5050/api/recommend/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         const recommendations = (data.recommendations || []).map(
//           (title: string) => ({ title }) // Assuming API returns array of strings
//         );
//         setRecs(recommendations);
//       })
//       .catch((err) => console.error('Error fetching recommendations:', err));
//   }, [userId]);

//   return (
//     <div className="bg-black text-white min-h-screen px-6 py-10">
//       <h1 className="text-4xl font-bold text-center mb-6">
//         Your Recommendations
//       </h1>
//       <Carousel
//         responsive={responsive}
//         infinite
//         autoPlay={false}
//         keyBoardControl
//         customTransition="transform 300ms ease-in-out"
//         transitionDuration={300}
//         containerClass="carousel-container"
//         itemClass="carousel-item-padding-40-px"
//       >
//         {recs.map((movie, idx) => {
//           const posterPath = `/Movie Posters/${sanitizeFileName(movie.title)}.jpg`;
//           return (
//             <div
//               key={idx}
//               className="flex flex-col items-center justify-start px-2"
//               style={{ width: '160px' }}
//             >
//               <div
//                 className="rounded overflow-hidden shadow-md bg-black"
//                 style={{ width: '160px', height: '240px' }}
//               >
//                 <img
//                   src={posterPath}
//                   alt={movie.title}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                   onError={(e) => {
//                     e.currentTarget.style.display = 'none';
//                   }}
//                 />
//               </div>
//               <p className="mt-2 text-sm text-center">{movie.title}</p>
//             </div>
//           );
//         })}
//       </Carousel>
//     </div>
//   );
// };

// export default RecommendationsPage;
