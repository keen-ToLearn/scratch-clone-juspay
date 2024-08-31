import React from "react";
import { categoryColorPicker } from "../utilities/categoryColorPicker";
import Move from "./motions/Move";
import Turn from "./motions/Turn";
import Goto from "./motions/Goto";
import CostumeFunction from "./looks/CostumeFunction";
import Resize from "./looks/Resize";
import Say from "./looks/Say";
import { WhenFlag, WhenSprite } from "./events/EventActions";
import Wait from "./controls/Wait";
import Loop from "./controls/Loop";

const DragBlock = props => {
    // based on block type, refer SideBar and render block
    const whatBasedActionRender = props.block.map((action, i) => {
        return action.what == 'move' ?
                <Move key={action.what + i} dir={action.options.dir} units={action.options.units}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'turn' ?
                <Turn key={action.what + i} dir={action.options.dir}
                    deg={action.options.deg} reset={action.options.reset}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'goto' ?
                <Goto key={action.what + i} random={action.options.random}
                    x={action.options.x} y={action.options.y}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'costume' ?
                <CostumeFunction key={action.what + i} next={action.next} which={action.which}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'resize' ?
                <Resize key={action.what + i} definite={action.definite}
                    to={action.to} by={action.by}
                    color={categoryColorPicker[action.what]} index={i} /> : (['say', 'think'].includes(action.what) ?
                <Say key={action.what + i} what={action.what} default={action.default}
                    timed={action.timed} time={action.time}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'flag' ?
                <WhenFlag key={action.what + i}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'sprite' ?
                <WhenSprite key={action.what + i}
                    color={categoryColorPicker[action.what]} index={i} /> : (action.what == 'wait' ?
                <Wait key={action.what + i} for={action.for}
                    color={categoryColorPicker[action.what]} index={i} /> :
                <Loop key={action.what + i} what={action.what}
                    times={action.times} actionData={action.actionData}
                    color={categoryColorPicker[action.what]} index={i} />))))))))
    })

    return whatBasedActionRender;
}

export default DragBlock;