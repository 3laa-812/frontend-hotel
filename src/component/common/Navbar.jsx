import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isAuthenticated = ApiService.isAuthenticated();
    const isAdmin = ApiService.isAdmin();
    const isUser = ApiService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">Phegon Hotel</NavLink>
            </div>
            
            <div className="menu-toggle" onClick={toggleMenu}>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
            </div>

            <ul className={`navbar-ul ${isMenuOpen ? 'show' : ''}`}>
                <li onClick={closeMenu}><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                <li onClick={closeMenu}><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                <li onClick={closeMenu}><NavLink to="/find-booking" activeclassname="active">Find my Booking</NavLink></li>

                {isUser && <li onClick={closeMenu}><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                {isAdmin && <li onClick={closeMenu}><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

                {!isAuthenticated && <li onClick={closeMenu}><NavLink to="/login" activeclassname="active">Login</NavLink></li>}
                {!isAuthenticated && <li onClick={closeMenu}><NavLink to="/register" activeclassname="active">Register</NavLink></li>}
                {isAuthenticated && <li onClick={() => { closeMenu(); handleLogout(); }}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
