import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ResumeEventButton} from "./resume-event";
import {NewEventButton} from "./new-event";
import {findFirstIncompleteEvent, getLatestEvent, useEventsState} from "../../hooks/data-state";
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const LastEvent = () => {
    const classes = useStyles();
    let [events] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);
    let lastEvent = getLatestEvent(events);

    return (
        <Card className={classes.root} variant="elevation" square>
            <CardActionArea>
                <CardContent>
                    {lastEvent &&
                    <>
                        <Typography gutterBottom variant="h5" component="h2">
                            Last Event
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {lastEvent?.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {moment(lastEvent?.date).format("Do MMMM YYYY")}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h1">
                            {lastEvent?.people.length}
                        </Typography>
                    </>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                    eventBeingEdited && <ResumeEventButton/>
                }
                {
                    !eventBeingEdited && <NewEventButton/>
                }
            </CardActions>
        </Card>
    )

}
