import React, {useState} from 'react';
import './yahtzee.css';
import Dice from "./Dice";

const GameBoard = props =>{
    const initialArray = [];
    for(let i of props.dice)
        initialArray.push(false);

    const [locked, setLocked] = useState(initialArray);
    const flip = index => {
        console.log(index);
    }

    return (
        <>
            {props.dice.map((value, index)=><Dice value={value} locked={locked[index]} index={index} onClick={flip}/>)}
            <section>
                <button className="button" id="role">Role Dice</button>
                <button className="button">Reset</button>
            </section>
        </>
    );
}

export default GameBoard;