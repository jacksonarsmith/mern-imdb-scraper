const axios = require('axios');
const cheerio = require('cheerio');
const Movie = require('../models/Movie');

const scraper = {
    async scrapeAndPopulateDatabase() {
      try {
        // Fetch HTML content from IMDb (replace with the actual IMDb URL)
        const imdbUrl = 'https://www.imdb.com/search/title/?groups=top_1000';
        const { data } = await axios.get(imdbUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
          },
        });
  
        // Parse HTML using Cheerio
        const $ = cheerio.load(data);
        const movies = [];
  
        // Access data using the provided list item structure
        $('li.ipc-metadata-list-summary-item').each(function (index, element) {
            //const $movieElement = $(element).find('.sc-b4e41383-4, .efDLHx, .dli-parent');
            const $movieElement = $(element);
            const titleElement = $movieElement.find('.ipc-title__text');
            const fullTitle = titleElement.text().trim();
            const titleParts = fullTitle.split('.'); // Split the title into parts at the period
            const rank = titleParts[0]; // The rank is the first part
            const title = titleParts.slice(1).join('.').trim(); // The title is everything after the first part, trimmed to remove leading and trailing spaces

            const rating = $movieElement.find('[data-testid="ratingGroup--imdb-rating"]').text().trim().match(/\d+\.\d+/)?.[0] ?? 'N/A';
            const metascore = $movieElement.find('.metacritic-score-box').text().trim();
            const plot = $movieElement.find('.dli-plot-container .ipc-html-content-inner-div').text().trim();
            const votes = $movieElement.find('.sc-b4e41383-0.cyGaqI').text().trim().replace('Votes', '').trim();
            const imageUrl = $movieElement.find('.ipc-media.ipc-media--poster-27x40.ipc-image-media-ratio--poster-27x40.ipc-media--base.ipc-media--poster-m.ipc-poster__poster-image.ipc-media__img img').attr('src');
    
            movies.push({ rank, title, rating, metascore, plot, votes, imageUrl });
        });
  
        // Save the data to the MongoDB database
        await Movie.insertMany(movies);
  
        console.log('Database populated with web scraped data.');
        console.log(movies);
      } catch (error) {
            console.error('Error scraping and populating database:', error);
      }
    },
  };
  
  module.exports = scraper;  