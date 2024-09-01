import React, { useEffect, useRef, useState } from "react";
import { checkLimit } from "../../utilities/checkLimit";

const PreviewArea = props => {
    const Costume = props.costumes[props.inUse];

    const areaRef = useRef(null);

    const [bounds, setBounds] = useState({
        least: { x: 0, y: 0 },
        most: { x: 0, y: 0 }
    });

    const [spriteAt, setSpriteAt] = useState(props.spriteAt);
    const [spriteSize, setSpriteSize] = useState(props.spriteSize);

    const handleSpriteMove = event => {
        let isInBounds = checkLimit(event.clientX, event.clientY, bounds)
        
        if(props.spritePinned && isInBounds) {
            props.updateSpritePos({
                x: event.clientX - bounds.least.x,
                y: event.clientY - bounds.least.y,
                deg: spriteAt.deg
            }, false)
            setSpriteAt({
                x: event.clientX - bounds.least.x,
                y: event.clientY - bounds.least.y,
                deg: spriteAt.deg
            })
        }
    }

    useEffect(() => {
        if(areaRef && areaRef.current) {
            const areaRect = areaRef.current.getBoundingClientRect()
            setBounds({
                least: { x: areaRect.x, y: areaRect.y },
                most: {
                    x: areaRect.x + areaRect.width,
                    y: areaRect.y + areaRect.height
                }
            })
        }
    }, [])

    useEffect(() => {
        setSpriteAt(props.spriteAt)
        setSpriteSize(props.spriteSize)
    }, [props.spriteAt, props.spriteSize])

    return (
        <div className="flex-1 h-full relative" ref={ele => { areaRef.current = ele }}
            onMouseMove={event => handleSpriteMove(event)}
            onMouseUp={() => props.pinTheSprite(false)}>
            <div className="absolute" style={{
                top: spriteAt.y,
                left: spriteAt.x,
                rotate: `${spriteAt.deg}deg`,
                transform: `scale(${spriteSize})`
            }}
            onClick={() => props.clickTheSprite()}
            onMouseDown={() => props.pinTheSprite(true)} onMouseUp={() => props.pinTheSprite(false)}>
                <Costume />
                {props.speak &&
                    <div className={`absolute rounded-xl px-4 py-2 border-4 border-gray-300
                        border-${props.speak.act == 'say' ? 'solid' : 'dotted'}
                        top-0 left-full`}>
                        <span>{props.speak.speakWhat}</span>
                    </div>}
            </div>
        </div>
    );
}

export default PreviewArea;