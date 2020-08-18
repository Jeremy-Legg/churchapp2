import React, {useState} from "react";
import {
    Avatar,
    Button,
    createStyles, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText, Switch,
    Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import {SSDialog} from "../single-string-dialog";
import {useStickyState} from "../../hooks/sticky";
import {IPerson, Person} from "../../model/IPerson";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {usePeopleState} from "../../hooks/data-state";

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
    const [people, setPeople] = usePeopleState();

    const addNewPerson = (person: string) => {
        if (person === "") {
            console.log("Person is undefined");
            return;
        }
        let newPerson = new Person(person);
        let newPeople = [...people, newPerson];
        setPeople(newPeople);
        setOpen(false);
    };
    const handleOpen = () => setOpen(true);

    const deletePerson = (personToDelete: IPerson) => {
        setPeople(people.filter(person => person.id !== personToDelete.id))
    };

    const toggleRegularPerson = (person:IPerson) => {
        person.toggleRegular();
        setPeople(people);
    };

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
                            {/*<ListItemText primary={person.name} secondary={person.id}/>*/}
                            <Switch
                                checked={person.regular}
                                onChange={() => toggleRegularPerson(person)}
                                color="primary"
                                name="checkedB"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                            <ListItemText primary={person.name}/>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => deletePerson(person)} edge="end" aria-label="delete">
                                    <DeleteForeverIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>

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
