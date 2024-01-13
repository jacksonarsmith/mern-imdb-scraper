import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './review.css';

const Review = ({ movieId }) => {
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`http://localhost:3001/api/movies/${movieId}/reviews`, { name, text });
      setName('');
      setText('');
      console.log('Review submitted!');
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='review-container'>
        <input placeholder='Enter name...' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder='Enter review...' value={text} onChange={(e) => setText(e.target.value)} required />
        <button type="submit">Post Review</button>
    </form>
  );
}

Review.propTypes = {
    movieId: PropTypes.string.isRequired,
};

export default Review;