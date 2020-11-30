import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/FinishButton.scss';
import { Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { AppContext } from '../context/AppContext';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';
import { addNewResponse, addNewUser } from '../services/db';

interface Props {
  recipientId: string;
}

const FinishButton: React.FC<Props> = ({ recipientId }) => {
  const forSelf = !recipientId; // the form is for self if recipient is not supplied
  const { state } = useContext(AppContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newUserId, setNewUserId] = useState('');
  const { form, responses } = state;
  const validateInputs = () => {
    if ((forSelf && !form.name) || (!forSelf && !responses.name)) return 'Prašome įvesti vardą';
    if (form.traits.length < MIN_SELECTIONS || form.traits.length > MAX_SELECTIONS) return `Prašome pasirinkti nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių`;
    return null;
  };

  const handleClick = () => {
    // console.log('Save clicked');
    const err = validateInputs();
    if (err) setError(err);
    else if (forSelf) { // submit for self (new user)
      addNewUser(form).then((d) => {
        setNewUserId(d.id);
      }).catch((err) => {
        console.log(err);
        setError('Kažkas nutiko... prašome pabandyti dar kartą');
      });
    } else { // submit for other (new response)
      addNewResponse(state, recipientId).then(() => {
        setSuccess(true);
      }).catch((err) => {
        console.log(err);
        setError('Kažkas nutiko... prašome pabandyti dar kartą');
      });
    }
  };

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setError('');
  };

  const handleSuccessClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<SaveIcon />} onClick={handleClick} color="primary" size="large">Baigti</Button>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={success} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success">
          Ačiū, kad pildėte! Jūsų atsakymus {form.name} matys savo rezultatų puslapyje.
        </Alert>
      </Snackbar>
      {!!newUserId && <Redirect to={`/${newUserId}/results`} />}
    </div>
  );
};

export default FinishButton;
