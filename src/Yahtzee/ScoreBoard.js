import React, {useState, useEffect} from 'react';
import * as Scoring from "./Scoring/ScoreFunctions";
import ScoreInput from './Scoring/ScoreInput';
import ScoreTotal from "./Scoring/ScoreTotal";
import { UPPER_SCORE_BONUS, UPPER_SCORE_LIMIT,ADDITIONAL_YAHTZEE } from './Scoring/ScoringConstants';

const ScoreBoard = props => {
    const [state, setState] = useState({
        dice: [...props.dice],
        upperScore: 0,
        lowerScore: 0,
        count: -1
    });

    const takeOne   = dice => Scoring.takeNumber(1, dice);
    const takeTwo   = dice => Scoring.takeNumber(2, dice);
    const takeThree = dice => Scoring.takeNumber(3, dice);
    const takeFour  = dice => Scoring.takeNumber(4, dice);
    const takeFive  = dice => Scoring.takeNumber(5, dice);
    const takeSix   = dice => Scoring.takeNumber(6, dice);
    const take3K    = dice => Scoring.takeOK(3, dice);
    const take4K    = dice => Scoring.takeOK(4, dice);
    const takeFH    = dice => Scoring.takeFH(dice);
    const takeSS    = dice => Scoring.takeSS(dice);
    const takeLS    = dice => Scoring.takeLS(dice);
    const takeCH    = dice => Scoring.takeCH(dice);

    const takeScore = (setScore, scoringFunction, updateFunction) => {
        setState(s=>{
            let state = {...s};
            let score = scoringFunction(s.dice);
            updateFunction(score);
            state[setScore] += score;

            if(s.count>=0){
                if(Scoring.testYahtzee(s.dice))
                    state.count++;
            }

            return state;
        });
    }

    const takeYahtzee = updateFunction => {
        setState(s=>{
            let state = {...s};
            let score = Scoring.takeY(s.dice);
            updateFunction(score);
            state.lowerScore += score;

            if(score>=0){
                state.count = 0;
            }

            return state;
        });
    }

    const getYahtzeeCount = () => {
        if(state.count < 0)
            return "";

        return state.count;
    }

    const getTotal = () => {
        let additionalPoints = 0;
        if(state.upperScore > UPPER_SCORE_LIMIT){
            additionalPoints = UPPER_SCORE_BONUS;
        }

        if(state.count > 0){
            additionalPoints += state.count * ADDITIONAL_YAHTZEE;
        }

        return state.upperScore + state.lowerScore + additionalPoints;
    }

    useEffect(()=>{
        setState(state=>{
            return {...state, dice: props.dice}
        });
    }, [props.dice])

    return (
        <div className="scoreboard">
            <strong>Scoring</strong>
            <div className="row">
                <ScoreInput update={(callback)=>takeScore("upperScore", takeOne, callback)}   text="Ones:" />
                <ScoreInput update={(callback)=>takeScore("upperScore", takeTwo, callback)}   text="Twos:" />
                <ScoreInput update={(callback)=>takeScore("upperScore", takeThree, callback)} text="Threes:"/>
                <ScoreInput update={(callback)=>takeScore("upperScore", takeFour, callback)}  text="Fours:" />
                <ScoreInput update={(callback)=>takeScore("upperScore", takeFive, callback)}  text="Fives:"/>
                <ScoreInput update={(callback)=>takeScore("upperScore", takeSix, callback)}   text="Sixs:"/>
                <div className="input">
                    <span>Bonus Points:</span>
                    <span className="btn"></span>
                </div>
            </div>
            <div className="row">
                <ScoreInput update={(callback)=>takeScore("lowerScore", take3K, callback)} text="Three of a Kind:" />
                <ScoreInput update={(callback)=>takeScore("lowerScore", take4K, callback)} text="Four of a Kind:"/>
                <ScoreInput update={(callback)=>takeScore("lowerScore", takeFH, callback)} text="Full House:" />
                <ScoreInput update={(callback)=>takeScore("lowerScore", takeSS, callback)} text="Small Strait:" />
                <ScoreInput update={(callback)=>takeScore("lowerScore", takeLS, callback)} text="Large Strait:" />
                <ScoreInput update={(callback)=>takeYahtzee(callback)}                     text="Yatzee:" />
                <ScoreInput update={(callback)=>takeScore("lowerScore", takeCH, callback)} text="Chance:" />
            </div>
            <div className="row">
                <ScoreTotal text="Upper Sub Total:" value={state.upperScore}/>
                <ScoreTotal text="Lower Sub Total:" value={state.lowerScore}/>
                <hr/>
                <ScoreTotal text="Additional Yahtzee's:" value={getYahtzeeCount()}/>
                <hr/>
                <ScoreTotal text="Total:" value={getTotal()} />
            </div>
        </div>
    );
}

export default ScoreBoard;