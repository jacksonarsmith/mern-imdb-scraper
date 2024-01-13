const mongoose = require('mongoose');
const movieReviewSchema = require('./MovieReview'); 

const movieSchema = new mongoose.Schema({
  rank: { type: String, required: true },
  title: { type: String, required: true },
  rating: { type: String },
  metascore: { type: String },
  plot: { type: String },
  votes: { type: String },
  imageUrl: { type: String },
  reviews: [movieReviewSchema], 
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;