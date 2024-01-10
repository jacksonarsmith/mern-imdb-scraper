const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Define API routes
router.get('/top1000', movieController.getTop1000Movies);

module.exports = router;
