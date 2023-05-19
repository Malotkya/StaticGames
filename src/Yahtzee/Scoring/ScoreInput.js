import React, {useState} from "react";

const ScoreInput = props => {
    
    const takeScore = event => {
        let output = props.onClick(event);
        setScore(<span className="btn">{output}</span>);
    }

    const [score, setScore] = useState(<button onClick={takeScore}>Take</button>);

    return (
        <div className="input">
            <span>{props.text}</span>
            {score}
        </div>
    );
}

export default ScoreInput;