import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'; // Import useCookies
import { PropTypes } from 'prop-types';
import './navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const [cookies, removeCookie] = useCookies(['token']); // Use useCookies to access cookies
  
    const logout = () => {
      removeCookie('token'); // Remove the token cookie
      setIsLoggedIn(false);
    };

    console.log('Is user logged in?', isLoggedIn); // Add this line
  
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
};

Navbar.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    setIsLoggedIn: PropTypes.func.isRequired,
};

export default Navbar;