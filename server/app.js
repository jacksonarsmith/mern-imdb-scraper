const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');
const scraper = require('./utils/scraper');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI);

// Check if the movies collection is empty
const Movie = require('./models/Movie');

(async () => {
    const count = await Movie.countDocuments({});
    if (count === 0) {
      // If the collection is empty, initiate the web scraper
      await scraper.scrapeAndPopulateDatabase();
    }
})();
  

// API routes
app.use('/api/movies', movieRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
