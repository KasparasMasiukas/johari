import React from 'react';
import './styles/App.scss';
import { Container } from '@material-ui/core';
import TitleBar from './components/TitleBar';
import TraitsGrid from './components/TraitsGrid';
import DetailsForm from './components/DetailsForm';
import { ContextProvider } from './context/AppContext';
import FinishButton from './components/FinishButton';

function App() {
  return (
    <ContextProvider>
      <div className="container">
        <TitleBar />
        <Container maxWidth="lg" className="main-container">
          <DetailsForm />
          <TraitsGrid />
          <FinishButton forSelf />
        </Container>
      </div>
    </ContextProvider>
  );
}

export default App;
