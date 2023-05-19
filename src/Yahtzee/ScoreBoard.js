import React, {useState} from 'react';
import * as Scoring from "./Scoring/ScoreFunctions";
import ScoreInput from './Scoring/ScoreInput';
import ScoreTotal from "./Scoring/ScoreTotal";

const ScoreBoard = props => {
    const [upperScore, setUpperScore] = useState(0);
    const [lowerScore, setLowerScore] = useState(0);
    const [yahtzeeCount, setCount] = useState(0);

    const takeOne   = () => Scoring.takeNumber(1, props.dice);
    const takeTwo   = () => Scoring.takeNumber(2, props.dice);
    const takeThree = () => Scoring.takeNumber(3, props.dice);
    const takeFour  = () => Scoring.takeNumber(4, props.dice);
    const takeFive  = () => Scoring.takeNumber(5, props.dice);
    const takeSix   = () => Scoring.takeNumber(6, props.dice);
    const take3K    = () => Scoring.takeOK(3, props.dice);
    const take4K    = () => Scoring.takeOK(4, props.dice);
    const takeFH    = () => Scoring.takeFH(props.dice);
    const takeSS    = () => Scoring.takeSS(props.dice);
    const takeLS    = () => Scoring.takeLS(props.dice);
    const takeY     = () => Scoring.takeY(props.dice);
    const takeCH    = () => Scoring.takeCH(props.dice);

    return (
        <div className="scoreboard">
            <strong>Scoring</strong>
            <div className="row">
                <ScoreInput text="Ones:" onClick={takeOne} />
                <ScoreInput text="Twos:" onClick={takeTwo} />
                <ScoreInput text="Threes:" onClick={takeThree} />
                <ScoreInput text="Fours:" onClick={takeFour} />
                <ScoreInput text="Fives:" onClick={takeFive} />
                <ScoreInput text="Sixs:" onClick={takeSix} />
                <div className="input">
                    <span>Bonus Points:</span>
                    <span className="btn"></span>
                </div>
            </div>
            <div className="row">
                <ScoreInput text="Three of a Kind:" onClick={take3K} />
                <ScoreInput text="Four of a Kind:" onClick={take4K} />
                <ScoreInput text="Full House:" onClick={takeFH} />
                <ScoreInput text="Small Strait:" onClick={takeSS} />
                <ScoreInput text="Large Strait:" onClick={takeLS} />
                <ScoreInput text="Yatzee:" onClick={takeY} />
                <ScoreInput text="Chance:" onClick={takeCH} />
            </div>
            <div className="row">
                <ScoreTotal text="Upper Sub Total:" />
                <ScoreTotal text="Lower Sub Total:" />
                <hr/>
                <ScoreTotal text="Additional Yahtzee's:" />
                <hr/>
                <ScoreTotal text="Total:" />
            </div>
        </div>
    );
}

export default ScoreBoard;