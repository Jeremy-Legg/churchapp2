import {Button} from "@material-ui/core";
import React from "react";

export type OurButtonShape = {
    title: string;
    onClick?: () => void;
    className?: string;
}

export const OurNonNavButton = (props: OurButtonShape) => {
    return (
        <Button onClick={props.onClick} variant="contained" color={"primary"} className={props.className} >{props.title}
            </Button>
    )
};
