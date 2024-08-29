import React, { useState } from "react";

const Loop = props => {
    const [repeatTime, setRepeatTime] = useState(props.times);
    const [actionData, setActionData] = useState(props.actionData ? actionData : []);

    const modifyRepeatTime = change => { setRepeatTime(change) }
    const organizeActionData = () => { setActionData(actionData) }

    return(
        <button className={`bg-${props.color} w-min text-white
            py-2 my-3 cursor-pointer rounded-md font-medium
            flex flex-col whitespace-nowrap loopButton`}
            onClick={() => {}}>
            {props.what == 'repeat' ?
            <div className="flex flex-row items-center px-3">
                <span>repeat</span>
                <input type="number" className="text-black text-center mx-2 functionInput"
                    value={repeatTime} onChange={event => modifyRepeatTime(event.target.value)}
                    min={0}/>
            </div> :
            <span className="px-3">forever</span>}
            {actionData.length == 0 &&
            <div className="bg-white ml-3 mt-2 mb-3 self-stretch">{'blank'}</div>}
        </button>
    );
}

export default Loop;