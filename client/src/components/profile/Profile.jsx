import { PropTypes } from 'prop-types';
import './profile.css';

const Profile = ({ user }) => {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;