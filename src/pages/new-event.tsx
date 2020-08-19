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
import {Avatar, Card, CardContent, Container, Grid, Paper, Typography} from "@material-ui/core";
import { createStyles, Theme } from '@material-ui/core/styles';

import {makeStyles} from "@material-ui/core/styles";
import {IPerson, Person} from "../model/IPerson";
import {NavBar} from "../components/navigation/nav-bar";
import {OurNavButton} from "../components/nav-button";
import {useInstanceState} from "../hooks/object-state";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        name: {
            color: '#ffffff',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginLeft: '0.5rem',
        },
        notInEvent: {
            fontSize: '18px',
            padding: theme.spacing(1),
            textAlign: 'center',
            color: '#00203b',
        },
        inEvent: {
            fontSize: '18px',
            padding: theme.spacing(1),
            textAlign: 'center',
            color: '#000000',
            backgroundColor: '#d4ffe0'
        },
        container: {
            padding: '10px',
        },
    }),
);

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

            <h1 className={classes.name}>{eventBeingEdited?.name}</h1>
            <Container className={classes.container}>
                <Grid className={classes.root} container spacing={2}>
                {

                    people.map((person, index) => {
                        return (
                            <React.Fragment key={index}>



                                    <Grid item xs={6} sm={6}  onClick={() => toggleSelected(person)}>
                                        {!eventBeingEdited?.isPersonInEvent(person) &&
                                        <Paper className={classes.notInEvent}>{person.name}</Paper>
                                        }
                                        {eventBeingEdited?.isPersonInEvent(person) &&
                                        <Paper className={classes.inEvent}>{person.name}</Paper>
                                        }
                                    </Grid>






                            </React.Fragment>
                        )
                    })
                }
                </Grid>
            </Container>
            <OurNavButton title={"End Night"} onClick={() => handleEndNight()}/>
            <OurNavButton title={"Delete Night"} onClick={() => handleDeleteNight()}/>

        </>
    );
};
