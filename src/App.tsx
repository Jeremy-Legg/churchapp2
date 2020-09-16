import React from 'react';
import './App.css';
import {HomePage} from "./pages/homepage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {SetUpPage} from "./pages/setup";
import {EventEditorPage} from "./pages/new-event";
import {Reporting} from "./pages/reporting";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path={"/setup"}><SetUpPage/></Route>
                    <Route path={"/reports"}><Reporting/></Route>
                    {/*<Route path={"/newEvent"}><EventEditorPage/></Route>*/}
                    <Route path={"/event/:eventName"}><EventEditorPage/></Route>
                    <Route path={"/"}><HomePage/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
