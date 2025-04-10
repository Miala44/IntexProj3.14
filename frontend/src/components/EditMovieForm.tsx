import { useState } from 'react';
import Movie from '../types/Movie';
import { addMovie, updateMovie } from '../api/MoviesAPI';

interface EditMovieFormProps {
  movie: Movie;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditMovieForm = ({ movie, onSuccess, onCancel }: EditMovieFormProps) => {
  const [formData, setFormData] = useState<Movie>({ ...movie });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await updateMovie(String(formData.showId), formData);
  //   onSuccess();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await updateMovie(String(formData.showId), formData);
      console.log("Movie updated successfully", res);
      onSuccess();
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update movie. Check console.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: 'white' }}>Edit Movie</h2>
      <label style={{ color: 'white' }}>
        Type:     <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Title:     <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Director:     <input     
          type="text"
          name="director"
          value={formData.director}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Cast:     <input
          type="text"
          name="cast"
          value={formData.cast}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Country:     <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label >
  
      <label style={{ color: 'white' }}>
        Release Year:     <input
          type="number"
          name="releaseYear"
          value={formData.releaseYear}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Rating:     <input
          type="text"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Duration:     <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Description:     <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>

      <label style={{ color: 'white' }}>
        Genre:     <input
          type="text"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
        />
      </label>
      <br></br>
      <button type="submit">Update Movie</button>
      <br></br><br></br>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
export default EditMovieForm;
