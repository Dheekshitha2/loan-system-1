import React from "react";
import Logo from "../nusLogo.jpg";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"


function Navbar() {
    return (
        <div className="navbar">
            <div className="leftSide">
                <img src={Logo} alt="NUS" />
            </div>
            <div className="rightSide"></div>
            <Link to="/"> Home </Link>
            <Link to="/history"> History </Link>
        </div>
    );
}

export default Navbar;
