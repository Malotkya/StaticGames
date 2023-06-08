import React, {useState} from "react";

const ScoreInput = props => {
    const update = async() => {
        let newScore = await props.update();

        setScore(<span className='btn'>{newScore}</span>);
    }

    const [score, setScore] = useState(<button onClick={update}>Take</button>);
    
    return (
        <div className="input">
            <span>{props.text}</span>
            {score}
        </div>
    );
}

export default ScoreInput;