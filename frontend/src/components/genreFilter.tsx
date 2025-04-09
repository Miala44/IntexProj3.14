import './GenreFilter.css';
function GenreFilter({
  genres,
  selectedGenres,
  onChange,
}: {
  genres: string[];
  selectedGenres: string[];
  onChange: (updated: string[]) => void;
}) {
  const toggleGenre = (genre: string) => {
    const updated = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    onChange(updated);
  };
  return (
    <div className="genre-buttons">
      {genres.map((genre) => (
        <button
          key={genre}
          className={`genre-button ${
            selectedGenres.includes(genre) ? 'selected' : ''
          }`}
          onClick={() => toggleGenre(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
export default GenreFilter;