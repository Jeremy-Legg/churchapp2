import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {
    findFirstIncompleteEvent,
    useEventsState,
    useIncompleteEventState,
    usePeopleState,
    useTags
} from "../hooks/data-state";
import {ChurchEvent, ChurchEvents, IChurchEvent, IChurchEvents} from "../model/IChurchEvent";
import {Avatar, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IPerson, Person} from "../model/IPerson";
import {NavBar} from "../components/navigation/nav-bar";
import {OurNavButton} from "../components/nav-button";
import {useInstanceState} from "../hooks/object-state";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'center',
    },
    title: {
        fontSize: 16,
    },
    selected: {
        background: 'green',
        color: 'white',
    }
});

export const EventEditorPage = () => {

    let {eventName} = useParams();
    const classes = useStyles();
    let history = useHistory();

    let [people] = usePeopleState();
    let [events, setEvents] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);

    if (eventBeingEdited === null) {
        eventBeingEdited = new ChurchEvent(eventName);
        setEvents([...events, eventBeingEdited])
    }

    const toggleSelected = (person: IPerson) => {
        eventBeingEdited!.togglePersonInEvent(person);
        setEvents(events);
    };

    const handleEndNight = () => {
        eventBeingEdited!.complete = true;
        setEvents(events);
        history.replace('/');
    };

    const handleDeleteNight = () => {
        let eventsToKeep = events.filter(e => e.id !== eventBeingEdited?.id);
        setEvents(eventsToKeep);
        history.replace('/');
    };

    const handleUserGoBack = () => {
        // setIncompleteEvent(event);
    };

    return (
        <>
            <NavBar title={"Create Event"} linkBackTitle={"Home Page"} onClick={() => handleUserGoBack()}/>

            <h1>{eventBeingEdited?.name}</h1>
            {
                people.map((person, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card key={index} className={classes.root} variant="outlined"
                                  onClick={() => toggleSelected(person)}
                            >
                                <Avatar>{person.firstLetter()}</Avatar>
                                <CardContent>
                                    {!eventBeingEdited?.isPersonInEvent(person) &&
                                    <Typography className={classes.title}>{person.name}</Typography>
                                    }
                                    {eventBeingEdited?.isPersonInEvent(person) &&
                                    <Typography className={classes.selected}>{person.name}</Typography>
                                    }
                                </CardContent>
                            </Card>
                        </React.Fragment>
                    )
                })
            }
            <OurNavButton title={"End Night"} onClick={() => handleEndNight()}/>
            <OurNavButton title={"Delete Night"} onClick={() => handleDeleteNight()}/>

        </>
    );
};
