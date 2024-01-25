import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './movie.css';
import Review from '../review/Review'; // Import the Review component

const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='movie-container-content'>
        <div className='top-container'>
            <div className='container-content'>
                <img src={movie.imageUrl} alt={movie.title} />
                <div className='movie-data'>
                    <h1>{movie.title}</h1>
                    <hr />
                    <p>{movie.plot}</p>
                    <div className='movie-statistics'>
                        <p>Rank: {movie.rank}</p>
                        <p>Rating: {movie.rating}</p>
                        <p>Metascore: {movie.metascore}</p>
                        <p>Votes: {movie.votes}</p>
                    </div>
                </div>
            </div>
            <div className='review-container-content'>
                <Review movieId={id} />
            </div>
        </div>
        <div className='bottom-container'>
            <h2>Reviews</h2>
            <hr />
            <div className='bottom-container-content'>
                {movie.reviews.length === 0 ? (
                <h2>No Reviews for {movie.title}... be the first one to leave a review!</h2>
                ) : (
                movie.reviews.map((review) => (
                    <div key={review._id} className='review'>
                        <h3>{review.name} posted at {new Date(review.date).toLocaleDateString()}</h3>
                        <hr />
                        <p>{review.text}</p>
                    </div>
                ))
                )}
            </div>
        </div>
    </div>
  );
}

export default Movie;