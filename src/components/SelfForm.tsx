import React from 'react';
import DetailsForm from './DetailsForm';
import TraitsGrid from './TraitsGrid';
import FinishButton from './FinishButton';
import { MAX_SELECTIONS, MIN_SELECTIONS } from '../context/globals';

const SelfForm: React.FC = () => (
  <div>
    <DetailsForm />
    <TraitsGrid title={`Aš esu... (pasirinkite nuo ${MIN_SELECTIONS} iki ${MAX_SELECTIONS} savybių)`} selectable />
    <FinishButton recipientId="" />
  </div>
);

export default SelfForm;
