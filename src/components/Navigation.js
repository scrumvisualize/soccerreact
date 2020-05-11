import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="App">
           <div className="wrapper">
              <nav className="siteNavigation_nav_links">
                    <NavLink className="mobile_register_link" to="/">Home</NavLink>
                    <NavLink className="mobile_register_link" to="/register">Register</NavLink>
                    <NavLink className="mobile_login_link" to="/login">Login</NavLink>
                    <NavLink className="mobile_login_link" to="/aboutus">About us</NavLink>
              </nav>
           </div>
       </div>
    );
}
 
export default Navigation;