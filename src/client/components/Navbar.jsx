import { Link } from 'react-router-dom';
import './CSS/Navbar.css';

const Navbar = ({ token, setToken }) => {
  if (token) {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/home">Groove Haven</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/cart">View Cart</Link>
          </li>
          <li>
            <Link to="/home" onClick={() => {
              setToken(null);
            }}>Log Out</Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/home">Groove Haven</Link>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/register">Create Account</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/account">Account</Link>
          </li>
          <li>
            <Link to="/cart">View Cart</Link>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
