import React, {useState} from 'react';
import Dice from "./Dice";

const GameBoard = props =>{
    const [locked, setLocked] = useState(0);
    const flip = index => {
        let mask = 1 << index;
        setLocked(v=>v^=mask);
    }

    const isLocked = index => {
        let mask = 1 << index;
        return ( (locked&mask) !== 0);
    }

    const roleDice = () =>{
        let dice = [];
        for(let i in props.dice){
            if(isLocked(i)){
                dice.push(props.dice[i]);
            } else {
                dice.push( Math.floor(Math.random()*6)+1 );
            }
        }
        props.onRole(dice);
    }

    return (
        <>
            {props.dice.map((value, index)=><Dice value={value} locked={isLocked(index)} index={index} onClick={()=>flip(index)}/>)}
            <section>
                <button className="button" id="role" onClick={roleDice}>Role Dice</button>
                <button className="button" onClick={props.onReset}>Reset</button>
            </section>
        </>
    );
}

export default GameBoard;