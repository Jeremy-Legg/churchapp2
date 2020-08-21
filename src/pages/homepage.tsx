import React, {useState} from 'react';
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {BottomNavigation, BottomNavigationAction, Box, CardActions} from "@material-ui/core";
import {NavBar} from "../components/navigation/nav-bar";
import {LastEvent} from "../components/events/last-event";
import {LastMonth} from "../components/events/last-month";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EventNoteRoundedIcon from '@material-ui/icons/EventNoteRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import {ResumeEventButton} from "../components/events/resume-event";
import {NewEventButton} from "../components/events/new-event";
import {findFirstIncompleteEvent, useEventsState} from "../hooks/data-state";
import {OurNavButton} from "../components/nav-button";
import {GetEventName} from "../components/events/get-event-name";
import {useAppDispatch} from "../state/store";
import uiSlice from "../state/ui-state";

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
    let [pageName, setPageName] = useState("home");
    let dispatch = useAppDispatch();

    let [events] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);

    let history = useHistory();
    const handleNavigation = (destination: string) => {
        history.push(`/${destination}`);
    };

    const justGoThere = () => {
        history.push(`/event/${eventBeingEdited?.name}`)
    };

    return (
        <div>
            <div>
                <NavBar title={"Dashboard"}/>
            </div>
            <div>
                <LastEvent/>
                <LastMonth/>
            </div>
            <BottomNavigation
                value={pageName}
                onChange={(event, newValue) => {
                    setPageName(newValue);
                    switch (newValue) {
                        case "events":
                            // do magic
                            if(eventBeingEdited) {
                                justGoThere()
                            } else {
                                dispatch(uiSlice.actions.openDialog())
                            }
                            break;
                        default:
                            // assume its a route path
                            handleNavigation(newValue);
                    }
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Home" value="" icon={<HomeRoundedIcon/>}/>
                <BottomNavigationAction label="Events" value="events" icon={<EventNoteRoundedIcon/>}/>
                <GetEventName/>
                <BottomNavigationAction label="Reporting" value="reports" icon={<TimelineRoundedIcon/>}/>
                <BottomNavigationAction label="Setup" value="setup" icon={<SettingsRoundedIcon/>}/>
            </BottomNavigation>
        </div>
    )
}
