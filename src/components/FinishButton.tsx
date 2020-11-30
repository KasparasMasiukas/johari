import React, { useContext, useState } from 'react';
import '../styles/FinishButton.scss';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { AppContext } from '../context/AppContext';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';
import { addNewUser } from '../services/db';

interface Props {
  forSelf: boolean;
}

const FinishButton: React.FC<Props> = (props) => {
  const { state } = useContext(AppContext);
  const [error, setError] = useState('');
  const { form } = state;
  const validateInputs = () => {
    if (!form.name) return 'Prašome įvesti vardą';
    if (form.traits.length < MIN_SELECTIONS || form.traits.length > MAX_SELECTIONS) return `Prašome pasirinkti nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių`;
    return null;
  };

  const handleClick = () => {
    // console.log('Save clicked');
    const err = validateInputs();
    if (err) setError(err);
    else if (props.forSelf) { // submit for self (new user)
      addNewUser(form);
    } else { // submit for other (new response)

    }
  };

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  return (
    <div>
      <Button variant="contained" startIcon={<SaveIcon />} onClick={handleClick} color="primary" size="large">Baigti</Button>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FinishButton;
