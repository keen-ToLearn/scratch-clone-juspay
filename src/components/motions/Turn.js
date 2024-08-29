import React, { useState } from "react";
import Icon from "../visual/Icon";

const Turn = props => {
    const [turnBy, setTurnBy] = useState(props.deg);

    const updateMoveBy = by => { setTurnBy(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {}}>
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
                    value={turnBy} onChange={event => updateMoveBy(event.target.value)}
                    min={0}/>
                <span>degrees</span>
            </>}
        </button>
    );
}

export default Turn;