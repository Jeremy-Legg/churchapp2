import React from "react";
import {Card, CardActionArea, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEventsState, usePeopleState} from "../../hooks/data-state";



const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const UnattendingRegulars = () => {
    const classes = useStyles();
    let [events] = useEventsState();

    let [unattendingPeopleState] = usePeopleState();
    let unattendingPeople = unattendingPeopleState.filter(person => person.regular)

    if (events.length >= 3) {
        for (let i = (events.length - 3); i < events.length; i++) {
            for (let j = 0; j < events[i].people.length; j++){
                unattendingPeople = unattendingPeople.filter(person => person.id !== events[i].people[j].id)
            }
        }
    }

    return (
        <Card className={classes.root} variant="elevation" square>
            <CardActionArea>
                <CardContent>
                    {events && unattendingPeople &&
                    <>
                        <Typography gutterBottom variant="h5" component="h2">
                            Unattending Regulars
                        </Typography>
                        <Typography variant="h4" color="textSecondary" component="p">
                            {unattendingPeople.length}
                        </Typography>
                        {
                            unattendingPeople.map((person, index) => {
                                    return (
                                        <Typography key={index} variant="body2" color="textSecondary" component="p">
                                            {person.name}
                                            {' '}
                                        </Typography>
                                    )
                                }
                            )
                        }
                    </>
                    }
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
