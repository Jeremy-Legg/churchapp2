import React, {useState} from "react";
import {Avatar, Button, Chip, createStyles, Theme} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from "@material-ui/core/styles";
import {SSDialog} from "../single-string-dialog";
import {useTags} from "../../hooks/our-state";

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
    const [tags, setTags] = useTags();

    const handleClose = () => setOpen(false);
    const addNewTag = (newTagName: string) => {
        if (newTagName === undefined) {
            console.error("No tag was defined. Skipping.");
            return;
        }
        let newTags = [...tags, newTagName];
        setTags(newTags);
        setOpen(false);
        // setNewTagName("");
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

            <SSDialog title="New Tag Name"
                      label="Tag Name"
                      open={open}
                      cancel={handleClose}
                      ok={(tag) => addNewTag(tag)}/>

        </div>
    )
};
