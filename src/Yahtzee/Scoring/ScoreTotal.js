import React from "react";

const ScoreTotal = props => {
    return (
        <div className="total">
            <span>{props.text}</span>
            <span>{props.value}</span>
        </div>
    );
}

export default ScoreTotal;