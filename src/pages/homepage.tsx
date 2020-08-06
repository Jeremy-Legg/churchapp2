import React from 'react';
import {OurNavButton} from "../components/nav-button";
import {NewEventButton} from "../components/events/new-event";
import {useHistory} from "react-router";

export const HomePage = () => {

    let history = useHistory();
    const handleNavigation = (destination : string) => {
            history.push(`/${destination}`);
    }

    return (
        <div>
            <main role="main">

                <div className="jumbotron">
                    <div className="container">
                        <h1 className="display-3">App Name</h1>
                        <p>Here is some text about what the app is</p>
                        <NewEventButton/>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <h2>Reporting</h2>
                            <p>This is where you can view your reports. Reports are either based on a person, particular
                                night, or selected period of nights </p>
                            <OurNavButton  title={"Reporting"}/>
                        </div>
                        <div className="col-md-4">
                            <h2>Setup</h2>
                            <p>This is where you handle the management of the app. You can add/remove people + whatever
                                else
                                i think of </p>
                            <OurNavButton onClick={() => handleNavigation("setup")} title={"Setup"}/>

                        </div>
                        <div className="col-md-4">
                            <h2>Options</h2>
                            <p>Here are some options for how you would prefer the app to be. This is a future idea for
                                things like dark mode + other stuff</p>
                            <OurNavButton title={"Options"}/>
                        </div>
                    </div>
                    <hr/>
                </div>
            </main>
        </div>
    )
}
