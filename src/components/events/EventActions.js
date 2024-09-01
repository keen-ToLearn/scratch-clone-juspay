import React, { useContext, useRef } from "react";
import Icon from "../visual/Icon";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";
import { CombinationContext } from "../../contexts/CombinationContext";

export const WhenFlag = ({ color, index }) => {
    const { pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const flagTimerRef = useRef(null);

    return(
        <button className={`bg-${color} w-min text-white ${isCombo ? 'border border-yellow-200' : ''}
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onMouseDown={event => {
                flagTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(index, false)
                    else
                        pickBlock([{ what: 'flag' }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(flagTimerRef.current)
                if(isCombo)
                    updateComboPin(index, false, true)
            }}>
            <span>when</span>
            <Icon name="flag" className="text-green-600 mx-2" />
            <span>clicked</span>
        </button>
    );
}

export const WhenSprite = ({ color, index }) => {
    const { pickBlock, initializeBlockPos } = useContext(SpriteActionsContext);
    const { isCombo, updateComboPin } = useContext(CombinationContext);

    const spriteTimerRef = useRef(null);

    return(
        <button className={`bg-${color} w-min text-white ${isCombo ? 'border border-yellow-200' : ''}
            px-3 my-${isCombo ? 0 : 3} cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onMouseDown={event => {
                spriteTimerRef.current = setTimeout(() => {
                    initializeBlockPos(event.clientX, event.clientY)

                    if(isCombo)
                        updateComboPin(index, false)
                    else
                        pickBlock([{ what: 'sprite' }])
                }, 300)
            }}
            onMouseUp={event => {
                clearTimeout(spriteTimerRef.current)
                if(isCombo)
                    updateComboPin(index, false, true)
            }}>
            <span>when</span>
            <span className="mx-1">this sprite</span>
            <span>clicked</span>
        </button>
    );
}

const EventActions = props => {
    const whatBasedEventRender = props.eventFunctions.map((eve, i) => {
        return eve.what == 'flag' ?
                <WhenFlag key={eve.what + i} color={props.color} /> :
                <WhenSprite key={eve.what + i} color={props.color} />
    })

    return whatBasedEventRender;
}

export default EventActions;