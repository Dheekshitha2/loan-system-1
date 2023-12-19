import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes } from '@fortawesome/free-solid-svg-icons';
import "../styles/SearchBar.css"

function SearchBar({ onSearchChange }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearchChange('');
    };

    return (
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
    );
}

export default SearchBar;
