import React, {useState} from 'react';
import '../styles/DetailsForm.scss';
import {createStyles, makeStyles, Paper, Theme, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

interface Props {

}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(5),
                width: '25ch',
            },
        },
    }),
);

const DetailsForm: React.FC<Props> = () => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('female');

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender((event.target as HTMLInputElement).value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName((event.target as HTMLInputElement).value);
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
    )
};

export default DetailsForm;