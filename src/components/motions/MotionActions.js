import React from "react";
import Move from "./Move";
import Turn from "./Turn";
import Goto from "./Goto";

const MotionActions = props => {
    const whatBasedMotionRender = props.motionFunctions.map((motion, i) => {
        return motion.what == 'move' ?
                <Move key={motion.what + i} dir={motion.options.dir} units={motion.options.units}
                    color={props.color} /> : (motion.what == 'turn' ?
                <Turn key={motion.what + i} dir={motion.options.dir} deg={motion.options.deg}
                    reset={motion.options.reset} color={props.color} /> :
                <Goto key={motion.what + i} random={motion.options.random} x={motion.options.x}
                    y={motion.options.y} color={props.color} />)
    })

    return whatBasedMotionRender;
}

export default MotionActions;