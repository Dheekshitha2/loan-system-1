import React, { useState } from 'react';
import '../styles/App.css';
import InventoryList from '../components/InventoryList';

function Home({ cart, setCart }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (Array.isArray(category) && category.length === 0) {
      setSelectedCategories([]);
    } else if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="content-area">
      <div className="welcome-message">
        <h1>Welcome to the Hub’s Tool Catalogue</h1>
        <p>Feel free to browse through the items we have for loan in the iDP Hub, and choose any items you require.</p>
      </div>
      <InventoryList
        cart={cart}
        setCart={setCart}
        selectedCategories={selectedCategories} />
    </div>
  );
}

export default Home;
