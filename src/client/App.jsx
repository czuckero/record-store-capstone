import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import NavBar from './components/Navbar'
import Records from './components/Records'
import Register from './components/Register'
import Account from './components/Account'
import SingleArtist from './components/SingleArtist';
import SingleRecord from './components/SingleRecord';
import Checkout from './components/Checkout';
import About from './components/About';

import { Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className='App'>
        <h1>Boilerplate</h1>
        <img id='comp-img' src='./computer.png'></img>
        <p>Replace the starter code in this template with something cool</p>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route path='/home' element={ <Records /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/artist/:id' element={ <SingleArtist /> } />
          <Route path='/records/:id' element={ <SingleRecord /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/account' element={ <Account /> } />
          <Route path='/checkout' element={ <Checkout /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
