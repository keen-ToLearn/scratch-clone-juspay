import React, { useContext, useRef, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Goto = props => {
    const { spriteMotionTrigger, pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const gotoTimerRef = useRef(null);

    const [go, setGo] = useState({
        x: props.x,
        y: props.y
    });

    const goto = (where, by) => { setGo({ ...go, [where]: by }) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton whitespace-nowrap`}
            onClick={() => {
                if(!isCombo)
                    spriteMotionTrigger({
                        what: 'goto',
                        options: { x: go.x, y: go.y, random: props.random }
                    })
            }}
            onMouseDown={event => {
                gotoTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: 'goto',
                            options: { x: go.x, y: go.y, random: props.random }
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(gotoTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
            }}>
            <span>go to</span>
            {props.random ? <span className="ml-1 bg-blue-600 px-2 rounded-md">random position</span> :
            <>
                <span className="ml-1">x</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={go.x} onChange={event => goto('x', Number(event.target.value))}
                    onClick={event => event.stopPropagation()}/>
                <span>y</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={go.y} onChange={event => goto('y', Number(event.target.value))}
                    onClick={event => event.stopPropagation()}/>
            </>}
        </button>
    );
}

export default Goto;