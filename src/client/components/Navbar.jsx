import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div>
        <Link to='/home'>Home</Link>
        <Link to='/records'>Records</Link>
        <Link to='/artists'>Artists</Link>
        <Link to='/genres'>Genres</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
      </div>
    </>
  );
}
 
export default NavBar;