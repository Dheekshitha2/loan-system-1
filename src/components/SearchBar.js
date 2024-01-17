import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import "../styles/SearchBar.css"

function SearchBar({ onSearchChange, onCategoryChange, selectedCategories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const categories = ['Mechanical Tools', 'Electrical Tools', 'Power Tools', 'Other Equipment'];

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        onSearchChange(event.target.value);
    };

    const clearSearch = () => {
        setSearchTerm('');
        onSearchChange('');
    };

    const toggleFilterOptions = () => {
        setShowFilterOptions(!showFilterOptions);
    };

    const handleCategorySelect = (category) => {
        onCategoryChange(category);
    };

    const isCategorySelected = (category) => {
        return selectedCategories.includes(category);
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
            <button onClick={toggleFilterOptions} className="filter-button">
                <FontAwesomeIcon icon={faFilter} />
            </button>
            {showFilterOptions && (
                <div className="filter-options">
                    {categories.map(category => (
                        <label key={category}>
                            <input
                                type="checkbox"
                                checked={isCategorySelected(category)}
                                onChange={() => handleCategorySelect(category)}
                            />
                            {category}
                        </label>
                    ))}
                    <button className="clear-filters" onClick={() => onCategoryChange([])}>Clear All Filters</button>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
