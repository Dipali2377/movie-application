import express from "express";
import {
  addMovies,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const movieRouter = express.Router();

movieRouter.post("/addmovie", addMovies);
movieRouter.put("/updatemovie/:id", updateMovie);
movieRouter.delete("/deletemovie/:id", deleteMovie);

export default movieRouter;
