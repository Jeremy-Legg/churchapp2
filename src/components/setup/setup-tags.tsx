import React, {useState} from "react";
import {
    Avatar,
    Button,
    Chip,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Theme
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from "@material-ui/core/styles";
import {useStickyState} from "../../hooks/sticky";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    }),
);

export const SetupTags = () => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [newTagName, setNewTagName] = useState("");
    const [tags, setTags] = useStickyState<string[]>("NightTags", []);

    // console.warn(`Our tags are: ${JSON.stringify(tags)}`);

    const handleClose = (addTag: boolean) => {
        if (addTag) {
            if (newTagName === undefined) {
                console.error("No tag was defined. Skipping.");
                return;
            }
            let newTags = [...tags, newTagName];
            setTags(newTags);
            setNewTagName("");
        }
        setOpen(false);
    };
    const handleOpen = () => setOpen(true);

    const deleteTag = (tagToRemove: string) => {
        let newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
    };

    return (
        <div>
            <h1>Night Tags</h1>
            <div className={classes.root}>
                {
                    tags.map((tag, index) => {
                        return (
                            <Chip key={index} avatar={<Avatar>{tag[0].toUpperCase()}</Avatar>} label={tag}
                                  onClick={() => {
                                  }} onDelete={() => deleteTag(tag)}/>
                        )
                    })
                }

            </div>
            <Button onClick={() => handleOpen()}>Add Tag <AddCircleIcon/> </Button>

            <Dialog open={open} onClose={() => handleClose(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Tag Name</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tag Name"
                        onChange={(e) => {
                            setNewTagName(e.target.value)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") handleClose(true)
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose(true)} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
};
