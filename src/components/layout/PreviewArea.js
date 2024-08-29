import React from "react";

const PreviewArea = props => {
    const Costume = props.costumes[props.inUse];

    const handleSpritePinned = event => {

    }

    return (
        <div className="flex-none h-full relative" onClick={() => props.clickTheSprite()}>
            <div className="absolute" style={{
                top: props.spriteAt.y,
                left: props.spriteAt.x
            }} onMouseDown={event => handleSpritePinned(event)}>
                <Costume />
            </div>
        </div>
    );
}

export default PreviewArea;