import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../styles/App.css';
import SearchBar from './SearchBar';
import { useCart } from './CartContext';

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

    const imageName = item.item_name ? item.item_name.replace(/\//g, '_').replace(/\s+/g, '_') : 'default';
    const brandName = item.brand ? item.brand.replace(/\s+/g, '_') : 'default_brand';
    const imageUrl = item.brand ? `/assets/${imageName}-${brandName}.jpg`.toLowerCase() : `/assets/${imageName}.jpg`.toLowerCase();
    const defaultImageUrl = `/assets/default.jpg`;

    const handleImageError = (e) => {
        e.target.src = defaultImageUrl;
    };

    return (
        <div>
            <div className={`inventory-item`} onClick={handleItemClick}>
                <img src={imageUrl} alt={item.item_name} onError={handleImageError} className="item-image" />
                <h3 className="item-title">{item.item_name}</h3>
                {item.brand && <p className="item-brand">{item.brand}</p>}
                <p className="item-details">Qty: {item.qty_available}</p>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <h2>{item.item_name}</h2>
                {item.brand && <p><strong>Brand:</strong> {item.brand}</p>}
                <p><strong>Model:</strong> {item.model || 'N/A'}</p>
                <p><strong>Size/Specs:</strong> {item.size_specs || 'N/A'}</p>
                <p><strong>Requires Approval:</strong> {item.requires_approval === 'true' ? 'Yes' : 'No'}</p>
                <img src={imageUrl} alt={`${item.item_name} view`} onError={handleImageError} className="item-modal-image" />
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                    min="1"
                    max={item.qty_available}
                />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </Modal>
        </div>
    );
}


function InventoryList() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const { cart, setCart } = useCart();

    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


    // Create a function to group items with the same name and brand and add their quantities
    const groupAndSumItems = (items) => {
        const groupedItems = {};
        items.forEach((item) => {
            const key = `${item.item_name}_${item.brand}`;
            const qty = parseInt(item.qty_available, 10); // Convert to integer
            if (groupedItems[key]) {
                groupedItems[key].qty_available += qty;
            } else {
                groupedItems[key] = { ...item, qty_available: qty }; // Update the qty_available property
            }
        });
        return Object.values(groupedItems);
    };


    useEffect(() => {
        fetch(`${API_URL}/api/inventory`)
            .then(response => response.json())
            .then(data => {
                const groupedItems = groupAndSumItems(data);
                setItems(groupedItems);
            })
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

    const addToCart = (item, quantityToAdd) => {
        // Convert the added quantity to a number to ensure proper calculations
        const quantity = Number(quantityToAdd);
        const imageUrl = `/assets/${item.item_name.replace(/\//g, '_').replace(/\s+/g, '_')}-${item.brand.replace(/\s+/g, '_')}.jpg`.toLowerCase();

        // Find if the item already exists in the cart
        const existingItemIndex = cart.findIndex(cartItem => cartItem.item_id === item.item_id);

        // Calculate the total quantity that will be in the cart after adding the new quantity
        const totalQuantityInCart = existingItemIndex >= 0
            ? cart[existingItemIndex].qty_borrowed + quantity
            : quantity;

        // Check if adding the item exceeds the available quantity
        if (totalQuantityInCart > item.qty_available) {
            alert("Cannot add more items to the cart than available.");
            return; // Stop execution if adding exceeds available stock
        }

        // Check if adding a new item type exceeds the limit of 5 different items
        if (existingItemIndex === -1 && new Set(cart.map(cartItem => cartItem.item_id)).size >= 5) {
            alert("You cannot add more than 5 different types of items to the cart.");
            return; // Stop execution if it would exceed 5 different item types
        }

        // Update cart with the new or updated item
        if (existingItemIndex >= 0) {
            // Item already exists in cart, update its quantity
            const updatedCart = cart.map((cartItem, index) =>
                index === existingItemIndex
                    ? { ...cartItem, qty_borrowed: cartItem.qty_borrowed + quantity }
                    : cartItem
            );
            setCart(updatedCart);
        } else {
            // Item does not exist, add as a new item
            setCart([...cart, { ...item, qty_borrowed: quantity, imageUrl }]);
        }
    };



    const filteredItems = items
        .filter(item =>
            (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
            item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            item.qty_available > 0
        )
        .sort((a, b) => a.item_name.localeCompare(b.item_name)); // This line adds sorting by item_name

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
