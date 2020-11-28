import React, { useReducer } from 'react';
import { FormActions, formReducer } from './reducers';
import { Form } from './types';

interface AppState {
  form: Form
}

const initState: AppState = {
  form: {
    name: '',
    gender: 'female',
    traits: [],
  },
};

const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<FormActions>;
}>({
  state: initState,
  dispatch: () => null,
});

const mainReducer = ({ form }: AppState, action: FormActions) => ({
  form: formReducer(form, action),
});

const ContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(mainReducer, initState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {/* eslint-disable-next-line react/prop-types,react/destructuring-assignment */}
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, ContextProvider };
