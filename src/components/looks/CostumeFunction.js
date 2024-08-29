import React, { useState } from "react";

const CostumeFunction = props => {
    const [costumeNo, setCostumeNo] = useState(props.which);

    const changeCostume = no => { setCostumeNo(no) }

    return(
        <button className={`bg-${props.color} w-min text-white
            px-3 my-3 cursor-pointer rounded-md font-medium
            flex flex-row items-center whitespace-nowrap functionButton`}
            onClick={() => {}}>
            {props.next ? <span>next costume</span> :
            <>
                <span>switch costume to</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={costumeNo} onChange={event => changeCostume(event.target.value)}
                    min={0}/>
            </>}
        </button>
    );
}

export default CostumeFunction;