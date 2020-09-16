import React from 'react';
import {NavBar} from "../components/navigation/nav-bar";
import {LastEvent} from "../components/events/last-event";
import {LastMonth} from "../components/events/last-month";
import {PageNavigation} from "../components/navigation/page-navigation";

export const HomePage = () => {
    return (
        <div>
            <div>
                <NavBar title={"Dashboard"}/>
            </div>
            <div>
                <LastEvent/>
                <LastMonth/>
            </div>
            <PageNavigation/>
        </div>
    )
}
