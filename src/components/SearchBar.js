import React, { useState } from 'react';

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
            <input
                type="text"
                placeholder="Search for equipment..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {searchTerm && (
                <button onClick={clearSearch} className="clear-search">
                    X
                </button>
            )}
        </div>
    );
}

export default SearchBar;
