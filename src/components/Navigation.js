import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import UserProfileContext from '../context';


const Navigation = () => {

    const history = useHistory();
    const [imageSrc, setImgSrc] = useState(null);
    const { picture } = useContext(UserProfileContext);
    

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
                        <div className="clubLogo landing" style={divStyle}><b>Southside Soccer</b></div>
                        <NavLink className="mobile_register_link" to="/">Home</NavLink>
                        <NavLink className="mobile_register_link" to="/profile">Profile</NavLink>
                        <NavLink className="mobile_login_link" to="/login" onClick={logout}>Logout</NavLink>
                        <NavLink className="mobile_login_link" to='/aboutus'>About us</NavLink>
                        <span className="image_login_link"><img className="nav_profile" src={dataImage}></img></span>
                    </nav>
                </div>
            </div>
        </div>
}

export default Navigation;