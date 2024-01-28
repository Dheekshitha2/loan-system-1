import React from 'react';
import "../styles/CategoriesBar.css";

function CategoriesBar({ onCategoryChange, selectedCategories }) {
    const categories = [
        {
            name: 'Mechanical Tools',
            icon: `${process.env.PUBLIC_URL}/assets/mechanical-tool-icon.jpg`
        },
        {
            name: 'Electrical Tools',
            icon: `${process.env.PUBLIC_URL}/assets/electrical-tool-icon.jpg`
        },
        {
            name: 'Power Tools',
            icon: `${process.env.PUBLIC_URL}/assets/power-tool-icon.jpg`
        },
        {
            name: 'Other Equipment',
            icon: `${process.env.PUBLIC_URL}/assets/other-equipment-icon.jpg`
        },
    ];

    return (
        <aside className="categories-sidebar">
            <div className="categories-container">
                {categories.map(category => (
                    <div key={category.name}
                        className={`category-card ${selectedCategories.includes(category.name) ? 'active' : ''}`}
                        onClick={() => onCategoryChange(category.name)}>
                        <img src={category.icon} alt={category.name} className="category-icon" />
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default CategoriesBar;
