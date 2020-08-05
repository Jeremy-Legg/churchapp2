import React from 'react';
import './App.css';
import {HomePage} from "./components/homepage";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {SetUpPage} from "./pages/setup";
import {NewEventPage} from "./pages/new-event";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path={"/setup"}><SetUpPage/></Route>
                    <Route path="/event/:eventName"><NewEventPage/></Route>
                    <Route path="/"><HomePage/></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
