const express = require('express');
const moviesController = require('../controllers/moviesController');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Define API routes
router.get('/top1000', moviesController.getTop1000Movies);
router.get('/:id', movieController.getMovieById);
router.post('/:id/reviews', movieController.addReview);

module.exports = router;
