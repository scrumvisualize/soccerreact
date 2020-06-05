import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Navigation = () => {
    const history = useHistory();
    
    function logout() {
        localStorage.removeItem('loginEmail')
        localStorage.removeItem('Privilege')
        history.push('/login')
        window.location.reload(true);
      }

    return localStorage.getItem('loginEmail') &&
        <div className="App">
            <div className="wrapper">
                <nav className="siteNavigation_nav_links">
                    <NavLink className="mobile_register_link" to="/">Home</NavLink>
                    <NavLink className="mobile_register_link" to="/profile">Profile</NavLink>
                    <NavLink className="mobile_login_link" to="/login" onClick={logout}>Logout</NavLink>
                    <NavLink className="mobile_login_link" to='/aboutus'>About us</NavLink>
                </nav>
            </div>
        </div>
}

export default Navigation;