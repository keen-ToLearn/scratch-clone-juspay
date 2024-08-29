import React, { useContext, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";

const Resize = props => {
    const { spriteLooksTrigger } = useContext(SpriteActionsContext);

    const [sizeUp, setSizeUp] = useState(props.to);

    const resizeBy = by => { setSizeUp(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onClick={() => {
                spriteLooksTrigger({
                    what: 'resize',
                    definite: props.definite,
                    to: sizeUp
                })
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