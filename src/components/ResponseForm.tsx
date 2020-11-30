import React, { useContext, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import TraitsGrid from './TraitsGrid';
import { AppContext } from '../context/AppContext';
import { getUser } from '../services/db';
import { ActionTypes } from '../context/reducers';
import { User } from '../context/types';
import DetailsForm from './DetailsForm';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';
import FinishButton from './FinishButton';

interface Params {
  id: string;
}

const ResponseForm: React.FC = () => {
  const { id } = useParams<Params>();
  const [invalidUser, setInvalidUser] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    getUser(id).then((d) => {
      if (!d.data()) setInvalidUser(true);
      else dispatch({ type: ActionTypes.SetUserProfileWithoutTraits, payload: { user: d.data() as User } });
    }).catch(() => {
      setInvalidUser(true);
    });
  }, [id, dispatch]);
  return (
    <div>
      <DetailsForm responder />
      <TraitsGrid selectable title={`Aš manau, kad ${state.form.name} yra... (pasirinkite nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių)`} />
      <FinishButton recipientId={id} />
      {invalidUser && <Redirect to="/" />}
    </div>
  );
};

export default ResponseForm;
