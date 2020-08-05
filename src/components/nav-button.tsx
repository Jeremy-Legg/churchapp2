import {Button} from "@material-ui/core";
import {DoubleArrow} from "@material-ui/icons";
import React from "react";

export type OurButtonShape = {
    title: string;
    onClick?: () => void;
}

export const OurNavButton = (props: OurButtonShape) => {
    return (
        <Button onClick={props.onClick} variant="contained" color={"primary"}>{props.title}
            <DoubleArrow/></Button>
    )
};
