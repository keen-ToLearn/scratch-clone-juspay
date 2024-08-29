import React, { useState } from "react";

const Wait = props => {
    const [wait, setWait] = useState(props.for);

    const changeWait = wait => { setWait(wait) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}>
            <span>wait</span>
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={wait} onChange={event => changeWait(Number(event.target.value))}
                onClick={event => event.stopPropagation()} min={0}/>
            <span>seconds</span>
        </button>
    );
}

export default Wait;