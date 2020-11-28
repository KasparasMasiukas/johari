import React from 'react';
import './styles/App.scss';
import { Container } from '@material-ui/core';
import TitleBar from './components/TitleBar';
import TraitsGrid from './components/TraitsGrid';
import DetailsForm from './components/DetailsForm';
import { FormProvider } from './context/FormContext';

function App() {
  return (
    <FormProvider>
      <div className="container">
        <TitleBar />
        <Container maxWidth="lg" className="main-container">
          <DetailsForm />
          <TraitsGrid />
        </Container>
      </div>
    </FormProvider>
  );
}

export default App;
