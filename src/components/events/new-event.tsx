import React, {useState} from "react";
import {OurNavButton} from "../nav-button";
import {SSDialog} from "../single-string-dialog";
import { useHistory } from "react-router-dom";

export const NewEventButton = () => {
    const [open, setOpen] = useState(false);

    let history = useHistory();
    const handleOk = (eventName: string) => {
        history.push(`/event/${eventName}`)
    };
    return (
        <div>
            <OurNavButton title="Create Night" onClick={() => setOpen(true)}/>
            <SSDialog title={"Create A New Event"}
                      label={"Event Name"}
                      open={open}
                      cancel={() => setOpen(false)}
                      ok={handleOk}
            />
        </div>
    )
};

export {}
