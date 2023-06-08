import React, {useState} from "react";

/** Score Input Component
 * 
 * @author Alex Malotky
 */
const ScoreInput = props => {

    /** Update Function
     * 
     */
    const update = async() => {
        let newScore = await props.update();

        setScore(<span className='btn'>{newScore}</span>);
    }

    //Input State.
    const [score, setScore] = useState(<button onClick={update}>Take</button>);
    
    return (
        <div className="input">
            <span>{props.text}</span>
            {score}
        </div>
    );
}

export default ScoreInput;