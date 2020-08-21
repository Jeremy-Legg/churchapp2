import React from "react";
import {OurNavButton} from "../nav-button";
import {GetEventName} from "./get-event-name";
import {useAppDispatch} from "../../state/store";
import uiSlice from "../../state/ui-state";

export const NewEventButton = () => {
    let dispatch = useAppDispatch();
    return (
        <div>
            <OurNavButton title="Create Night" onClick={() => dispatch(uiSlice.actions.openDialog())}/>
            <GetEventName/>
        </div>
    )
};

