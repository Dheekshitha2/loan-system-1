import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewBorrowForm from './components/NewBorrowForm';
import { CartProvider } from './components/CartContext'; // Import the provider


function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Navbar cart={cart} setCart={setCart} />
          <Routes>
            <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
            <Route path="/new-borrow-form" element={<NewBorrowForm />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;

