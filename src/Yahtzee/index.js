import React, {useState} from 'react';
import './yahtzee.css';
import GameBoard from "./GameBoard";
import ScoreBoard from "./ScoreBoard";

const Yahtzee = () =>{
    const [diceValues, setDice] = useState([1, 2, 3, 4, 5]);

    return (
        <>
            <GameBoard dice={diceValues}/>
            <ScoreBoard dice={diceValues} />
        </>
    );
}

export default Yahtzee;