import React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { signout } from '../Redux/ActionCreator';

function Header() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(signout());
    }

    const renderLinks = () => {
        if(!auth.authenticate) {
            return (
                <Nav>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-2" to="/signin">Sign In</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link mr-2" to="/signup">Sign Up</NavLink>
                    </li>
                </Nav>
            )
        } else {
            return (
                <Nav>
                    <li className="nav-item">
                        <span className="nav-link mr-2" onClick={logout}>Sign Out</span>
                    </li>
                </Nav>
            )
        }
    }

    return (
        <div>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" className="px-5" variant="dark">
            <NavLink className="navbar-brand" to="/">ADMIN PANEL</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                {renderLinks()}
            </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;