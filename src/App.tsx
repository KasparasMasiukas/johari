import React from 'react';
import './App.scss';
import TitleBar from "./components/TitleBar";
import TraitsGrid from "./components/TraitsGrid";
import {Container} from "@material-ui/core";

function App() {
    return (
        <div className="container">
            <TitleBar/>
            <Container maxWidth="lg" className="main-container">
                <TraitsGrid/>
            </Container>
        </div>
    );
}

export default App;
