import React from "react";
import Say from "./Say";
import CostumeFunction from "./CostumeFunction";
import Resize from "./Resize";

const LookActions = props => {
    const whatBasedLookRender = props.lookFunctions.map((look, i) => {
        return look.what == 'costume' ?
                <CostumeFunction key={look.what + i} next={look.next} which={look.which}
                    color={props.color} /> : (look.what == 'resize' ?
                <Resize key={look.what + i} definite={look.definite} to={look.to}
                    by={look.by} color={props.color} /> :
                <Say key={look.what + i} what={look.what} default={look.default} timed={look.timed}
                    time={look.time} color={props.color} />)
    })

    return whatBasedLookRender;
}

export default LookActions;