import React, {useState, useEffect} from 'react';
import * as Scoring from "./Scoring/ScoreFunctions";
import ScoreInput from './Scoring/ScoreInput';
import ScoreTotal from "./Scoring/ScoreTotal";
import { UPPER_SCORE_BONUS, UPPER_SCORE_LIMIT,ADDITIONAL_YAHTZEE } from './Scoring/ScoringConstants';

// Scoring functions wrappers
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

/** Score Board Component
 * 
 * @author Alex Malotky
 */
const ScoreBoard = props => {
    // Score Board State
    // TODO: switch to useReducer.
    const [state, setState] = useState({
        dice: [...props.dice],
        upperScore: 0,
        lowerScore: 0,
        count: -1,
        locked: true
    });

    /** Handle Click Wrapper Function
     * 
     * Used to prevent double update error
     * Allows for props.onClick() to be called outside of setState();
     * 
     * @param {string} setScore 
     * @param {Function} scoringFunction 
     * @returns {Promise<Number>}
     */
    const handleClick = (setScore, scoringFunction) => {
        return new Promise((resolve, reject)=>{
            takeScore(setScore, scoringFunction)
                .then(newScore=>{
                    props.onClick();
                    resolve(newScore);
                }).catch(reject);
        });
    }

    /** Take Score Function
     * 
     * @param {string} setScore 
     * @param {Function} scoringFunction 
     * @returns {Promise<Number>}
     */
    const takeScore = (setScore, scoringFunction) => {
        return new Promise((resolve, reject)=>{
            setState(s=>{
                let state = {...s};
    
                if(state.locked){
                    reject(new Error("Need to role dice first!"));
                } else {
                    let score = scoringFunction(s.dice);
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

    /** Take Yaahtzee Function
     * 
     * Calls takeScore(handleClick) and updates allowance of additional yatzhees if appropriate
     * 
     * @returns {Promise<Number>}
     */
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

    /** Get Yahtzee Count
     * 
     * @returns {string}
     */
    const getYahtzeeCount = () => {
        if(state.count < 0)
            return "";

        return state.count.toString();
    }

    /** Get Score Total
     * 
     * @returns {Number}
     */
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

    /** Effect Update Hook
     * 
     */
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