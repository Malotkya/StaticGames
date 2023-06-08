import React from "react";

/** Score Total Component
 * 
 * @author Alex Malotky
 */
const ScoreTotal = props => {
    return (
        <div className="total">
            <span>{props.text}</span>
            <span>{props.value}</span>
        </div>
    );
}

export default ScoreTotal;