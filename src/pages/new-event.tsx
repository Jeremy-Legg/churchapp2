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

export const NewEventPage = () =>  {

    let {eventName} = useParams();
    const classes = useStyles();

    let [people] = usePeopleState();
    let [events, setEvents] = useEventsState();
    let [incompleteEvent, setIncompleteEvent] = useIncompleteEventState();
    let [peopleInEvent, setPeopleInEvent] =  useState([] as any);
    //let [event, setEvent] = useState(new ChurchEvent(eventName));




    const toggleSelected = (person: IPerson) => {
        if (!isPersonInEvent(person)){
            let newEvent = [...peopleInEvent, person];
            setPeopleInEvent(newEvent);
        }
        else {
            setPeopleInEvent(peopleInEvent.filter((p: IPerson) => p !== person))
        }
        console.log(`toggle ${person.id}`);
        handleIncompleteEvent();
    };



    const handleEndNight = () => {
        let newEvent = new ChurchEvent(eventName);
        newEvent.people = peopleInEvent;
        newEvent.complete = true;
        let allEvents = [...events, newEvent];
        setEvents(allEvents);
    }



    const handleIncompleteEvent = () => {
        let eventToSave = new ChurchEvent(eventName);
        eventToSave.people = peopleInEvent;
        setIncompleteEvent(eventToSave);
    }


    const isPersonInEvent = (person: IPerson) => {
        return peopleInEvent.indexOf(person) !== -1;
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
