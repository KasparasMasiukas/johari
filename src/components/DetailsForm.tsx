import React, { useContext } from 'react';
import '../styles/DetailsForm.scss';
import {
  createStyles, makeStyles, Paper, Theme, Typography,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { AppContext } from '../context/AppContext';
import { ActionTypes } from '../context/reducers';

interface Props {

}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: '25ch',
    },
  },
}));

const DetailsForm: React.FC<Props> = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  const { name, gender } = state.form;

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newGender = (event.target as HTMLInputElement).value as 'male' | 'female';
    dispatch({
      type: ActionTypes.ChangeGender,
      payload: {
        gender: newGender,
      },
    });
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = (event.target as HTMLInputElement).value;
    dispatch({
      type: ActionTypes.ChangeName,
      payload: {
        name: newName,
      },
    });
  };

  console.log(`Name: ${name}, Gender: ${gender}`);

  return (
    <Paper elevation={3} className="details-paper">
      <Typography variant="h5">Kas Jūs?</Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required label="Vardas" value={name} onChange={handleNameChange} />
        <FormControl component="fieldset">
          <FormLabel component="legend">Lytis</FormLabel>
          <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={handleGenderChange}>
            <FormControlLabel value="female" control={<Radio />} label="Moteris" />
            <FormControlLabel value="male" control={<Radio />} label="Vyras" />
          </RadioGroup>
        </FormControl>
      </form>
    </Paper>
  );
};

export default DetailsForm;
