import React from "react";
import Wait from "./Wait";
import Loop from "./Loop";

const ControlActions = props => {
    const whatBasedControlRender = props.controlFunctions.map((control, i) => {
        return control.what == 'wait' ?
                <Wait key={control.what + i} for={control.for} color={props.color} /> :
                <Loop key={control.what + i} what={control.what} times={control.times}
                    actionData={control.actionData} color={props.color} />
    })

    return whatBasedControlRender;
}

export default ControlActions;