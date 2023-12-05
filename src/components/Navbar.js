import React from 'react';
import Logo from "../assets/nusLogo.jpg";
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
    return (
        <div className="navbar">
            <div className="leftSide">
                <img src={Logo} alt="NUS Logo" />
            </div>
            <div className="rightSide">
                <Link to="/">Home</Link>
                <Link to="/Items">Items</Link>
            </div>
        </div>
    )
}

export default Navbar

