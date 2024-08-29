import React, { useState } from "react";

const Goto = props => {
    const [go, setGo] = useState({
        x: props.x,
        y: props.y
    });

    const goto = (where, by) => { setGo({ ...go, [where]: by }) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton whitespace-nowrap`}
            onClick={() => {}}>
            <span>go to</span>
            {props.random ? <span className="ml-1 bg-blue-600 px-2 rounded-md">random position</span> :
            <>
                <span className="ml-1">x</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={go.x} onChange={event => goto('x', event.target.value)}/>
                <span>y</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={go.y} onChange={event => goto('y', event.target.value)}/>
            </>}
        </button>
    );
}

export default Goto;