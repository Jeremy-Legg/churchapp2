import React, {useState} from "react";
import uiSlice from "../../state/ui-state";
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import EventNoteRoundedIcon from "@material-ui/icons/EventNoteRounded";
import {GetEventName} from "../events/get-event-name";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import {useAppDispatch} from "../../state/store";
import {findFirstIncompleteEvent, useEventsState} from "../../hooks/data-state";
import {useHistory} from "react-router";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 275,
            margin: 5,
            bottom: 0,
        },
    }),
);

export const PageNavigation = () => {
    const classes = useStyles();
    let [pageName, setPageName] = useState("home");
    let dispatch = useAppDispatch();
    let [events] = useEventsState();
    let eventBeingEdited = findFirstIncompleteEvent(events);

    let history = useHistory();
    const resumeEvent = () => {
        history.push(`/event/${eventBeingEdited?.name}`)
    };
    const handleNavigation = (destination: string) => {
        history.push(`/${destination}`);
    };

    return (
        <BottomNavigation
            value={pageName}
            onChange={(event, newValue) => {
                setPageName(newValue);
                switch (newValue) {
                    case "events":
                        // do magic
                        if(eventBeingEdited) {
                            resumeEvent()
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
    )
}
