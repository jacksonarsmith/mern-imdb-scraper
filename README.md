# IMDb Top 1000 Movies Scraper

This application is a robust, full-stack solution developed using the MERN stack (MongoDB, Express.js, React, Node.js). It is designed to efficiently scrape and process data from IMDb's top 1000 movies, addressing the need for a comprehensive and user-friendly platform to explore and analyze IMDb's top-rated movies.

The back-end, powered by Express.js and Mongoose, leverages the power of Puppeteer for web scraping. It fetches and stores data from IMDb's top 1000 movies, providing a reliable and efficient data source for the application. This data includes key details about each movie, such as the title, rank, metascore, votes, and rating.

The front-end, built with React, presents this data in an intuitive and user-friendly interface. It provides users with insightful visualizations of IMDb's top-rated movies, enhancing their understanding and appreciation of these films. The application also includes advanced search and filter options, enabling users to find their desired movies based on various parameters. This feature addresses the challenge of navigating through a large amount of data, making the exploration of IMDb's top 1000 movies a seamless and enjoyable experience.

In addition to these features, the application allows users to create an account and leave reviews for movies. This not only enables a personalized user experience but also fosters a community of movie enthusiasts who can share their views and insights about different movies.

## Features

- **Data Scraping**: Utilizes Puppeteer to scrape data from IMDb's top 1000 movies, efficiently fetching and storing data for further processing.
- **User Registration**: Allows users to create an account, enabling a personalized user experience.
- **Movie Reviews**: Users can leave reviews for movies, contributing to the community's understanding and appreciation of these films.
- **Search and Filter**: Offers advanced search and filter options, enabling users to find their desired movies based on various parameters such as title, rank, metascore, votes, and rating.
- **Interactive Visualizations**: Presents data in an intuitive and user-friendly interface, providing insightful visualizations of IMDb's top-rated movies.

## Technologies Used

### Back-end

- Node.js
- Express.js
- MongoDB
- Mongoose
- Puppeteer
- Axios
- bcrypt
- cookie-parser
- cors
- dotenv
- jsonwebtoken

### Front-end

- React
- react-router-dom
- react-cookie
- axios
- dotenv
- prop-types
- react-dom
- react-toastify

## License

MIT