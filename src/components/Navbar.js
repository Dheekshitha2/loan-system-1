import React from "react";
import { useState } from "react";
import Logo from "../hub_logo_white.png";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from "./CartContext";

const defaultImageUrl = `/assets/default.jpg`;

function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    let navigate = useNavigate();
    const { cart, setCart } = useCart(); // Use useCart here
    let location = useLocation();


    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            setIsCartOpen(false);
            navigate('/new-borrow-form', { state: { selectedItems: cart } });
        } else {
            alert("Please select the items you wish to borrow.");
        }
    };

    return (
        <div className="navbar">
            <div className="leftSide">
                <Link to="/">
                    <img src={Logo} alt="NUS" />
                </Link>
            </div>
            <div className="rightSide">
                <Link to="/">Home</Link>
                <div className="cart-icon" onClick={toggleCart}>
                    Cart ({cart.length})
                </div>
                {isCartOpen && (
                    <div className="cart-dropdown">
                        <div className="cart-header">My Cart</div>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item" style={{ position: 'relative' }}>
                                <img src={item.image || defaultImageUrl} alt={item.item_name} style={{ width: '70px', height: '70px', borderRadius: '8px' }} />
                                <div className="cart-item-details">
                                    <div className="cart-item-name">{item.item_name}</div>
                                    <div className="cart-item-qty">Qty: {item.qty_borrowed}</div>
                                </div>
                                {location.pathname !== '/new-borrow-form' && (
                                    <button
                                        onClick={() => removeFromCart(index)}
                                        className="cancel-item-button"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
                                            <path d="M0.26 13.737C0.155 13.637 0.084 13.52 0.049 13.385C0.02 13.251 0.023 13.116 0.058 12.981C0.093 12.846 0.16 12.729 0.26 12.629L5.885 6.996L0.26 1.371C0.16 1.271 0.093 1.154 0.058 1.019C0.029 0.884 0.029 0.75 0.058 0.615C0.093 0.48 0.16 0.363 0.26 0.263C0.36 0.158 0.477 0.09 0.612 0.061C0.747 0.026 0.882 0.026 1.016 0.061C1.157 0.09 1.277 0.158 1.376 0.263L7.001 5.888L12.626 0.263C12.726 0.158 12.843 0.09 12.978 0.061C13.113 0.026 13.247 0.026 13.382 0.061C13.517 0.09 13.637 0.158 13.742 0.263C13.842 0.363 13.907 0.48 13.936 0.615C13.971 0.75 13.971 0.885 13.936 1.019C13.907 1.154 13.842 1.271 13.742 1.371L8.117 6.996L13.742 12.629C13.842 12.729 13.907 12.846 13.936 12.981C13.971 13.116 13.971 13.251 13.936 13.386C13.907 13.521 13.842 13.637 13.742 13.737C13.643 13.843 13.523 13.91 13.382 13.939C13.247 13.974 13.113 13.974 12.978 13.939C12.843 13.904 12.726 13.836 12.626 13.737L7.001 8.112L1.376 13.737C1.277 13.837 1.159 13.904 1.025 13.939C0.89 13.974 0.755 13.974 0.62 13.939C0.486 13.904 0.365 13.836 0.26 13.737Z" fill="red" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
