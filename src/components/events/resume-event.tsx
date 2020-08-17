import React, {useState} from "react";
import {OurNavButton} from "../nav-button";
import {SSDialog} from "../single-string-dialog";
import { useHistory } from "react-router-dom";
import {useEventsState, useIncompleteEventState} from "../../hooks/data-state";
import {useInstanceState} from "../../hooks/object-state";

export const ResumeEventButton = () => {
/*
    const [event] = useInstanceState();

    let history = useHistory();
    const handleResumeEvent = (eventName: string) => {
        history.push(`/event/${eventName}`)
    };

 */
    return (
        <div>
            <OurNavButton title="Resume Night"/>
        </div>
    )
};

