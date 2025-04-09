import Movie from '../types/Movie';

interface FetchMoviesResponse {
  movies: Movie[];
  totalNumMovies: number;
}

const API_URL = 'https://localhost:5000';

export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchMoviesResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `movieTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/Movies/GetAllMovies?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
      {
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movies', error);
    throw error;
  }
};

export const addMovie = async (newMovie: Movie): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movies/AddMovie`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to add movie');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding movie', error);
    throw error;
  }
};

export const updateMovie = async (
  showId: string, 
  updatedMovie: Movie
): Promise<Movie> => {
  try {
    const response = await fetch(`${API_URL}/Movies/UpdateMovie/${showId}`, {

      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error('Failed to update movie');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : updatedMovie;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
};

export const deleteMovie = async (showId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/Movies/DeleteMovie/${showId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
};
