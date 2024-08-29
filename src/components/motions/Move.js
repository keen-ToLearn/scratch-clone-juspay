import React, { useState } from "react";
import Icon from "../visual/Icon";

const Move = props => {
    const [moveBy, setMoveBy] = useState(props.units);

    const updateMoveBy = by => { setMoveBy(by) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center functionButton`}
            onClick={() => {}}>
            <span>move</span>
            {props.dir != 'm' &&
                <Icon name={
                    props.dir == 'r' ? 'arrow-right' :
                    (props.dir == 'l' ? 'arrow-left' :
                    (props.dir == 'u' ? 'arrow-up' : 'arrow-down'))
                } className="mx-2" />}
            <input type="number" className="text-black text-center mx-2 functionInput"
                value={moveBy} onChange={event => updateMoveBy(event.target.value)}
                min={0}/>
            <span>steps</span>
        </button>
    );
}

export default Move;