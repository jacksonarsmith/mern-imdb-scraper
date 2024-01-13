const Movie = require('../models/Movie');


const movieController = {
    async getMovieById(req, res) { // Add this function
        try {
          const movie = await Movie.findById(req.params.id);
          if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
          }
          res.json(movie);
        } catch (error) {
          res.status(500).json({ message: 'Server error' });
        }
    },

    async addReview(req, res) {
      try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
          return res.status(404).json({ message: 'Movie not found' });
        }
  
        const review = {
          name: req.body.name,
          text: req.body.text,
        };
  
        movie.reviews.push(review);
        await movie.save();
  
        res.status(201).json(movie);
      } catch (error) {
        res.status(500).json({ message: 'Server error' });
      }
    },
};

module.exports = movieController;