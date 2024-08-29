import React, { useState } from "react";

const Resize = props => {
    const [sizeUp, setSizeUp] = useState(props.definite ? props.to : props.by);

    const resizeBy = by => { setSizeUp(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onClick={() => {}}>
            <span>{props.definite ? 'set size to' : 'change size by'}</span>
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={sizeUp} onChange={event => resizeBy(event.target.value)}
                min={0}/>
            {props.definite && <span>{'%'}</span>}
        </button>
    );
}

export default Resize;