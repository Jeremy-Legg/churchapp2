import {Button, createStyles, Theme} from "@material-ui/core";
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

export type OurButtonShape = {
    title: string;
    onClick?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        colour: {
            backgroundColor: '#00203b',
            '&:hover': {
                backgroundColor: '#000000',
            },
        },
    }),
);

export const OurNavButton = (props: OurButtonShape) => {
    const classes = useStyles();

    return (
        <Button onClick={props.onClick} variant="contained" color={"primary"} className={classes.colour}>{props.title}
            <ChevronRightRoundedIcon/></Button>
    )
};
