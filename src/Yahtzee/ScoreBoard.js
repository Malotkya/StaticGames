import React, {useState, useEffect} from 'react';
import * as Scoring from "./Scoring/ScoreFunctions";
import ScoreInput from './Scoring/ScoreInput';
import ScoreTotal from "./Scoring/ScoreTotal";
import { UPPER_SCORE_BONUS, UPPER_SCORE_LIMIT,ADDITIONAL_YAHTZEE } from './Scoring/ScoringConstants';

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


const ScoreBoard = props => {
    const [state, setState] = useState({
        dice: [...props.dice],
        upperScore: 0,
        lowerScore: 0,
        count: -1,
        locked: true
    });

    const handleClick = (setScore, scoringFunction) => {
        return new Promise((resolve, reject)=>{
            takeScore(setScore, scoringFunction)
                .then(newScore=>{
                    props.onClick();
                    resolve(newScore);
                }).catch(reject);
        });
    }

    const takeScore = (setScore, scoringFunction) => {
        return new Promise((resolve, reject)=>{
            let score = 0;
            setState(s=>{
                let state = {...s};
    
                if(state.locked){
                    alert("Need to role dice first!");
                    reject();
                } else {
                    score = scoringFunction(s.dice);
                    state[setScore] += score;
    
                    if(s.count>=0){
                        if(Scoring.testYahtzee(s.dice))
                            state.count++;
                    }
                    resolve(score);
                }
                
                return state;
            });
        });
    }

    const takeYahtzee = () => {
        return new Promise((resolve, reject)=>{
            handleClick('lowerScore', Scoring.takeY)
                .then(newScore=>{
                    if(newScore > 0){
                        setState(s=>{
                            let state = {...s};
                            state.count = 0;
                            return state;
                        });
                    }
                    resolve(newScore);
                }).catch(reject);
        })
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
        setState(s=>{
          let state = {...s};
          state.dice = props.dice;
          state.locked = props.locked;
          return state; 
        });
    }, [props.dice, props.locked])

    return (
        <div className="scoreboard">
            <strong>Scoring</strong>
            <div className="row">
                <ScoreInput update={()=>handleClick("upperScore", takeOne)}   text="Ones:" />
                <ScoreInput update={()=>handleClick("upperScore", takeTwo)}   text="Twos:" />
                <ScoreInput update={()=>handleClick("upperScore", takeThree)} text="Threes:"/>
                <ScoreInput update={()=>handleClick("upperScore", takeFour)}  text="Fours:" />
                <ScoreInput update={()=>handleClick("upperScore", takeFive)}  text="Fives:"/>
                <ScoreInput update={()=>handleClick("upperScore", takeSix)}   text="Sixs:"/>
                <div className="input">
                    <span>Bonus Points:</span>
                    <span className="btn"></span>
                </div>
            </div>
            <div className="row">
                <ScoreInput update={()=>handleClick("lowerScore", take3K)} text="Three of a Kind:" />
                <ScoreInput update={()=>handleClick("lowerScore", take4K)} text="Four of a Kind:"/>
                <ScoreInput update={()=>handleClick("lowerScore", takeFH)} text="Full House:" />
                <ScoreInput update={()=>handleClick("lowerScore", takeSS)} text="Small Strait:" />
                <ScoreInput update={()=>handleClick("lowerScore", takeLS)} text="Large Strait:" />
                <ScoreInput update={()=>takeYahtzee()}                   text="Yatzee:" />
                <ScoreInput update={()=>handleClick("lowerScore", takeCH)} text="Chance:" />
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