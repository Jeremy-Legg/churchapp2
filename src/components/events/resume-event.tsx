import React, {useState} from "react";
import {OurNavButton} from "../nav-button";
import {SSDialog} from "../single-string-dialog";
import { useHistory } from "react-router-dom";
import {useEventsState, useIncompleteEventState} from "../../hooks/our-state";

export const ResumeEventButton = () => {

    const [incompleteEvent] = useIncompleteEventState();

    let history = useHistory();
    const handleResumeEvent = (eventName: string) => {
        history.push(`/event/${eventName}`)
    };
    return (
        <div>
            <OurNavButton title="Resume Night" onClick={() => handleResumeEvent(incompleteEvent.name)}/>
        </div>
    )
};

