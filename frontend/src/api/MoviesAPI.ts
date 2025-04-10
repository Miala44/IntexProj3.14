// import Movie from '../types/Movie';

// interface FetchMoviesResponse {
//   movies: Movie[];
//   totalNumMovies: number;
// }

// const API_URL = 'https://localhost:5000';

// export const fetchMovies = async (
//   pageSize: number,
//   pageNum: number,
//   selectedCategories: string[]
// ): Promise<FetchMoviesResponse> => {
//   try {
//     const categoryParams = selectedCategories
//       .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
//       .join('&');

//     const response = await fetch(
//       `${API_URL}/Movies/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
//       {
//         credentials: 'include',
//       }
//     );

//     if (!response.ok) {
//       throw new Error('Failed to fetch movies');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching movies', error);
//     throw error;
//   }
// };

// export const addMovie = async (newMovie: Movie): Promise<Movie> => {
//   try {
//     const response = await fetch(`${API_URL}/Movies/AddMovie`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newMovie),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to add movie');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error adding movie', error);
//     throw error;
//   }
// };

// export const updateMovie = async (
//   showId: string,
//   updatedMovie: Movie
// ): Promise<Movie> => {
//   try {
//     const response = await fetch(`${API_URL}/Movies/UpdateMovie/${showId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include', // ← important for cookies!
//       body: JSON.stringify(updatedMovie),
//     });

//     if (response.status === 401) {
//       console.warn('Unauthorized - redirecting to login...');
//       window.location.href = 'http://localhost:3000/login'; // or wherever your login page is
//       return Promise.reject('Unauthorized');
//     }

//     if (!response.ok) {
//       throw new Error('Failed to update movie');
//     }

//     const text = await response.text();
//     return text ? JSON.parse(text) : updatedMovie;
//   } catch (error) {
//     console.error('Error updating movie:', error);
//     throw error;
//   }
// };

// export const deleteMovie = async (showId: string): Promise<void> => {
//   try {
//     const response = await fetch(`${API_URL}/Movies/DeleteMovie/${showId}`, {
//       method: 'DELETE',
//     });

//     if (!response.ok) {
//       throw new Error('Failed to delete movie');
//     }
//   } catch (error) {
//     console.error('Error deleting movie:', error);
//     throw error;
//   }
// };

import Movie from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

// https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net => https://localhost:5000

// const API_URL = 'https://localhost:5000';
const API_URL =
  'https://intexbackend-a6fvcvg6cha4hwcx.eastus-01.azurewebsites.net';

// Generic fetch wrapper that auto handles auth + errors
const handleAuthFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Always send cookies for auth
  });

  if (response.status === 401) {
    console.warn('Unauthorized - redirecting to login...');
    window.location.href = 'http://localhost:3000/login';
    return Promise.reject('Unauthorized');
  }

  if (!response.ok) {
    const message = `Fetch failed with status ${response.status}`;
    console.error(message);
    throw new Error(message);
  }

  return response;
};

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  const categoryParams = selectedCategories
    .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
    .join('&');

  const response = await handleAuthFetch(
    `${API_URL}/Movies/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
  );

  return await response.json();
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  const response = await handleAuthFetch(`${API_URL}/Movies/Add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMovie),
  });

  return await response.json();
};

export const updateMovie = async (
  showId: string,
  updatedMovie: Movie
): Promise<Movie> => {
  const response = await handleAuthFetch(
    `${API_URL}/Movies/UpdateMovie/${showId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    }
  );

  const text = await response.text();
  return text ? JSON.parse(text) : updatedMovie;
};

export const deleteMovie = async (showId: string): Promise<void> => {
  await handleAuthFetch(`${API_URL}/Movies/DeleteMovie/${showId}`, {
    method: 'DELETE',
  });
};
