import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './home.css'

const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:3001/api/movies/top1000')
      const moviesData = result.data.movies
    
      const highestRanked = moviesData[0]
      const highestMetascore = moviesData.reduce((highest, movie) => parseInt(movie.metascore, 10) > parseInt(highest.metascore, 10) ? movie : highest)
      const mostVoted = moviesData.reduce((most, movie) => parseInt(movie.votes.replace(/,/g, ''), 10) > parseInt(most.votes.replace(/,/g, ''), 10) ? movie : most)
      const highestRated = moviesData.reduce((highest, movie) => parseFloat(movie.rating) > parseFloat(highest.rating) ? movie : highest)
    
      setMovies([
        { title: 'Highest Ranked Movie', movie: highestRanked },
        { title: 'Highest Metascore', movie: highestMetascore },
        { title: 'Most Voted Movie', movie: mostVoted },
        { title: 'Highest Rated Movie', movie: highestRated },
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
        <h1>Smith Scraper's Movie Tracker</h1>
        <br />
        <hr />
        <p>Smith Scraper's Movie Tracker scrapes the <strong>TOP 1000</strong> movies ranked by <a href="imdb.com">IMDb</a> and provides a unique and seemless way to find the right movie to watch! The data is regularly updated to ensure accurate ranking. Get creative with your entertainment choices by seeing the best movies to watch with a click of a button!</p>
        <button>Browse Movies</button>
      </div>
      <div className='home-content'>
        {movies.map(({ title, movie }) => (
          <div className='featured-movie' key={title}>
            <div className='movie-image'>
              <h2>{title}</h2>
              <hr />
              <br />
              <img src={movie.imageUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Home