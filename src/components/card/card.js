import React from 'react';

import './card.css';

const Card = ({ name, img }) => {

    return (
        <div className="card">
            <img src={img} alt={name} />
            <div>{name}</div >
        </div >
    )
}
export default Card;