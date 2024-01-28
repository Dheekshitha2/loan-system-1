import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../styles/SearchBar.css"

function SearchBar({ onSearchChange, onCategoryChange, selectedCategories }) {
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        'Electrical Tools',
        'Electronics',
        'Fabrication Tools',
        'Measurement Tools',
        'Other Equipment',
        'Power Tools'
    ];
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearchChange('');
    };

    const handleCategorySelect = (category) => {
        onCategoryChange(category);
    };

    return (
        <div>
            <div className="search-bar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
                <input
                    type="text"
                    placeholder="Search for equipment..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <button onClick={clearSearch} className="clear-search">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>
            <div className="category-picker">
                {categories.map(category => (
                    <button
                        key={category}
                        className={`category-btn ${selectedCategories.includes(category) ? 'selected' : ''}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchBar;
