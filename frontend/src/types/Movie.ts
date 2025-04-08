export interface Movie {
  showId?: string; // ShowId is a string and optional
  type?: string; // Type is a string and optional
  title?: string; // Title of the movie
  director?: string; // Director's name
  cast?: string; // Cast of the movie
  country?: string; // Country where the movie was made
  releaseYear?: number; // Release year of the movie
  rating?: string; // Rating (string, could be a number, but keeping it as string)
  duration?: string; // Duration of the movie in minutes (or other unit)
  description?: string; // Description of the movie
  genre?: string[]; // Array of genres the movie belongs to
}

export default Movie;
