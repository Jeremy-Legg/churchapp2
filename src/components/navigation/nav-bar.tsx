import React from "react";
import {AppBar, Button, createStyles, IconButton, Theme, Typography} from "@material-ui/core";
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {makeStyles} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export type NavBarShape = {
    title: string;
    linkBackTitle?: string;
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

    let history = useHistory();
    const handleNavHome = () => {
        history.replace('/');
    }

    const classes = useStyles();

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
