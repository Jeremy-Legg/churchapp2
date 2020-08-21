import React from "react";
import {SSDialog} from "../single-string-dialog";
import {useHistory} from "react-router-dom";

export type GetEventNameProps = {
    open: boolean,
    setOpen: (flag: boolean) => void
}

export const GetEventName = (props: GetEventNameProps) => {
    let history = useHistory();
    const handleOk = (eventName: string) => {
        history.push(`/event/${eventName}`)
    };
    return (
        <SSDialog title={"Create A New Event"}
                  label={"Event Name"}
                  open={props.open}
                  cancel={() => props.setOpen(false)}
                  ok={handleOk}
        />
    )
};

