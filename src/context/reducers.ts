import _ from 'lodash';
import {
  FormType, Gender, Response, ResponsesType, User,
} from './types';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
      type: Key;
    }
    : {
      type: Key;
      payload: M[Key];
    }
};

export enum ActionTypes {
  ChangeName = 'CHANGE_NAME',
  ChangeGender = 'CHANGE_GENDER',
  AddTrait = 'ADD_TRAIT',
  RemoveTrait = 'REMOVE_TRAIT',
  SetUserProfile = 'SET_USER_PROFILE',
  AddResponses = 'ADD_RESPONSES'
}

type FormPayload = {
  [ActionTypes.ChangeName]: {
    name: string;
  };
  [ActionTypes.ChangeGender]: {
    gender: Gender
  };
  [ActionTypes.AddTrait]: {
    trait: number
  };
  [ActionTypes.RemoveTrait]: {
    trait: number
  };
  [ActionTypes.SetUserProfile]: {
    user: User
  }
}

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

type ResponsePayload = {
  [ActionTypes.AddResponses]: {
    newResponses: Response[]
  }
}

export type ResponseActions = ActionMap<ResponsePayload>[keyof ActionMap<ResponsePayload>];

export const formReducer = (state: FormType, action: FormActions | ResponseActions) => {
  switch (action.type) {
    case ActionTypes.ChangeName:
      return { ...state, name: action.payload.name };
    case ActionTypes.ChangeGender:
      return { ...state, gender: action.payload.gender };
    case ActionTypes.AddTrait:
      return { ...state, traits: state.traits.concat([action.payload.trait]) };
    case ActionTypes.RemoveTrait:
      return { ...state, traits: state.traits.filter((id) => id !== action.payload.trait) };
    case ActionTypes.SetUserProfile:
      return { ...state, ...action.payload.user };
    default:
      return state;
  }
};

export const responseReducer = (state: ResponsesType, action: FormActions | ResponseActions) => {
  switch (action.type) {
    case ActionTypes.AddResponses:
      return { ...state, responses: _.unionBy(action.payload.newResponses, state.responses, 'id') };
    default:
      return state;
  }
};
