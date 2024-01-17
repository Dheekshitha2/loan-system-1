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
            console.log("Cart items on checkout:", cart);
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
                <Link to="/"> Home </Link>
                <div className="cart-icon" onClick={toggleCart}>
                    Cart ({cart.length})
                </div>
                {isCartOpen && (
                    <div className="cart-dropdown">
                        <div className="cart-header">
                            <div>Item</div>
                            <div>Quantity</div>
                            <div>Remove</div>
                        </div>
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div>{item.item_name}</div>
                                <div>{item.qty_borrowed}</div>
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
