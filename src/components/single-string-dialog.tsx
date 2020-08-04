import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import React, {useState} from "react";

export type SSDialogProps = {
    title: string;
    label: string;
    open: boolean;
    ok?: (userValue: string) => void;
    cancel?: () => void;
}

export const SSDialog = (props: SSDialogProps) => {
    const [userValue, setUserValue] = useState("");

    return (
        <Dialog open={props.open} onClose={props?.cancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={props.label}
                    onChange={(e) => {
                        setUserValue(e.target.value)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            if (props.ok !== undefined) {
                                props.ok(userValue)
                            }
                        }
                    }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props?.cancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    if(props.ok !== undefined) {
                        props.ok(userValue);
                    }
                }} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    )
};
