import React from 'react';
import './App.css';
import {HomePage} from "./components/homepage";
import {SetupTags} from "./components/setup/setup-tags";

function App() {
    return (
        <div className="App">
            {/*<HomePage/>*/}
            <SetupTags/>
        </div>
    );
}

export default App;
