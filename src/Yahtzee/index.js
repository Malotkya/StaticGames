import React, {useState} from 'react';
import './yahtzee.css';
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const MAX_ROLES = 3;

const Yahtzee = () =>{
    const [diceValues, setDice] = useState([1, 2, 3, 4, 5]);
    const [resetKey, setReset] = useState(0);
    const [roleCount, setCount] = useState(0);

    const reset = () => {
        setDice([1,2,3,4,5]);
        setReset(c=>c+1);
    }

    const roles = dice => {
        setDice(dice);
        setCount(c=>c+1); 
    }

    const lockDice = () => {
        if(MAX_ROLES>0 && roleCount>=MAX_ROLES){
            return -1;
        } else {
            return roleCount;
        }
    }

    const lockScore = () => {
        return roleCount < 1;
    }

    return (
        <>
            <GameBoard dice={diceValues} onRole={roles} onReset={reset} roleCount={lockDice()}/>
            <ScoreBoard key={resetKey} dice={diceValues} onClick={()=>setCount(0)} locked={lockScore()} />
        </>
    );
}

export default Yahtzee;