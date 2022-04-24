import React from 'react';
import "./Header.css";
const Header = () => {
    return (
        <div className='main_container_header'>
            <div className='any_point_logo'>
                <img className='logo_img_class' src = "logo.png"></img>
            </div>
            <div className='any_point_text'>
                <h1 className='any_point_text'>Welcome to Login Enablement Portal</h1>
            </div>
        </div>
    );
};

export default Header;