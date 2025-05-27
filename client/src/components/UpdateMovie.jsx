import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UpdateMovie.css";

const UpdateMovie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { movie } = location.state;

  const [movieDetails, setMovieDetails] = useState({ ...movie });

  const changeHandler = (e) => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
  };

  const updateMovie = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5050/movies/updatemovie/${movieDetails._id}`,
        movieDetails
      );
      if (response.data.success || response.status === 200) {
        toast.success("Movie updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 800);
      } else {
        toast.error("Failed to update movie");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="update-movie">
      <h2>Update Movie</h2>
      <input
        type="text"
        name="title"
        value={movieDetails.title}
        onChange={changeHandler}
      />
      <input
        type="text"
        name="description"
        value={movieDetails.description}
        onChange={changeHandler}
      />
      <input
        type="text"
        name="language"
        value={movieDetails.language}
        onChange={changeHandler}
      />
      <input
        type="text"
        name="rating"
        value={movieDetails.rating}
        onChange={changeHandler}
      />
      <select name="genre" value={movieDetails.genre} onChange={changeHandler}>
        <option value="Action">Action</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Romance">Romance</option>
        <option value="Thriller">Thriller</option>
      </select>
      <button onClick={updateMovie}>Update Movie</button>
    </div>
  );
};

export default UpdateMovie;
