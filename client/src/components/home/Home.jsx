import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './home.css'

const Home = () => {
  const [movies, setMovies] = useState([])

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

  if (movies.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className='home-container'>
      <div className='home-heading'>
        <h1>Smith Scrapers Movie Tracker</h1>
        <br />
        <hr />
        <p>Smith Scrapers Movie Tracker scrapes the <strong>TOP 100</strong> movies ranked by <a className='imdb-link' href="imdb.com">IMDb</a> and provides a unique and seemless way to find the right movie to watch! The data is regularly updated to ensure accurate ranking. Get creative with your entertainment choices by seeing the best movies to watch with a click of a button!</p>
        <br />
        <button>
          <Link to="/movies" className='heading-button'>Browse Movies</Link>
        </button>
      </div>
      <div className='featured-movie'>
        <div className='movie-image'>
          <h2>{movies[4].title}</h2>
          <br />
          <Link to={`/movies/${movies[4].movie._id}`}>
            <img src={movies[4].movie.imageUrl} alt={movies[4].movie.title} />
          </Link>
          <h3>{movies[4].movie.title}</h3>
        </div>
      </div>
      <div className='home-content'>
        {movies.slice(0, 4).map(({ title, movie }) => (
          <div className='featured-movies' key={title}>
            <div className='movie-image'>
              <h2>{title}</h2>
              <br />
              <Link to={`/movies/${movie._id}`}>
                <img src={movie.imageUrl} alt={movie.title} />
              </Link>
              <h3>{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home