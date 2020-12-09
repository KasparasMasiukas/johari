import React from 'react';
import '../styles/SelfForm.scss';
import { Paper, Typography } from '@material-ui/core';
import DetailsForm from './DetailsForm';
import TraitsGrid from './TraitsGrid';
import FinishButton from './FinishButton';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';

const SelfForm: React.FC = () => (
  <div>
    <Paper elevation={3} className="content-paper instructions-paper">
      <div className="instructions-container">
        <Typography style={{ marginBottom: 10 }} variant="h3">Savęs vertinimas</Typography>
        <Typography className="justify" variant="body1">Atlikite savęs vertinimo testą. Gavus nuorodą nusiųskite savo draugams, kurių nuomonę apie save norėtumėte išgirsti ir sužinokite, kurios Jūsų savybės yra matomos kitiems, o kurios nežinomos. Nemokamai. Be jokios registracijos.
        </Typography>
      </div>
    </Paper>
    <DetailsForm />
    <TraitsGrid title={`Aš esu... (pasirinkite nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių)`} selectable />
    <FinishButton recipientId="" />
  </div>
);

export default SelfForm;
