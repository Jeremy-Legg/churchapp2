import React from "react";
import {OurNavButton} from "../nav-button";
import { useHistory } from "react-router-dom";
import {findFirstIncompleteEvent, useEventsState} from "../../hooks/data-state";

export const ResumeEventButton = () => {
    let history = useHistory();

    let [events, setEvents] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);

    const justGoThere = () => {
        history.push(`/event/${eventBeingEdited?.name}`)
    };

    return (
        <div>
            <OurNavButton title="Resume Night" onClick={() => justGoThere()}/>
        </div>
    )
};

