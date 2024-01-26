const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const scraper = require('./utils/scraper');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

// Check if the movies collection is empty
const Movie = require('./models/Movie');

Movie.countDocuments({})
  .then(count => {
    if (count === 0) {
      // If the collection is empty, initiate the web scraper
      scraper.scrapeAndPopulateDatabase();
    }
  })
  .catch(err => {
    console.error('Failed to count documents:', err);
  });
  

// API routes
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
