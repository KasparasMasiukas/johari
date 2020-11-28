import React, { Dispatch, SetStateAction, useState } from 'react';

interface Form {
  name: string,
  gender: 'male' | 'female',
  traits: number[]
}

const initState: Form = {
  name: '',
  gender: 'female',
  traits: [],
};

const FormContext = React.createContext<[Form, Dispatch<SetStateAction<Form>>]>(
  [initState, () => initState],
);

const FormProvider: React.FC = (props) => {
  const [state, setState] = useState(initState);
  return (
    <FormContext.Provider value={[state, setState]}>
      {/* eslint-disable-next-line react/prop-types,react/destructuring-assignment */}
      {props.children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
