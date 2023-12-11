import React, { useState, useEffect } from 'react';

function InventoryList() {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/inventory')
            .then(response => response.json())
            .then(data => setItems(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filtered items based on search term
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
                    <div key={item.item_id} className="inventory-item">
                        <img src={`/assets/${item.item_id}.jpg`} alt={item.item_name} />
                        <h3>{item.item_name}</h3>
                        <p>Quantity Available: {item.total_qty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InventoryList;
