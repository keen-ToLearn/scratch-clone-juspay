import React, { useContext, useRef, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Say = props => {
    const { spriteLooksTrigger, pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const sayTimerRef = useRef(null);

    const [sayWhat, setSayWhat] = useState(props.default);
    const [sayFor, setSayFor] = useState(props.time);

    const makeSay = what => { setSayWhat(what) }

    const updateSayTime = forTime => { setSayFor(forTime) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {
                if(!isCombo)
                    spriteLooksTrigger({
                        what: props.what,
                        default: sayWhat,
                        timed: props.timed,
                        time: sayFor
                    })
            }}
            onMouseDown={event => {
                sayTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: props.what,
                            default: sayWhat,
                            timed: props.timed,
                            time: sayFor
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(sayTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
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