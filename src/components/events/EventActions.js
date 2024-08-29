import React from "react";
import Icon from "../visual/Icon";

const EventActions = props => {
    const whatBasedEventRender = props.eventFunctions.map((eve, i) => {
        return(
            <button key={eve.what + i} className={`bg-${props.color} w-min text-white
                px-3 my-3 cursor-pointer rounded-md font-medium
                flex flex-row items-center whitespace-nowrap functionButton`}
                onClick={() => {}}>
                <span>when</span>
                {eve.what == 'flag' ?
                <Icon name="flag" className="text-green-600 mx-2" /> :
                <span className="mx-1">this sprite</span>}
                <span>clicked</span>
            </button>
        );
    })

    return whatBasedEventRender;
}

export default EventActions;