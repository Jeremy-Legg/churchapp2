import React, {useState} from "react";
import {Avatar, Button, createStyles, List, ListItem, ListItemAvatar, ListItemText, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {SSDialog} from "../single-string-dialog";
import {useStickyState} from "../../hooks/sticky";
import {IPerson, Person} from "../../model/IPerson";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);


export const SetupPeople = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const generator = (allOfThem: any[]) => {
        let allPeople = Array.from(allOfThem);
        console.log(`All people to be generated: ${JSON.stringify(allPeople)}`);
        return allPeople.map(t => Object.assign(new Person(""), t));
    };

    const [people, setPeople] = useStickyState<IPerson[]>("People", [], generator);
    console.warn(`Our saved people: ${JSON.stringify(people)}`);
    const addNewPerson = (person: string) => {
        if (person === "") {
            console.log("Person is undefined");
            return;
        }
        let newPerson = new Person(person);
        console.warn(`Adding a new person: ${JSON.stringify(newPerson)}`)
        let newPeople = [...people, newPerson];
        console.warn(`All the things: ${JSON.stringify(newPeople)}`)
        setPeople(newPeople);
        setOpen(false);
    };
    const handleOpen = () => setOpen(true);

    return (<div>

        <h1>People</h1>
        <List className={classes.root}>
            {
                people.map((person, index) => {
                    return (
                        <ListItem key={index}>
                            <ListItemAvatar>
                                <Avatar>{person.firstLetter()}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={person.name} secondary={person.id}/>
                        </ListItem>
                    )
                })
            }

        </List>
        <Button onClick={() => handleOpen()}>Add Person <AddCircleIcon/> </Button>

        <SSDialog title="Add New Person"
                  label="Person Name"
                  open={open}
                  cancel={() => setOpen(false)}
                  ok={(person) => addNewPerson(person)}/>


    </div>)

};
