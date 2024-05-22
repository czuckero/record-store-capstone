import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import NavBar from './components/Navbar'
import Records from './components/Records'
import Artists from './components/Artists'
import Genres from './components/Genres'
import Register from './components/Register'
import Account from './components/Account'

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
          <Route path='/records' element={ <Records /> } />
          <Route path='/artists' element={ <Artists /> } />
          <Route path='/genres' element={ <Genres /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/account' element={ <Account /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
