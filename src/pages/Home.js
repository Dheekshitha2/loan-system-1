import React from 'react';
import InventoryList from '../components/InventoryList';

function Home({ cart, setCart }) {
  return (
    <div>
      <h1>Welcome to Our Inventory System</h1>
      <InventoryList cart={cart} setCart={setCart} />
    </div>
  );
}

export default Home;


