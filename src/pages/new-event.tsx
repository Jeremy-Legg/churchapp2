import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {useEventsState, useIncompleteEventState, usePeopleState, useTags} from "../hooks/our-state";
import {ChurchEvent, ChurchEvents, IChurchEvent, IChurchEvents} from "../model/IChurchEvent";
import {Avatar, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IPerson, Person} from "../model/IPerson";
import {NavBar} from "../components/navigation/nav-bar";
import {OurNavButton} from "../components/nav-button";


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

export const NewEventPage = () => {
    let {eventName} = useParams();
    const classes = useStyles();

    let [people] = usePeopleState();
    let [tags] = useTags();
    let [events, setEvents] = useEventsState();
    let [incompleteEvent, setIncompleteEvent] = useIncompleteEventState();

    let [event, setEvent] = useState(new ChurchEvent(eventName));


    const toggleSelected = (person: IPerson) => {
        console.log(`toggle ${person.id}`);
        event.togglePersonInEvent(person);
        setEvent(event);
    };

    const resumeNight = () => {
        console.log(incompleteEvent);
        console.log(event);
        if (!incompleteEvent.complete && incompleteEvent.name !== "") {
            setEvent(incompleteEvent);
        }
        console.log(event);
    }

    useEffect(() => {
        console.log("render the thing");
        resumeNight();
    }, [event]);

    const handleEndNight = () => {
        event.complete = true;
        let newEvents = [...events, event];
        setEvents(newEvents);
    }

    const handleIncompleteEvent = () => {
        setIncompleteEvent(event)
    }

    return (
        <>
            <NavBar title={"Create Event"} linkBackTitle={"Home Page"} onClick={() => handleIncompleteEvent()}/>
            <h1>{event.name}</h1>
            {
                people.map((person, index) => {
                    return (
                        <React.Fragment key={index}>
                            {event.isPersonInEvent(person) && <h2>SELECTED</h2>}
                            <Card key={index} className={classes.root} variant="outlined"
                                  onClick={() => toggleSelected(person)}
                            >
                                <Avatar>{person.firstLetter()}</Avatar>
                                <CardContent>
                                    <Typography className={classes.title}>{person.name}</Typography>
                                    {event.isPersonInEvent(person) &&
                                    <Typography className={classes.title}>SELECTED</Typography>
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
