import "./AddMovie.css";
import uploadArea from "../assets/uploadArea.png";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AddMovie = () => {
  const [image, setImage] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: "",
    image: "",
    genre: "Action",
    description: "",
    language: "",
    rating: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setMovieDetails({ ...movieDetails, [e.target.name]: e.target.value });
  };

  const addMovie = async () => {
    try {
      console.log(movieDetails);

      let movie = { ...movieDetails };

      let formData = new FormData();
      formData.append("movie", image);

      const uploadResponse = await axios.post(`${baseURL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.success) {
        movie.image = uploadResponse.data.image_url;

        const movieResponse = await axios.post(
          `${baseURL}/movies/addmovie`,
          movie
        );

        if (movieResponse.data.success || movieResponse.status === 200) {
          toast.success("Movie added successfully");
          setMovieDetails({
            title: "",
            image: "",
            genre: "Action",
            description: "",
            language: "",
            rating: "",
          });
        } else {
          toast.error("Failed to add movie");
        }
      } else {
        toast.error("Image upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong during upload");
    }
  };

  return (
    <div className="add-movie">
      <div className="addmovie-itemfield">
        <p>Movie Title</p>
        <input
          type="text"
          name="title"
          placeholder="Enter movie title"
          value={movieDetails.title}
          onChange={changeHandler}
        />
      </div>

      <div className="addmovie-itemfield">
        <p>Description</p>
        <input
          type="text"
          name="description"
          placeholder="Enter description"
          value={movieDetails.description}
          onChange={changeHandler}
        />
      </div>

      <div className="addmovie-itemfield">
        <p>Language</p>
        <input
          type="text"
          name="language"
          placeholder="Enter language"
          value={movieDetails.language}
          onChange={changeHandler}
        />
      </div>

      <div className="addmovie-itemfield">
        <p>Rating</p>
        <input
          type="text"
          name="rating"
          placeholder="Enter rating"
          value={movieDetails.rating}
          onChange={changeHandler}
        />
      </div>

      <div className="addmovie-itemfield">
        <p>Genre</p>
        <select
          name="genre"
          className="add-movie-selector"
          value={movieDetails.genre}
          onChange={changeHandler}
        >
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <div className="addmovie-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : uploadArea}
            alt=""
            className="addmovie-thumbnail-img"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>

      <button onClick={addMovie} className="addmovie-btn">
        ADD MOVIE
      </button>
    </div>
  );
};

export default AddMovie;
