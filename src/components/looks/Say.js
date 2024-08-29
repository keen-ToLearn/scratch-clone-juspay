import React, { useContext, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";

const Say = props => {
    const { spriteLooksTrigger } = useContext(SpriteActionsContext);

    const [sayWhat, setSayWhat] = useState(props.default);
    const [sayFor, setSayFor] = useState(props.time);

    const makeSay = what => { setSayWhat(what) }

    const updateSayTime = forTime => { setSayFor(forTime) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {
                spriteLooksTrigger({
                    what: props.what,
                    default: sayWhat,
                    timed: props.timed,
                    time: sayFor
                })
            }}>
            <span>{props.what}</span>
            <input type="text" className="text-black text-center mx-2 funcInputText"
                value={sayWhat} onChange={event => makeSay(event.target.value)}
                onClick={event => event.stopPropagation()}/>
            {props.timed &&
            <>
                <span>for</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={sayFor} onChange={event => updateSayTime(Number(event.target.value))}
                    onClick={event => event.stopPropagation()} min={0}/>
                <span>seconds</span>
            </>}
        </button>
    );
}

export default Say;