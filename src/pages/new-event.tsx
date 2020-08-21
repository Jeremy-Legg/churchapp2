import React from "react";
import {useHistory, useParams} from 'react-router-dom';
import {findFirstIncompleteEvent, useEventsState, usePeopleState} from "../hooks/data-state";
import {ChurchEvent} from "../model/IChurchEvent";
import {Container, Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {IPerson} from "../model/IPerson";
import {NavBar} from "../components/navigation/nav-bar";
import {OurNonNavButton} from "../components/non-nav-button";

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
        endNight: {
            backgroundColor: '#00203b',
            '&:hover': {
                backgroundColor: '#000000',
            },
            display: 'flex',
            float: 'right',
            border: '1px solid',
        },
        deleteNight: {
            backgroundColor: '#00203b',
            '&:hover': {
                backgroundColor: '#000000',
            },
            display: 'flex',
            float: 'left',
            border: '1px solid',
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

            <Container>
            <OurNonNavButton title={"End Night"} onClick={() => handleEndNight()} className={classes.endNight}/>
            <OurNonNavButton title={"Delete Night"} onClick={() => handleDeleteNight()} className={classes.deleteNight}/>
            </Container>
        </>
    );
};
