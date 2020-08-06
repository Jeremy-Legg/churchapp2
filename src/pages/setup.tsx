import React from 'react';
import {SetupTags} from "../components/setup/setup-tags";
import {SetupPeople} from "../components/setup/setup-people";
import {NavBar} from "../components/navigation/nav-bar";

export const SetUpPage = () => {
    return (
        <>
            <NavBar title={"Setup"}/>
            <SetupTags/>
            <SetupPeople/>
        </>
    )
};


