import React, {useState} from "react";

const ScoreInput = props => {
    const [score, setScore] = useState(<button onClick={()=>{
        const update = value => {
            setScore(<span className="btn">{value}</span>);
        }

        props.update(update);
    }}>Take</button>);
    
    
    return (
        <div className="input">
            <span>{props.text}</span>
            {score}
        </div>
    );
}

export default ScoreInput;