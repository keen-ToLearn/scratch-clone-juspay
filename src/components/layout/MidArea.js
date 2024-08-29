import React, { useEffect, useRef, useState } from "react";

const MidArea = props => {
    const midAreaRef = useRef(null);

    const [bounds, setBounds] = useState({
        least: { x: 0, y: 0 },
        most: { x: 0, y: 0 }
    });

    const handleItemDrop = event => {
        event.stopPropagation()
        let isInBounds = checkLimit(event.clientX, event.clientY, bounds)

        if(props.block && isInBounds) {
            // create new combination
        }
    }

    useEffect(() => {
        if(midAreaRef && midAreaRef.current) {
            const areaRect = midAreaRef.current.getBoundingClientRect()
            setBounds({
                least: { x: areaRect.x, y: areaRect.y },
                most: {
                    x: areaRect.x + areaRect.width,
                    y: areaRect.y + areaRect.height
                }
            })
        }
    }, [])

    return (
        <div className="flex-1 h-full relative" ref={ele => { midAreaRef.current = ele }}
            onMouseUp={event => handleItemDrop(event)}></div>
    );
}

export default MidArea;