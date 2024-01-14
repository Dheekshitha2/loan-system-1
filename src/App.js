import React, { useState } from 'react';
import './styles/App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BorrowForm from './components/BorrowForm';
import NewBorrowForm from './components/NewBorrowForm';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navbar cart={cart} setCart={setCart} />
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} />} />
          <Route path="/borrow-form" element={<BorrowForm selectedItems={cart} />} />
          <Route path="/new-borrow-form" element={<NewBorrowForm />} /> {/* New route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

