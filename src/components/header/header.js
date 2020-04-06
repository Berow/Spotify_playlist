import React from 'react';

import './header.scss';

const Header = ({ name, img }) => {

    return (
        <div className="header">
            <img className='avatar' src={img} alt={name}></img>
            <div>{name}</div >
        </div >
    )
}
export default Header;