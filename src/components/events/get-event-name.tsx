import React from "react";
import {SSDialog} from "../single-string-dialog";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../state/store";
import uiSlice from "../../state/ui-state";

export const GetEventName = () => {
    let history = useHistory();
    let uiState = useSelector((state: RootState) => state.ui);
    let dispatch = useAppDispatch();

    const handleOk = (eventName: string) => {
        history.push(`/event/${eventName}`)
    };

    return (
        <SSDialog title={"Create A New Event"}
                  label={"Event Name"}
                  open={uiState.createEventDialogOpen}
                  cancel={() => {
                      dispatch(uiSlice.actions.closeDialog())
                  }}
                  ok={handleOk}
        />
    )
};

