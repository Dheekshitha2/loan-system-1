import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles/App.css';
import SearchBar from './SearchBar';


function InventoryItem({ item, onAddToCart }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [isClicked, setIsClicked] = useState(false);

    const handleItemClick = () => {
        setModalOpen(true);
        setIsClicked(true); // Set clicked state to true
    };

    const handleAddToCart = () => {
        onAddToCart(item, quantity);
        setModalOpen(false);
        setIsClicked(false); // Reset clicked state when modal is closed
    };

    const imageUrl = `/assets/${item.item_name}_${item.brand}_${item.model}.jpg`.replace(/\s+/g, '_').toLowerCase();
    const defaultImageUrl = `/assets/default.jpg`;

    const handleImageError = (e) => {
        e.target.src = defaultImageUrl;
    };

    return (
        <div>
            <div
                className={`inventory-item ${isClicked ? 'clicked' : ''}`}
                onClick={handleItemClick}
            >
                <img
                    src={imageUrl}
                    alt={item.item_name}
                    onError={handleImageError}
                    className="item-image"
                />
                <h3 className="item-title">{item.item_name}</h3>
                <p className="item-details">Quantity Available: {item.qty_available}</p>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{item.item_name}</h2>
                <p>Brand: {item.brand}</p>
                <p>Model: {item.model}</p>
                <p>Serial Number: {item.serial_no}</p>
                <p>Size/Specs: {item.size_specs}</p>
                <img
                    src={imageUrl}
                    alt={`${item.item_name} ${item.brand} ${item.model}`}
                    onError={handleImageError}
                    className="item-modal-image"
                />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
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
        const newCartItem = { ...item, qty_borrowed: quantity };
        setCart(currentCart => [...currentCart, newCartItem]);
    };

    const filteredItems = items.filter(item =>
        (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <SearchBar
                onSearchChange={handleSearchChange}
                onCategoryChange={handleCategoryChange}
                selectedCategories={selectedCategories} // Use selectedCategories
            />
            <div className="inventory-list">
                {filteredItems.map(item => (
                    <InventoryItem
                        key={item.item_id}
                        item={item}
                        onAddToCart={addToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default InventoryList;
