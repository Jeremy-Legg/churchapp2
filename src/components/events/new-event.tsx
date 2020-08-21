import React, {useState} from "react";
import {OurNavButton} from "../nav-button";
import {GetEventName} from "./get-event-name";

export const NewEventButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <OurNavButton title="Create Night" onClick={() => setOpen(true)}/>
            <GetEventName open={open} setOpen={setOpen}/>
        </div>
    )
};

