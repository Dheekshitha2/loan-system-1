import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles/App.css'


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

    return (
        <div>
            <div
                className={`inventory-item ${isClicked ? 'clicked' : ''}`}
                onClick={handleItemClick}
            >
                <h3 className="item-title">{item.item_name}</h3>
                <p className="item-details">Quantity Available: {item.total_qty}</p>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{item.item_name}</h2>
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

    useEffect(() => {
        fetch('http://localhost:5000/api/inventory')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const addToCart = (item, quantity) => {
        const newCartItem = { ...item, quantity };
        setCart(currentCart => [...currentCart, newCartItem]);
    };

    const filteredItems = items.filter(item =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Search for equipment..."
                value={searchTerm}
                onChange={handleSearchChange}
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
