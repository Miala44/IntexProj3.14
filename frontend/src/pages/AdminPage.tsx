import { useEffect, useState } from 'react';
import { deleteMovie, fetchMovies } from '../api/MoviesAPI';
import Movie from '../types/Movie';
import Pagination from '../components/Pagination';
import NewMovieForm from '../components/NewMovieForm';
import EditMovieForm from '../components/EditProjectForm';
import AuthorizeView from '../components/AuthorizeView';

const AdminPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies(pageSize, pageNum, []);
        setMovies(data.movies);
        setTotalPages(Math.ceil(data.totalNumMovies / pageSize));
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [pageSize, pageNum]);

  const handleDelete = async (showId: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this movie?'
    );
    if (!confirmDelete) return;

    try {
      await deleteMovie(showId);
      setMovies(movies.filter((m) => m.showId !== showId));
    } catch (error) {
      alert('Failed to delete movie. Please try again.');
    }
  };

  if (loading) return <p style={{ color: 'white' }}>Loading movies...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <AuthorizeView requiredRole="admin">
      <div className="container mt-5" style={{ color: 'white' }}>
        <h1 className="text-center mb-4">Admin - Movies</h1>

        {!showForm && (
          <button
            className="btn btn-success mb-3"
            onClick={() => setShowForm(true)}
          >
            Add Movie
          </button>
        )}

        {showForm && (
          <NewMovieForm
            onSuccess={() => {
              setShowForm(false);
              fetchMovies(pageSize, pageNum, []).then((data) =>
                setMovies(data.movies)
              );
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingMovie && (
          <EditMovieForm
            movie={editingMovie}
            onSuccess={() => {
              setEditingMovie(null);
              fetchMovies(pageSize, pageNum, []).then((data) =>
                setMovies(data.movies)
              );
            }}
            onCancel={() => setEditingMovie(null)}
          />
        )}

        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Title</th>
              <th>Director</th>
              <th>Cast</th>
              <th>Country</th>
              <th>Release Year</th>
              <th>Rating</th>
              <th>Duration</th>
              <th>Description</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m) => (
              <tr key={m.showId}>
                <td>{m.showId}</td>
                <td>{m.type}</td>
                <td>{m.title}</td>
                <td>{m.director}</td>
                <td>{m.cast}</td>
                <td>{m.country}</td>
                <td>{m.releaseYear}</td>
                <td>{m.rating}</td>
                <td>{m.duration}</td>
                <td>{m.description}</td>
                <td>{m.genre}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm w-100 mb-1"
                    onClick={() => setEditingMovie(m)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm w-100"
                    onClick={() => handleDelete(m.showId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={pageNum}
          totalPages={totalPages}
          pageSize={pageSize}
          onPageChange={setPageNum}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPageNum(1);
          }}
        />
      </div>
    </AuthorizeView>
  );
};

export default AdminPage;
