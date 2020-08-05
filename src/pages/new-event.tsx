import React, {useCallback, useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import {usePeopleState, useTags} from "../hooks/data-state";
import {ChurchEvent} from "../model/IChurchEvent";
import {Avatar, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IPerson} from "../model/IPerson";
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

export const NewEventPage = () => {
    let {eventName} = useParams();
    const classes = useStyles();

    let [people] = usePeopleState();
    let [tags] = useTags();

    let [event, setEvent] = useInstanceState(new ChurchEvent(eventName));

    const toggleSelected = (person: IPerson) => {
        event.togglePersonInEvent(person);
        setEvent(event);
    };

    return (
        <>
            <h1>New Event</h1>
            <div>{event.name} - {JSON.stringify(event.people)}</div>
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
        </>
    );
};
