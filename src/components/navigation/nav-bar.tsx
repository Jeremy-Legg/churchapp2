import React from "react";
import {AppBar, Button, createStyles, Theme, Typography} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from "@material-ui/core/styles";
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import {useHistory} from "react-router-dom";

export type NavBarShape = {
    title: string;
    linkBackTitle?: string;
    onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            backgroundColor: '#00203b',
            flexGrow: 1,
            marginLeft: '0.5rem',
        },
        bar: {
            backgroundColor: '#00203b',
        }

    }),
);

export const NavBar = (props: NavBarShape) => {
    const classes = useStyles();

    let history = useHistory();
    const handleNavHome = () => {
        history.replace('/');
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.bar}>
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        {props.title}
                    </Typography>
                    {props.onClick &&
                    <Button onClick={() => handleNavHome()} color="inherit">
                        <ChevronLeftRoundedIcon/>{props.linkBackTitle}</Button>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}
