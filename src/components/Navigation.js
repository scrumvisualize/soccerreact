import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Navigation = () => {
    const history = useHistory();

    const divStyle = {
        float:'left',
        color: '#64cad8', 
        padding: '0px 0px 0px 10px',
        font:'Lucida, sans-serif'
      };
    
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
                <div className="clubLogo landing"style={divStyle}><b>Southside Soccer</b></div>
                    <NavLink className="mobile_register_link" to="/">Home</NavLink>
                    <NavLink className="mobile_register_link" to="/profile">Profile</NavLink>
                    <NavLink className="mobile_login_link" to="/login" onClick={logout}>Logout</NavLink>
                    <NavLink className="mobile_login_link" to='/aboutus'>About us</NavLink>
                </nav>
            </div>
        </div>
}

export default Navigation;