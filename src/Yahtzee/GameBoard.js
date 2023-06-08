import React, {useState, useEffect} from 'react';
import Dice from "./Dice";

/** Game Board Component
 * 
 * @author Alex Malotky
 */
const GameBoard = props =>{
    // Gameboard State
    // TODO: switch to useReducer.
    const [state, setState] = useState({
        locked: 0,
        roleCount: props.roleCount
    });

    /** Flip Dice Lock
     * 
     * @param {Number} index 
     */
    const flipLock = index => {
        setState(s=>{
            let state = {...s};
            if(s.roleCount === 0){
                alert("You need to role the dice first!");
            } else {
                let mask = 1 << index;
                state.locked = s.locked^mask;
            }
            return state;
        });
    }

    /** Is Dice Locked
     * 
     * @param {Number} index 
     * @returns {Boolean}
     */
    const isLocked = index => {
        let mask = 1 << index;
        return ( (state.locked&mask) !== 0);
    }

    /** Role Dice
     * 
     */
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

    /** Reset Game
     * 
     */
    const reset = () => {
        setState(s=>{
            let state = {...s};
            state.locked = 0;
            return state;
        })
        props.onReset();
    }

    /** Effect Update Hook
     * 
     */
    useEffect(()=>{
        setState(s=>{
            let state = {...s};
            if(props.roleCount === -1){
                state.locked = Math.pow(2, props.dice.length)-1;
            } else if(props.roleCount === 0) {
                state.locked = 0;
            }
            state.roleCount = props.roleCount;
            return state;
        });
    }, [props.roleCount, props.dice.length])

    return (
        <>
            {props.dice.map((value, index)=><Dice key={index} value={value} locked={isLocked(index)} index={index} onClick={()=>flipLock(index)}/>)}
            <section>
                <button className="button" id="role" onClick={roleDice}>Role Dice</button>
                <button className="button" onClick={reset}>Reset</button>
            </section>
        </>
    );
}

export default GameBoard;