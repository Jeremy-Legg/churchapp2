import React from 'react';
import './App.css';
import {HomePage} from "./components/homepage";
import {SetupTags} from "./components/setup/setup-tags";
import {SetUpPage} from "./pages/setup";

function App() {
    return (
        <div className="App">
            {/*<HomePage/>*/}
            <SetUpPage/>

        </div>
    );
}

export default App;
