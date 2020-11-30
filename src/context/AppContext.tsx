import React, { useReducer } from 'react';
import {
  FormActions, formReducer, ResponseActions, responseReducer,
} from './reducers';
import { ResponsesType, User } from './types';

interface AppState {
  form: User,
  responses: ResponsesType
}

const initState: AppState = {
  form: {
    name: '',
    gender: 'female',
    traits: [],
  },
  responses: {
    responses: [],
  },
};

const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<FormActions | ResponseActions>;
}>({
  state: initState,
  dispatch: () => null,
});

const mainReducer = ({ form, responses }: AppState, action: FormActions | ResponseActions) => ({
  form: formReducer(form, action),
  responses: responseReducer(responses, action),
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
