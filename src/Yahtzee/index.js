import React, {useState, useEffect} from 'react';
import './yahtzee.css';
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const Yahtzee = () =>{
    const [diceValues, setDice] = useState([1, 2, 3, 4, 5]);
    const [count, setCount] = useState(0);
    const reset = () => {
        setDice([1,2,3,4,5]);
        setCount(c=>c+1);
    }

    return (
        <>
            <GameBoard dice={diceValues} onRole={setDice} onReset={reset}/>
            <ScoreBoard key={count} dice={diceValues} />
        </>
    );
}

export default Yahtzee;