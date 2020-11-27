import React from 'react';
import './styles/App.scss';
import TitleBar from "./components/TitleBar";
import TraitsGrid from "./components/TraitsGrid";
import {Container} from "@material-ui/core";
import DetailsForm from "./components/DetailsForm";

function App() {
    return (
        <div className="container">
            <TitleBar/>
            <Container maxWidth="lg" className="main-container">
                <DetailsForm/>
                <TraitsGrid/>
            </Container>
        </div>
    );
}

export default App;
