import { Route, Routes } from 'react-router-dom'
import  "bootstrap/dist/css/bootstrap.css";
import './App.css'

import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { UserProvider } from './context/UserProvider';

// =========== import components =============
import { Cart, Navbar } from './components'
import Signup from './pages/Signup'
import Login from './pages/Login'

// =========== import pages =============
import { About, Home, Store } from './pages'



function App() {
  
  return (
    <UserProvider>
    <ShoppingCartProvider>
      <Navbar />
      {/* ================== routes ================ */}
      <main className='main container mx-auto px-1 pt-3 bg-transparent'>
        <Routes>
        <Route path="/signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>}/>
          <Route path="/home" element={<Home  />} />
          <Route path='/store' element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </ShoppingCartProvider>
    </UserProvider>
  )
}

export default App
