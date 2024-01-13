const Movie = require('../models/Movie');

const moviesController = {
  async getTop1000Movies(req, res) {
    try {
      const movies = await Movie.find().limit(1000);
      res.json({ success: true, movies });
    } catch (error) {
      console.error('Error fetching top 1000 movies:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  },
};

module.exports = moviesController;
