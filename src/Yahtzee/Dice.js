import React from 'react';
import image from './dice.png';

const dice = props => {
    const value = (props.locked? 'l' : 'd') + props.value;
    const lock = () => props.onClick(props.index);

    return (
        <div className="die section" onClick={lock}>
            <figure className={value} style={{
                backgroundImage: `url(${image})`
            }}></figure>
        </div>
    );
}

export default dice;