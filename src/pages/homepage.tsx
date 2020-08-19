import React from 'react';
import {OurNavButton} from "../components/nav-button";
import {NewEventButton} from "../components/events/new-event";
import {useHistory} from "react-router";
import {ResumeEventButton} from "../components/events/resume-event";
import {findFirstIncompleteEvent, useEventsState} from "../hooks/data-state";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Button, Card, CardActions, CardContent, Grid, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            margin: 5,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    }),
);

export const HomePage = () => {
    const classes = useStyles();
    let [events] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);

    let history = useHistory();
    const handleNavigation = (destination : string) => {
            history.push(`/${destination}`);
    };

    return (
        <div>
            <main role="main">
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h4" component="h1">
                            Church App
                        </Typography>
                        <Typography variant="body2" component="p">
                            Here is some text about what the app is
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {
                            eventBeingEdited && <ResumeEventButton/>
                        }
                        {
                            !eventBeingEdited && <NewEventButton/>
                        }
                    </CardActions>
                </Card>

                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Reporting
                        </Typography>
                        <Typography variant="body2" component="p">
                            This is where you can view your reports. Reports are either based on a person, particular
                            night, or selected period of nights
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <OurNavButton  title={"Reporting"}/>
                    </CardActions>
                </Card>

                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Setup
                        </Typography>
                        <Typography variant="body2" component="p">
                            This is where you handle the management of the app. You can add/remove people + whatever
                            else
                            i think of
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <OurNavButton onClick={() => handleNavigation("setup")} title={"Setup"}/>
                    </CardActions>
                </Card>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Options
                        </Typography>
                        <Typography variant="body2" component="p">
                            Here are some options for how you would prefer the app to be. This is a future idea for
                            things like dark mode + other stuff
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <OurNavButton  title={"Options"}/>
                    </CardActions>
                </Card>
            </main>
        </div>
    )
}
