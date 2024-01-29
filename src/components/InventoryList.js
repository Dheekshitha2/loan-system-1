import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles/App.css';
import SearchBar from './SearchBar';

function InventoryItem({ item, onAddToCart }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleItemClick = () => {
        setModalOpen(true);
    };

    const handleAddToCart = () => {
        onAddToCart(item, quantity);
        setModalOpen(false);
    };

    const imageUrl = `/assets/${item.item_name}_${item.brand}_${item.model}.jpg`.replace(/\s+/g, '_').toLowerCase();
    const defaultImageUrl = `/assets/default.jpg`;

    const handleImageError = (e) => {
        e.target.src = defaultImageUrl;
    };

    return (
        <div>
            <div className={`inventory-item`} onClick={handleItemClick}>
                <img src={imageUrl} alt={item.item_name} onError={handleImageError} className="item-image" />
                <h3 className="item-title">{item.item_name}</h3>
                {item.brand && <p className="item-brand">Brand: {item.brand}</p>}
                <p className="item-details">Quantity Available: {item.qty_available}</p>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{item.item_name}</h2>
                {item.brand && <p>Brand: {item.brand}</p>}
                <p>Model: {item.model || 'N/A'}</p>
                <p>Serial Number: {item.serial_no || 'N/A'}</p>
                <p>Size/Specs: {item.size_specs || 'N/A'}</p>
                <img src={imageUrl} alt={`${item.item_name} view`} onError={handleImageError} className="item-modal-image" />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    min="1"
                    max={item.total_qty}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </Modal>
        </div>
    );
}





function InventoryList({ cart, setCart }) {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]); // Change to array

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetch(`${API_URL}/api/inventory`)
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, [API_URL]);

    const handleSearchChange = (newSearchTerm) => {
        setSearchTerm(newSearchTerm);
    };

    const handleCategoryChange = (category) => {
        if (Array.isArray(category) && category.length === 0) {
            setSelectedCategories([]);
        } else if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(cat => cat !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const addToCart = (item, quantity) => {
        // Find if the item is already in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.item_id === item.item_id);

        if (existingItemIndex >= 0) {
            // If the item exists, update the quantity, ensuring it does not exceed available quantity
            const existingItem = cart[existingItemIndex];
            const updatedQty = existingItem.qty_borrowed + quantity;

            if (updatedQty > item.qty_available) {
                alert(`You cannot add more than ${item.qty_available} of this item.`);
                return;
            }

            let updatedCart = [...cart];
            updatedCart[existingItemIndex] = { ...existingItem, qty_borrowed: updatedQty };
            setCart(updatedCart);
        } else {
            // If the item is not in the cart, add it directly
            if (quantity > item.qty_available) {
                alert(`You cannot add more than ${item.qty_available} of this item.`);
                return;
            }

            // If the item is not in the cart and the cart length is 5, prevent adding
            if (!existingItemIndex && cart.length >= 5) {
                alert("You cannot add more than 5 different items to the cart.");
                return;
            }
            const newCartItem = { ...item, qty_borrowed: quantity };
            setCart(currentCart => [...currentCart, newCartItem]);
        }
    };

    const filteredItems = items.filter(item =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        item.qty_available > 0
    );

    return (
        <div className="main-content">
            <div>
                <SearchBar
                    onSearchChange={handleSearchChange}
                    onCategoryChange={handleCategoryChange}
                    selectedCategories={selectedCategories}
                />
                <div className="inventory-list">
                    {filteredItems.map(item => (
                        <InventoryItem
                            key={item.item_id}
                            item={item}
                            onAddToCart={addToCart}
                        />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default InventoryList;
