import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import Movies from './components/movies/Movies';
import Movie from './components/movie/Movie';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Footer from './components/footer/Footer';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  //const [cookies] = useCookies(['token']); // Use useCookies to access cookies

  // Under development
  /*useEffect(() => {
    if (cookies.token) { // Check if the token cookie exists
        setIsLoggedIn(true);

        axios.get(`${import.meta.env.VITE_PROD_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
        })
        .then(response => {
            setUser(response.data); 
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    }
  }, [cookies.token]);*/

  return (
    <Router>
      <div className='app'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={user && <Profile user={user} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;