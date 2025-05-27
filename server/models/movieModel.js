import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String, // e.g., ['Action', 'Drama']
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
  },
  image: { type: String, required: true },
});

const movieModel = mongoose.model("Movies", movieSchema);

export default movieModel;
