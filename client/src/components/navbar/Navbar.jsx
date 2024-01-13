import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
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
            </ul>
        </nav>
    </div>
  )
}

export default Navbar