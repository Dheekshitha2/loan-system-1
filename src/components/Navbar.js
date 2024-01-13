import React from "react";
import Logo from "../nusLogo.jpg";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Navbar({ cart, setCart }) {

    const [isCartOpen, setIsCartOpen] = useState(false);
    let navigate = useNavigate();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };


    const handleCheckout = () => {
        if (cart.length > 0) {
            navigate('/borrow-form');
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
                <Link to="/"> Home </Link>
                <div className="cart-icon" onClick={toggleCart}>
                    Cart ({cart.length})
                </div>
                {isCartOpen && (
                    <div className="cart-dropdown">
                        <div className="cart-header">
                            <span>Item</span>
                            <span>Quantity</span>
                        </div>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.item_name}</span>
                                <span>{item.quantity}</span>
                                <button onClick={() => removeFromCart(index)} style={{ color: "red" }}>X</button>
                            </div>
                        ))}
                        <button className="checkout-button" onClick={handleCheckout} style={{ color: "black" }}>Checkout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
