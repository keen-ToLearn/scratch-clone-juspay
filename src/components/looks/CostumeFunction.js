import React, { useContext, useState } from "react";
import { SpriteActionsContext } from "../../contexts/SpriteActionsContext";

const CostumeFunction = props => {
    const { spriteLooksTrigger } = useContext(SpriteActionsContext);

    const [costumeNo, setCostumeNo] = useState(props.which);

    const changeCostume = no => { setCostumeNo(no) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onClick={() => {
                spriteLooksTrigger({
                    what: 'costume',
                    next: props.next,
                    which: costumeNo
                })
            }}>
            {props.next ? <span>next costume</span> :
            <>
                <span>switch costume to</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={costumeNo} onChange={event => changeCostume(Number(event.target.value))}
                    onClick={event => event.stopPropagation()} min={0}/>
            </>}
        </button>
    );
}

export default CostumeFunction;