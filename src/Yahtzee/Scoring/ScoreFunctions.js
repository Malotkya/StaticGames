/** Scoring Functions File
 * 
 * @author Alex Malotky
 */
import {ZERO, FULL_HOUSE, SMALL_STRAIT, LARGE_STRAIT, YAHTZEE} from "./ScoringConstants"

/** Take Number Score
     * 
     * @param {number} number 
     * @param {Array<number>} dice
     * @returns {number} score
     */
export function takeNumber(number, dice){
    let score = 0;

    dice.forEach(value=>{
        if(value === number)
            score += value;
    });

    return score;
};


/** Take Of a Kind
 * 
 * @param {number} number - ex: 3 for Three of a Kind
 * @param {Array<number>} dice 
 * @returns {Number} score
 */
export function takeOK(number, dice){
    let valid = false;

    for(let lhs of dice){
        let count = 0;

        for(let rhs of dice){
            if(lhs === rhs)
                count++;
        }

        if(count >= number){
            valid = true;
            break;
        }
    }

    let score = 0;
    if(valid){
        dice.forEach(value=>score+=value);
    }

    return score;
};

/** Take Full House
 * 
 * @param {Array<number>} dice;
 * @returns {number} score
 */
export function takeFH(dice){
    let threeOfAKind = false;
    let twoOfAKind = false;

    for(let lhs of dice){
        let count = 0;

        for(let rhs of dice){
            if(lhs === rhs)
                count++;
        }

        if(count === 2)
            twoOfAKind = true;

        if(count === 3)
            threeOfAKind = true;

        if(twoOfAKind&&threeOfAKind)
            break;
    }

    if(twoOfAKind && threeOfAKind){
        return FULL_HOUSE;
    }

    return ZERO;
}

function hasNext(dice, current, count){
    for(let d of dice){
        if(current+1 === d)
            return hasNext(dice, d, count+1);
    }
    return count;
}

export function takeSS(dice){
    for(let d of dice){
        let count = hasNext(dice, d, 1);

        if(count >= 4)
            return SMALL_STRAIT;
    }

    return ZERO;
}

export function takeLS(dice){
    for(let d of dice){
        let count = hasNext(dice, d, 1);

        if(count >= 5)
            return LARGE_STRAIT;
    }

    return ZERO;
}

export function testYahtzee(dice){
    let number = dice[0];
    for(let d of dice){
        if(number !== d)
            return false;
    }
    return true;
}

export function takeY(dice){
    if(testYahtzee(dice))
        return YAHTZEE;

    return ZERO;
}

export function takeCH(dice){
    let score = 0;
    for(let d of dice){
        score += d;
    }
    return score;
}