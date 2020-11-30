import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useRouteMatch, Redirect } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { AppContext } from '../context/AppContext';
import TraitsGrid from './TraitsGrid';
import { getUser, responsesCollection } from '../services/db';
import { ActionTypes } from '../context/reducers';
import { Response, User } from '../context/types';

interface Params {
  id: string;
}

const Results: React.FC = () => {
  const match = useRouteMatch<Params>();
  const [invalidUser, setInvalidUser] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const userId = match.params.id;
  useEffect(() => {
    getUser(userId).then((d) => {
      console.log('Got user:');
      console.log(d.data());
      if (!d.data()) setInvalidUser(true);
      else dispatch({ type: ActionTypes.SetUserProfile, payload: { user: d.data() as User } });
    }).catch(() => {
      setInvalidUser(true);
    });
    responsesCollection.where('recipientId', '==', userId).onSnapshot((querySnapshot) => {
      const newResponses: Response[] = querySnapshot.docs.map((d) => d.data());
      console.log('Got new responses:');
      console.log(newResponses);
      dispatch({ type: ActionTypes.AddResponses, payload: { newResponses } });
    }, () => window.location.reload());
  }, [userId, dispatch]);
  const shareUrl = window.location.href.replace('/results', '');
  const traitsFromResponses = _.uniq(state.responses.responses.flatMap((r) => r.traits));
  const overlappingTraits = _.intersection(state.form.traits, traitsFromResponses);
  const responsesTitle = state.responses.responses.length === 0 ? 'Laukiama atsakymų...' : `${state.responses.responses.length} iš mano draugų mano, kad esu...`;
  return (
    <div>
      <Typography variant="h3">Rezultatai</Typography>
      <Typography variant="h4">Pasidalinkite šia nuoroda su draugais:</Typography>
      <a target="_blank" rel="noreferrer" href={shareUrl}>{shareUrl}</a>
      <TraitsGrid title="Aš manau, kad esu..." traitIds={state.form.traits} activeTraits={overlappingTraits} />
      <TraitsGrid title={responsesTitle} traitIds={traitsFromResponses} activeTraits={overlappingTraits} />
      { invalidUser && <Redirect to="/" />}
    </div>
  );
};

export default Results;
