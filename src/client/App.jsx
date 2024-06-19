import { useState } from 'react';
import reactLogo from './assets/react.svg';
import Login from './components/Login';
import NavBar from './components/Navbar'
import Records from './components/Records'
import Registration from './components/Registration'
import Account from './components/Account'
import SingleRecord from './components/SingleRecord';
import Checkout from './components/Checkout';
import About from './components/About';
import ShoppingCart from './components/ShoppingCart';
import Success from './components/Success';
import Footer from './components/Footer'

import { Routes, Route } from 'react-router-dom'

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <Routes>
          <Route path='/home' element={ <Records /> } />
          <Route path='/about' element={ <About /> } />
          <Route path='/records/:recordId' element={ <SingleRecord token={token} /> } />
          <Route path='/register' element={ <Registration setToken={setToken} /> } />
          <Route path='/login' element={ <Login setToken={setToken} /> } />
          <Route path='/account' element={ <Account token={token} /> } />
          <Route path='/cart' element={ <ShoppingCart token={token} />} />
          <Route path='/checkout' element={ <Checkout token={token}/> } />
          <Route path='/success' element={ <Success />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default App;
