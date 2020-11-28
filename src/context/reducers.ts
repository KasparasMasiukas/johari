import { FormType, Gender } from './types';

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
}

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export const formReducer = (state: FormType, action: FormActions) => {
  switch (action.type) {
    case ActionTypes.ChangeName:
      return { ...state, name: action.payload.name };
    case ActionTypes.ChangeGender:
      return { ...state, gender: action.payload.gender };
    case ActionTypes.AddTrait:
      return { ...state, traits: state.traits.concat([action.payload.trait]) };
    case ActionTypes.RemoveTrait:
      return { ...state, traits: state.traits.filter((id) => id !== action.payload.trait) };
    default:
      return state;
  }
};
