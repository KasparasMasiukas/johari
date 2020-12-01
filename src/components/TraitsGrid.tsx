import React, { useContext, useState } from 'react';
import '../styles/TraitsGrid.scss';
import {
  Card, CardContent, GridList, GridListTile, Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import { AppContext } from '../context/AppContext';
import { ActionTypes } from '../context/reducers';
import getTraits from '../services/traits';
import { MAX_SELECTIONS } from '../context/globals';
import { Trait, TraitsPeople } from '../context/types';

interface Props {
  title: string;
  traitIds?: number[], // if not supplied, show all
  selectable?: boolean,
  activeTraits?: number[],
  traitsPeople?: TraitsPeople
}

const TraitsGrid: React.FC<Props> = (({
  title, traitIds, selectable, activeTraits, traitsPeople,
}) => {
  const [openError, setOpenError] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const { traits, gender } = state.form;

  const tileOnClickListener = (id: number) => {
    if (!selectable) return;
    if (traits.includes(id)) dispatch({ type: ActionTypes.RemoveTrait, payload: { trait: id } });
    else if (traits.length >= MAX_SELECTIONS) setOpenError(true);
    else dispatch({ type: ActionTypes.AddTrait, payload: { trait: id } });
  };

  const isTileActive = (i: number) => (!traitIds && traits.includes(i)) || (activeTraits && activeTraits.includes(i));

  const makeTooltipTitle = (names: string[]) => (!names || names.length === 0 ? '' : (
    <div>
      {names.map((n, i) => (<div>{n}{i < names.length - 1 && <br />}</div>))}
    </div>
  ));

  const makeTraitTile = (trait: Trait) => (
    <GridListTile key={trait.id} onClick={() => tileOnClickListener(trait.id)}>
      <Tooltip title={makeTooltipTitle(traitsPeople ? traitsPeople[trait.id] : [])}>
        <Card raised className={`trait-tile${isTileActive(trait.id) ? ' active' : ''}`}>
          <CardContent>
            <Typography variant="h6">{trait.name}</Typography>
          </CardContent>
        </Card>
      </Tooltip>
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
        {title}
      </Typography>
      <GridList cellHeight="auto" spacing={1} cols={0} className="traits-grid">
        {getTraits(gender).filter((g, i) => !traitIds || traitIds.includes(i)).map(makeTraitTile)}
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
