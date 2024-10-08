import React, { useContext, useRef, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Wait = props => {
    const { pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const waitTimerRef = useRef(null);

    const [wait, setWait] = useState(props.for);

    const changeWait = wait => { setWait(wait) }

    return(
        <button className={`${props.color} w-min text-white ${isCombo ? 'border border-red-200' : ''}
            px-3 ${isCombo ? 'my-0' : 'my-3'} cursor-pointer rounded-md font-medium text-sm
            flex flex-row items-center whitespace-nowrap functionButton`}
            onMouseDown={event => {
                waitTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)
                    
                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: 'wait',
                            for: wait
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(waitTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
            }}>
            <span>wait</span>
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={wait} onChange={event => changeWait(Number(event.target.value))}
                onClick={event => event.stopPropagation()} min={0} readOnly={isCombo}/>
            <span>seconds</span>
        </button>
    );
}

export default Wait;