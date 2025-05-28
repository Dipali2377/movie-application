import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./ListMovies.css";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const ListMovies = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const response = await axios.get(`${baseURL}/movies/allmovies`);
      setAllMovies(response.data);
      setFilteredMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    let filtered = [...allMovies];

    if (searchTerm) {
      filtered = filtered.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredMovies(filtered);
  }, [searchTerm, sortOption, allMovies]);

  const deleteMovie = async (id) => {
    try {
      await axios.delete(`${baseURL}/movies/deletemovie/${id}`);
      toast.success("Movie deleted successfully");
      fetchInfo();
    } catch (error) {
      toast.error("Failed to delete movie");
      console.error(error);
    }
  };

  const handleUpdate = (movie) => {
    navigate(`/updatemovie/${movie._id}`, { state: { movie } });
  };

  return (
    <>
      <div className="list-movies-header enhanced-controls">
        <button
          className="add-movie-button"
          onClick={() => navigate("/addmovie")}
        >
          ➕ Add New Movie
        </button>

        <div className="search-sort-controls">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="movie-search"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="movie-sort"
          >
            <option value="">Sort</option>
            <option value="title">Title (A-Z)</option>
            <option value="rating">Rating (High-Low)</option>
          </select>
        </div>
      </div>

      <div className="list-movies-container">
        <h1 className="list-movies-heading">All Movies</h1>
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div key={movie._id} className="movie-box">
              <img
                src={movie.image}
                alt={movie.title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p>
                  <strong>Language:</strong> {movie.language}
                </p>
                <p>
                  <strong>Rating:</strong> {movie.rating} ⭐
                </p>
              </div>
              <div className="movie-actions">
                <button
                  onClick={() => handleUpdate(movie)}
                  className="btn update"
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    Swal.fire({
                      title: `Delete "${movie.title}"?`,
                      text: "This action cannot be undone.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteMovie(movie._id);
                      }
                    })
                  }
                  className="btn delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListMovies;
