import React from 'react';
import {Card, CardActionArea, CardActions, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {getLastMonthEvents, useEventsState} from "../../hooks/data-state";
import moment from 'moment';
import {OurNavButton} from "../nav-button";

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export const LastMonth = () => {
    const classes = useStyles();
    let [events] = useEventsState();
    let lastMonthsEvents = getLastMonthEvents(events, 5);

    return (
        <Card className={classes.root} variant="elevation" square>
            <CardActionArea>
                <CardContent>
                    {lastMonthsEvents &&
                    <>
                        <Typography gutterBottom variant="h5" component="h2">
                            Last Month
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {events.length}
                        </Typography>
                        {
                            lastMonthsEvents.map((event, index) => {
                                return (
                                    <Typography variant="body2" color="textSecondary" component="p" key={index}>
                                        {event?.name}
                                        {' '}
                                        {event?.people.length}
                                        {' '}
                                        {moment(event?.date).format("Do MMMM YYYY")}
                                    </Typography>
                                )
                                }
                            )
                        }
                    </>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions>
                <OurNavButton title={"Reporting"}/>
            </CardActions>
        </Card>

    )
}
