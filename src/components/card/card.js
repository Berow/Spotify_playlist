import React from 'react';

import  styles from './card.css';

const Card = ({ name, img }) => {

    return (
        <div className="card">
            <img src={img} alt={name} />
            <div>{name}</div >
        </div >
    )
}
export default Card;