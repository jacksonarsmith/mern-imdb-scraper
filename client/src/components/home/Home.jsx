import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './home.css'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${import.meta.env.VITE_PROD_URL}/movies/top1000`)
      const moviesData = result.data.movies

      if (!moviesData) {
        console.error('No movies data received');
        return;
      }
  
      const highestRanked = moviesData.find(movie => parseInt(movie.rank, 10) === 1);
      const highestMetascore = moviesData.reduce((highest, movie) => parseInt(movie.metascore, 10) > parseInt(highest.metascore, 10) ? movie : highest)
      const mostVoted = moviesData.reduce((most, movie) => parseInt(movie.votes.replace(/,/g, ''), 10) > parseInt(most.votes.replace(/,/g, ''), 10) ? movie : most)
      const highestRated = moviesData.reduce((highest, movie) => parseFloat(movie.rating) > parseFloat(highest.rating) ? movie : highest)
  
      const highlightedMovie = moviesData.find(movie => {
        const votes = parseInt(movie.votes.replace(/,/g, ''), 10)
        const rating = parseFloat(movie.rating)
        const metascore = parseInt(movie.metascore, 10)
  
        return votes > 100000 && rating > 8.0 && metascore > 80
      })
  
      setMovies([
        { title: 'Highest Ranked', movie: highestRanked },
        { title: 'Highest Metascore', movie: highestMetascore },
        { title: 'Most Voted', movie: mostVoted },
        { title: 'Highest Rated ', movie: highestRated },
        { title: 'Smith Scrapers Featured Movie', movie: highlightedMovie },
      ])
    }
  
    fetchData()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => {
        return (prevIndex + 1) % movies.length;
      });
    }, 6000);

    return () => clearInterval(timer); // This will clear Interval while unmounting the component
  }, [movies]);

  if (movies.length === 0) {
    return (
      <div>
        <svg viewBox="25 25 50 50">
          <circle r="20" cy="50" cx="50"></circle>
        </svg>
      </div>
    );
  }

  return (
    <div className='home-container'>
      <div className='home-heading'>
        <h1>Smith Scrapers Movie Tracker</h1>
        <br />
        <hr />
        <p>Smith Scrapers Movie Tracker scrapes the <strong>TOP 1000</strong> movies ranked by <a className='imdb-link' href="imdb.com">IMDb</a> and provides a unique and seemless way to find the right movie to watch! The data is regularly updated to ensure accurate ranking. Get creative with your entertainment choices by seeing the best movies to watch with a click of a button!</p>
        <br />
        <button>
          <Link to="/movies" className='heading-button'>Browse Movies</Link>
        </button>
      </div>
      <div className='home-content'>
        <div className='featured-movies'>
          {movies.map((movie, index) => (
            <div 
              key={`${index}-${currentMovieIndex}`} 
              className={`home-movie-image ${index === currentMovieIndex ? 'active' : ''}`}
            >
              <h2>{movie.title}</h2>
              <Link to={`/movies/${movie.movie._id}`}>
                <img src={movie.movie.imageUrl} alt={movie.movie.title} />
              </Link>
              <h3>{movie.movie.title}</h3>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  )
}

export default Home