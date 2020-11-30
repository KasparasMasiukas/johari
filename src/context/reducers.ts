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
  SetUserProfileWithoutTraits = 'SET_USER_PROFILE_WITHOUT_TRAITS',
  AddResponses = 'ADD_RESPONSES',
  ChangeResponderName = 'CHANGE_RESPONDER_NAME'
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
  };
  [ActionTypes.SetUserProfileWithoutTraits]: {
    user: User
  }
}

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

type ResponsePayload = {
  [ActionTypes.AddResponses]: {
    newResponses: Response[]
  };
  [ActionTypes.ChangeResponderName]: {
    name: string
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
    case ActionTypes.SetUserProfileWithoutTraits:
      return {
        ...state, name: action.payload.user.name, gender: action.payload.user.gender, traits: [],
      };
    default:
      return state;
  }
};

export const responseReducer = (state: ResponsesType, action: FormActions | ResponseActions) => {
  switch (action.type) {
    case ActionTypes.AddResponses:
      return { ...state, responses: _.unionBy(action.payload.newResponses, state.responses, 'id') };
    case ActionTypes.ChangeResponderName:
      return { ...state, name: action.payload.name };
    default:
      return state;
  }
};
