import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { UserProfileContext, UserLoginContext } from '../context';

const Navigation = () => {

    const history = useHistory();
    const [imageSrc, setImgSrc] = useState(null);
    const [loginImgSrc, setLoginImgSrc] = useState(null);
    const { picture } = useContext(UserProfileContext);
    const { loginPhoto } = useContext(UserLoginContext);
    const [showMenu, setShowMenu] = useState({show: false})
    const fs = require('fs');
    
    const imgData = loginPhoto.photo || localStorage.getItem("imgData");

    console.log("Login user image from Nav:"+imgData);

  
    useEffect(() => {
        if (picture.photo) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setImgSrc(reader.result);
                //console.log("Image:"+reader.result);
                localStorage.setItem("imgData", reader.result);
            });
            reader.readAsDataURL(picture.photo);
        }
    }, [picture.photo])

    var dataImage = localStorage.getItem('imgData');

    
    const divStyle = {
        float: 'left',
        color: '#64cad8',
        padding: '0px 0px 0px 10px',
        font: 'Lucida, sans-serif'
    };

    function logout() {
        localStorage.removeItem('loginEmail')
        localStorage.removeItem('Privilege')
        localStorage.removeItem('imgData')
        history.push('/login')
        window.location.reload(true);
    }

    return localStorage.getItem('loginEmail') &&
        <div className="App">
            <div className="wrapper">
                <div id="wrap">
                    <nav className="siteNavigation_nav_links">
                        <div className="row" style={divStyle}><img className="clublogomain"src="images/soccer.png"></img></div>
                        <div className="main_links_nav">
                        <NavLink className="mobile_register_link" to="/">Home</NavLink>
                        <NavLink className="mobile_register_link" to="/profile">Profile</NavLink>
                        <NavLink className="mobile_register_link" to="/availability">Availability</NavLink>
                        <NavLink className="mobile_login_link" to="/login" onClick={logout}>Logout</NavLink>
                        <NavLink className="mobile_login_link" to='/aboutus'>About</NavLink>
                        <span className="image_login_link">
                            <img className="nav_profile" onClick={()=>setShowMenu(!showMenu)} src={imgData}></img>
                        </span>
                        </div>
                    </nav>
                    <div>
                    {
                       showMenu === true && (     
                        <span className="imagehoverPopup">&#128077; G'day mate !</span>  
                        )
                    }
                    </div>
                </div>
            </div>
        </div>
}

export default Navigation;