import React from 'react';
import InventoryList from '../components/InventoryList';

function Home({ cart, setCart }) {
  return (
    <div>
      <h1>Welcome to Our Inventory System</h1>
      <p>
        Feel free to browse through the items we have for loan in the iDP Hub, and choose
        any items you require.
      </p>
      <InventoryList cart={cart} setCart={setCart} />
    </div>
  );
}

export default Home;


