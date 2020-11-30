import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import DetailsForm from './DetailsForm';
import TraitsGrid from './TraitsGrid';
import FinishButton from './FinishButton';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';

const SelfForm: React.FC = () => {
  const match = useRouteMatch();
  console.log(match.params);
  return (
    <div>
      <DetailsForm />
      <TraitsGrid title={`Aš esu... (pasirinkite nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių)`} selectable />
      <FinishButton forSelf />
    </div>
  );
};

export default SelfForm;
