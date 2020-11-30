import firebase from '../services/firebase';

export interface User {
  name: string,
  gender: Gender,
  traits: number[]
}

export type FormType = {
  name: string,
  gender: Gender,
  traits: number[]
}

export interface Response {
  id: string,
  recipientId: string,
  time: firebase.firestore.Timestamp,
  traits: number[]
}

export type ResponsesType = {
  responses: Response[];
}

export type Gender = 'male' | 'female'

export interface Trait {
  id: number,
  name: string
}
