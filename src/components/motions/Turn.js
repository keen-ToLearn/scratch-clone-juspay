import React, { useContext, useRef, useState } from "react";
import Icon from "../visual/Icon";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Turn = props => {
    const { spriteMotionTrigger, pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const turnTimerRef = useRef(null);

    const [turnBy, setTurnBy] = useState(props.deg);

    const updateMoveBy = by => { setTurnBy(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton ${isCombo ? 'border border-blue-200' : ''}`}
            onClick={() => {
                if(!isCombo)
                    spriteMotionTrigger({
                        what: 'turn',
                        options: { dir: props.dir, deg: turnBy, reset: props.reset }
                    })
            }}
            onMouseDown={event => {
                turnTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: 'turn',
                            options: { dir: props.dir, deg: turnBy, reset: props.reset }
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(turnTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
            }}>
            {props.reset ?
            <>
                <span className="whitespace-nowrap">point in direction</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    defaultValue={0} readOnly/>
            </> :
            <>
                <span>turn</span>
                <Icon name={props.dir == 'r' ? 'redo' : 'undo'} className="mx-2" />
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={turnBy} onChange={event => updateMoveBy(Number(event.target.value))}
                    onClick={event => event.stopPropagation()} min={0}/>
                <span>degrees</span>
            </>}
        </button>
    );
}

export default Turn;