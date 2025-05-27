import movieModel from "../models/movieModel.js";

const addMovies = async (req, res) => {
  try {
    const movie = new movieModel({
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      language: req.body.language,
      rating: req.body.rating,
      image: req.body.image,
    });
    await movie.save();
    console.log(movie);
    return res.status(201).json({
      success: true,
      mesagge: "Movie added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      mesagge: "Failed to add the movie",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const updatedMovie = await movieModel.findByIdAndUpdate(
      movieId,
      req.body,
      { new: true } // return the updated document
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie: updatedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating movie",
      error: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedMovie = await movieModel.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the movie",
      error: error.message,
    });
  }
};

const getmovies = async (req, res) => {
  try {
    let movies = await movieModel.find({});

    res.send(movies);
  } catch (error) {}
};
export { addMovies, updateMovie, deleteMovie, getmovies };
