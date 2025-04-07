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

  action?: number; // Genre action, optional integer
  adventure?: number; // Genre adventure, optional integer
  animeSeriesInternationalTvShows?: number; // Anime Series category
  britishTvShowsDocuseriesInternationalTvShows?: number; // British TV Shows category
  children?: number; // Genre children
  comedies?: number; // Genre comedies
  comediesDramasInternationalMovies?: number; // Genre Comedies and Dramas International Movies
  comediesInternationalMovies?: number; // Genre Comedies International Movies
  comediesRomanticMovies?: number; // Genre Comedies Romantic Movies
  crimeTvShowsDocuseries?: number; // Genre Crime TV Shows
  documentaries?: number; // Genre Documentaries
  documentariesInternationalMovies?: number; // Genre Documentaries International Movies
  docuseries?: number; // Genre Docuseries
  dramas?: number; // Genre Dramas
  dramasInternationalMovies?: number; // Genre Dramas International Movies
  dramasRomanticMovies?: number; // Genre Dramas Romantic Movies
  familyMovies?: number; // Genre Family Movies
  fantasy?: number; // Genre Fantasy
  horrorMovies?: number; // Genre Horror Movies
  internationalMoviesThrillers?: number; // Genre International Movies Thrillers
  internationalTvShowsRomanticTvShowsTvDramas?: number; // Genre International TV Shows
  kidsTv?: number; // Genre Kids' TV
  languageTvShows?: number; // Genre Language TV Shows
  musicals?: number; // Genre Musicals
  natureTv?: number; // Genre Nature TV
  realityTv?: number; // Genre Reality TV
  spirituality?: number; // Genre Spirituality
  tvAction?: number; // Genre TV Action
  tvComedies?: number; // Genre TV Comedies
  tvDramas?: number; // Genre TV Dramas
  talkShowsTvComedies?: number; // Genre Talk Shows TV Comedies
  thrillers?: number; // Genre Thrillers
}

export default Movie;
