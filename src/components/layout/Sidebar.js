import React, { useRef, useState } from "react";
import Icon from "../visual/Icon";
import { categories } from "../../utilities/categories";
import MotionActions from "../motions/MotionActions";
import { controlFunctions, eventFunctions, lookFunctions, motionFunctions } from "../../utilities/functions";
import LookActions from "../looks/LookActions";
import EventActions from "../events/EventActions";
import ControlActions from "../controls/ControlActions";

const Sidebar = props => {
    const barRef = useRef(null);
    const motionActionsRef = useRef(null);
    const lookActionsRef = useRef(null);
    const eventActionsRef = useRef(null);
    const controlActionsRef = useRef(null);

    const [activeCid, setActiveCid] = useState(1);

    const updateActiveCid = cid => {
        setActiveCid(cid)

        if(barRef && barRef.current)
            if(cid == 1)
                barRef.current.scrollTop = 0
            else if(cid == 2 && motionActionsRef && motionActionsRef.current)
                barRef.current.scrollTop = motionActionsRef.current.scrollHeight
            else if(cid == 3 && lookActionsRef && lookActionsRef.current)
                barRef.current.scrollTop = motionActionsRef.current.scrollHeight + lookActionsRef.current.scrollHeight
            else if(cid == 4 && eventActionsRef && eventActionsRef.current)
                barRef.current.scrollTop = motionActionsRef.current.scrollHeight + lookActionsRef.current.scrollHeight + eventActionsRef.current.scrollHeight
    }

    const categoryList = categories.map(category => {
        let textColor = category.color.substring(category.color.indexOf('-') + 1)
        textColor = 'text-' + textColor

        return(
            <div key={category.cid} className={`w-full p-2 py-3 cursor-pointer ${activeCid === category.cid ? 'bg-blue-50' : ''}`}
                onClick={() => updateActiveCid(category.cid)}>
                <div>
                    <Icon name="circle" size={24} className={`${textColor} mx-auto`} />
                </div>
                <div className="text-center font-semibold text-xs"><span>{category.name}</span></div>
            </div>
        );
    });

    return (
        <div className="w-2/5 h-full flex flex-row items-start border-r border-gray-200">
            <div className="w-1/6 h-full flex flex-col border-r border-gray-200">
                {categoryList}
            </div>
            <div ref={ele => { barRef.current = ele }} className="h-full flex-1 overflow-y-auto p-2">
                <div ref={ele => { motionActionsRef.current = ele }}>
                    <div className="font-semibold text-md">Motion</div>
                    <MotionActions motionFunctions={motionFunctions}
                        color={categories.filter(category => category.type == 'motion')[0].color} />
                </div>
                <div ref={ele => { lookActionsRef.current = ele }}>
                    <div className="font-semibold text-md">Looks</div>
                    <LookActions lookFunctions={lookFunctions}
                        color={categories.filter(category => category.type == 'looks')[0].color} />
                </div>
                <div ref={ele => { eventActionsRef.current = ele }}>
                    <div className="font-semibold text-md">Events</div>
                    <EventActions eventFunctions={eventFunctions}
                        color={categories.filter(category => category.type == 'events')[0].color} />
                </div>
                <div ref={ele => { controlActionsRef.current = ele }}>
                    <div className="font-semibold text-md">Control</div>
                    <ControlActions controlFunctions={controlFunctions}
                        color={categories.filter(category => category.type == 'control')[0].color} />
                </div>
            </div>
        </div>
    );
}

export default Sidebar;