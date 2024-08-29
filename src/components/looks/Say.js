import React, { useState } from "react";

const Say = props => {
    const [sayWhat, setSayWhat] = useState(props.default);
    const [sayFor, setSayFor] = useState(props.time);

    const makeSay = what => { setSayWhat(what) }

    const updateSayTime = forTime => { setSayFor(forTime) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {}}>
            <span>{props.what}</span>
            <input type="text" className="text-black text-center mx-2 funcInputText"
                value={sayWhat} onChange={event => makeSay(event.target.value)}/>
            {props.timed &&
            <>
                <span>for</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={sayFor} onChange={event => updateSayTime(event.target.value)}
                    min={0}/>
                <span>seconds</span>
            </>}
        </button>
    );
}

export default Say;