import { Link } from 'react-router-dom';
import './CSS/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to='/home'>Groove Haven</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/register'>Create Account</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/account'>Account</Link></li>
        <li><Link to='/cart'>View Cart</Link></li>
        <li><input type="text" placeholder="Search..." /></li>
      </ul>
    </nav>
  );
}

export default Navbar;
