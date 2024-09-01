import React, { useContext, useRef, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Resize = props => {
    const { spriteLooksTrigger, pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const resizeTimerRef = useRef(null);

    const [sizeUp, setSizeUp] = useState(props.to);

    const resizeBy = by => { setSizeUp(by) }

    return(
        <button className={`bg-${props.color} w-min text-white ${isCombo ? 'border border-purple-200' : ''}
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onClick={() => {
                if(!isCombo)
                    spriteLooksTrigger({
                        what: 'resize',
                        definite: props.definite,
                        to: sizeUp
                    })
            }}
            onMouseDown={event => {
                resizeTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: 'resize',
                            definite: props.definite,
                            to: sizeUp
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(resizeTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
            }}>
            <span>{props.definite ? 'set size to' : 'change size by'}</span>
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={sizeUp} onChange={event => resizeBy(Number(event.target.value))}
                onClick={event => event.stopPropagation()}/>
            {props.definite && <span>{'%'}</span>}
        </button>
    );
}

export default Resize;