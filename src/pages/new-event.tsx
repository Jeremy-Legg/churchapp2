import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useEventsState, useIncompleteEventState, usePeopleState, useTags} from "../hooks/data-state";
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

export const NewEventPage = () =>  {

    let {eventName} = useParams();
    const classes = useStyles();
    let history = useHistory();

    let [people] = usePeopleState();
    let [events, setEvents] = useEventsState();
    let [event, setEvent] = useInstanceState(new ChurchEvent(eventName));
    let [incompleteEvent, setIncompleteEvent] = useIncompleteEventState();
/*
    if (!incompleteEvent.complete){
        setEvent(incompleteEvent);
    }
 */

    const toggleSelected = (person: IPerson) => {
        event.togglePersonInEvent(person);
        setEvent(event);
    };

    const handleEndNight = () => {
        event.complete = true;
        let allEvents = [...events, event];
        setEvents(allEvents);
        setIncompleteEvent(event);
        history.replace('/');
    }

    const handleIncompleteEvent = () => {
        setIncompleteEvent(event);
    }

    const isPersonInEvent = (person: IPerson) => {
        return event.people.indexOf(person) !== -1;
    }

    return (
        <>
            <NavBar title={"Create Event"} linkBackTitle={"Home Page"} onClick={() => handleIncompleteEvent()}/>

            <h1>{eventName}</h1>
            {
                people.map((person, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Card key={index} className={classes.root} variant="outlined"
                                  onClick={() => toggleSelected(person)}
                            >
                                <Avatar>{person.firstLetter()}</Avatar>
                                <CardContent>
                                    {!isPersonInEvent(person) &&
                                    <Typography className={classes.title}>{person.name}</Typography>
                                    }
                                    {isPersonInEvent(person) &&
                                    <Typography className={classes.selected}>{person.name}</Typography>
                                    }
                                </CardContent>
                            </Card>
                        </React.Fragment>
                    )
                })
            }
            <OurNavButton title={"End Night"} onClick={() => handleEndNight()}/>
        </>
    );
};
