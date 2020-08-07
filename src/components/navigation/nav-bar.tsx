import React from "react";
import {AppBar, Button, createStyles, IconButton, Theme, Typography} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

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
            flexGrow: 1,
            marginLeft: '0.5rem',
        },

    }),
);

export const NavBar = (props: NavBarShape) => {
    const classes = useStyles();

    let history = useHistory();
    const handleNavHome = () => {
        history.replace('/');
    }

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" className={classes.title}>
                        {props.title}
                    </Typography>
                    <Button onClick={() => handleNavHome()} color="inherit"> <ArrowBackIosIcon/> Home Page</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
