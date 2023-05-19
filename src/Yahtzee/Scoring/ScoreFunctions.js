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
    }

    if(twoOfAKind && threeOfAKind){
        return 25;
    }

    return 0;
}

function hasNext(dice, current, count){
    for(let d of dice){
        if(current+1 === d)
            return hasNext(dice, d, count++);
    }
    return count;
}

export function takeSS(dice){
    for(let d of dice){
        let count = hasNext(dice, d, 1);

        if(count >= 4)
            return 30;
    }

    return 0;
}

export function takeLS(dice){
    for(let d of dice){
        let count = hasNext(dice, d, 1);

        if(count >= 5)
            return 40;
    }

    return 0;
}

function testYahtzee(dice){
    let number = dice[0];
    for(let d of dice){
        if(number !== d)
            return false;
    }
    return true;
}

export function takeY(dice){
    if(testYahtzee(dice))
        return 50;

    return 0;
}

export function takeCH(dice){
    let score = 0;
    for(let d of dice){
        score += d;
    }
    return score;
}