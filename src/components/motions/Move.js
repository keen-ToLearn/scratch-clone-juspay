import React, { useContext, useRef, useState } from "react";
import Icon from "../visual/Icon";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

const Move = props => {
    const { spriteMotionTrigger, pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const moveTimerRef = useRef(null);

    const [moveBy, setMoveBy] = useState(props.units);

    const updateMoveBy = by => { setMoveBy(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {
                if(!isCombo)
                    spriteMotionTrigger({
                        what: 'move',
                        options: { dir: props.dir, units: moveBy }
                    })
            }}
            onMouseDown={event => {
                // propagate mouse down upwards if isCombo
                moveTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)
                    
                    if(isCombo)
                        updateComboPin(props.index, false)
                    else
                        pickBlock([{
                            what: 'move',
                            options: { dir: props.dir, units: moveBy }
                        }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(moveTimerRef.current)
                if(isCombo)
                    updateComboPin(props.index, false, true)
            }}>
            <span>move</span>
            {props.dir != 'm' &&
                <Icon name={
                    props.dir == 'r' ? 'arrow-right' :
                    (props.dir == 'l' ? 'arrow-left' :
                    (props.dir == 'u' ? 'arrow-up' : 'arrow-down'))
                } className="mx-2" />}
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={moveBy} onChange={event => updateMoveBy(Number(event.target.value))}
                onClick={event => event.stopPropagation()} min={0}/>
            <span>steps</span>
        </button>
    );
}

export default Move;