import React from 'react';
import './styles/App.scss';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import TitleBar from './components/TitleBar';
import { ContextProvider } from './context/AppContext';
import SelfForm from './components/SelfForm';
import Results from './components/Results';

function App() {
  return (
    <ContextProvider>
      <div className="container">
        <TitleBar />
        <Container maxWidth="lg" className="main-container">
          <Switch>
            <Route path="/:id/results">
              <Results />
            </Route>
            <Route path="/:id">
              <Typography variant="h4">Čia bus atsakymų suvedimas...</Typography>
            </Route>
            <Route path="/">
              <SelfForm />
            </Route>
          </Switch>
        </Container>
      </div>
    </ContextProvider>
  );
}

export default App;
