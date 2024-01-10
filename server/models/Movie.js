const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  rank: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: String },
  metascore: { type: String },
  plot: { type: String },
  votes: { type: String },
  imageUrl: { type: String }, // Added imageUrl field
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
