import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';
import './movies.css';

const MovieCard = ({ movie }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <div className={`card ${inView ? 'animate' : ''}`} ref={ref}>
      <div className='movie-data'>
        <h2>{movie.title}</h2>
        <hr />
        <p>IMDb Ranking: {movie.rank}</p>
        <p>Rating: {movie.rating}</p>
        <p>Metascore: {movie.metascore}</p>
        <p>Votes: {movie.votes}</p>
      </div>
      <div className='movie-image'>
        <Link to={`/movies/${movie._id}`}>
          <img src={movie.imageUrl} alt={movie.title} />
        </Link>
      </div>
    </div>
  );
};

const Movies = () => {
  const [movies, setMovies] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${import.meta.env.VITE_PROD_URL}/movies/top1000`)
      setMovies(result.data.movies)
    }

    fetchData()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filter === 'metascore') {
        return Number(b.metascore) - Number(a.metascore)
      } else if (filter === 'votes') {
        return parseInt(b.votes.replace(/,/g, ''), 10) - parseInt(a.votes.replace(/,/g, ''), 10)
      } else if (filter === 'rating') {
        return parseFloat(b.rating) - parseFloat(a.rating)
      } else {
        return a.rank - b.rank
      }
  })

  return (
    <div className='movies-container'>
        <div className='movies-heading'>
            <h1>Top 1000 Movies</h1>
            <br />
            <hr />
            <p>
              Dive into the world of cinematic excellence with our curated list of the top 1000 movies according to <a href="https://imdb.com">IMDb</a>, featuring an intuitive filter for personalized exploration. 
              From timeless classics to contemporary gems, this collection offers a diverse journey through the world of film. Whether you&apos;re a seasoned cinephile or a casual viewer, 
              discover unforgettable titles that promise an unparalleled cinematic experience tailored to your preferences.
            </p>
        </div>
        <div className='search-filter'>   
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} />
            <select value={filter} onChange={handleFilterChange}>
                <option value="">Rank (Default)</option>
                <option value="metascore">Metascore</option>
                <option value="votes">Votes</option>
                <option value="rating">Rating</option>
            </select>
        </div>
        <div className='movies-list'>
            {filteredMovies.map(movie => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
        </div>
    </div>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    rank: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    rating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    metascore: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    votes: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Movies