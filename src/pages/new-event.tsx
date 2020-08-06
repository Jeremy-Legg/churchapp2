import React, {useEffect, useState} from "react";
import {useParams, useHistory} from 'react-router-dom';
import {usePeopleState, useTags} from "../hooks/our-state";
import {ChurchEvent} from "../model/IChurchEvent";
import {Avatar, Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {IPerson} from "../model/IPerson";
import {NavBar} from "../components/navigation/nav-bar";

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

    let [event, setEvent] = useState(new ChurchEvent(eventName));

    const toggleSelected = (person: IPerson) => {
        console.log(`toggle ${person.id}`);
        event.togglePersonInEvent(person);
        setEvent(event);
    };

    useEffect(() => {
        console.log("render the thing");
    }, [event]);

    return (
        <>
            <NavBar title={"Create Event"} linkBackTitle={"Home Page"} />
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
        </>
    );
};
