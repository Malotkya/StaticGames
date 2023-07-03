import {useState, useEffect} from 'react';

const Tile = props =>  {
    const button = <button onClick={props.onClick}></button>;
    const [value, setValue] = useState();
    
    useEffect(()=>{
        if(props.state === "")
            setValue(button)
        else 
            setValue(props.state)
    }, [props.state, button])

    return (
        <div className="tile">
            {value}
        </div>
    )
};

export default Tile;