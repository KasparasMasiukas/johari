import React, { useContext, useState } from 'react';
import '../styles/TraitsGrid.scss';
import {
  Card, CardContent, GridList, GridListTile, Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { AppContext } from '../context/AppContext';
import { ActionTypes } from '../context/reducers';
import getTraits from '../services/traits';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';

interface Props {

}

const TraitsGrid: React.FC<Props> = (() => {
  const [openError, setOpenError] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { traits } = state.form;

  const tileOnClickListener = (id: number) => {
    if (traits.includes(id)) dispatch({ type: ActionTypes.RemoveTrait, payload: { trait: id } });
    else if (traits.length >= MAX_SELECTIONS) setOpenError(true);
    else dispatch({ type: ActionTypes.AddTrait, payload: { trait: id } });
  };

  const makeTraitTile = (trait: string, id: number) => (
    <GridListTile key={id} onClick={() => tileOnClickListener(id)}>
      <Card raised={false} className={`trait-tile${traits.includes(id) ? ' active' : ''}`}>
        <CardContent>
          <Typography variant="h5">{trait}</Typography>
        </CardContent>
      </Card>
    </GridListTile>
  );

  const handleErrorClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
  };

  return (
    <Paper elevation={3} className="traits-paper">
      <Typography variant="h5">
        Aš esu... (pasirinkite nuo {MIN_SELECTIONS} iki {MAX_SELECTIONS} savybių)
      </Typography>
      <GridList cellHeight="auto" spacing={1} cols={0} className="traits-grid">
        {getTraits('male').map(makeTraitTile)}
      </GridList>
      <Snackbar open={openError} autoHideDuration={6000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          Prašome pasirinkti ne daugiau nei {MAX_SELECTIONS} savybių
        </Alert>
      </Snackbar>
    </Paper>
  );
});

export default TraitsGrid;
