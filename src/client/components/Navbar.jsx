import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <div>
        <Link to='/home'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/register'>Create Account</Link>
        <Link to='/login'>Login</Link>
        <Link to='/account'>Account</Link>
      </div>
    </>
  );
}
 
export default NavBar;