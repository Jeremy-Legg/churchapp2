import {Button} from "@material-ui/core";
import {DoubleArrow} from "@material-ui/icons";
import React from "react";

export type ButtonProps = {
    title: string;
    handler?: () => void;
}

export const OurNavButton = (props: ButtonProps) => {
    return (
        <Button variant="contained" color={"primary"}>{props.title} <DoubleArrow/></Button>
    )
};
