import { useState } from "react"
import Movie from "../types/Movie"
import { addMovie } from "../api/MoviesAPI";

interface NewMovieFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewMovieForm = ({ onSuccess, onCancel }: NewMovieFormProps) => {
    const [formData, setFormData] = useState<Movie>({
        showId: 0,
        type: '',
        title: '',
        director: '',
        cast: '',
        country: '', 
        releaseYear: 0,
        rating: '',
        duration: '',
        description: '', 
        genre:  '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     await addMovie(formData);
    //     onSuccess();
    // }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // 🪄 Add this line right before the API call
        console.log("🎬 Submitting movie data:", formData);
      
        try {
          await addMovie(formData);
          onSuccess();
        } catch (err) {
          console.error("❌ Failed to add movie:", err);
        }
      };
      
    
    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ color: 'white' }}>Add New Movie</h2>

            <label style={{ color: 'white' }}>Type:     <input 
            type='text' 
            name="type" 
            value={formData.type} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Title:     <input 
            type='text' 
            name="title" 
            value={formData.title} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Director:     <input 
            type='text' 
            name="director" 
            value={formData.director} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Cast:     <input 
            type='text' 
            name="cast" 
            value={formData.cast} 
            onChange={handleChange}/></label>
    
            <label style={{ color: 'white' }}>Country:     <input 
            type='text' 
            name="country" 
            value={formData.country} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Release Year:     <input 
            type='number' 
            name="releaseYear" 
            value={formData.releaseYear} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Rating:     <input 
            type='text' 
            name="rating" 
            value={formData.rating} 
            onChange={handleChange}/></label>
            <br></br>
            <label style={{ color: 'white' }}>Duration:     <input 
            type='text' 
            name="duration" 
            value={formData.duration} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Description:     <input 
            type='text' 
            name="description" 
            value={formData.description} 
            onChange={handleChange}/></label>
            
            <label style={{ color: 'white' }}>Genre:     <input 
            type='text' 
            name="genre" 
            value={formData.genre} 
            onChange={handleChange}/></label>
            <br></br>
            <button type="submit">Add Movie</button>
            <br></br>
            <br></br>
            <button type="button" onClick={() => { console.log("cancel clicked"); onCancel(); }}>Cancel</button>

        </form>
    )
    }
    export default NewMovieForm