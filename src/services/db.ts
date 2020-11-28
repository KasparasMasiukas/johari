import random from 'random-string-generator';
import firebase from './firebase';
import { Form } from '../context/types';

export const db = firebase.firestore();

interface User {
    name: string;
    gender: 'male' | 'female';
    traits: number[];
}

const userConverter: firebase.firestore.FirestoreDataConverter<User> = {
  toFirestore(modelObject: User): firebase.firestore.DocumentData {
    return { ...modelObject };
  },

  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): User {
    const data = snapshot.data(options)!;
    return {
      name: data.name,
      gender: data.gender,
      traits: data.traits,
    };
  },
};

export const users = db.collection('users').withConverter(userConverter);

interface Response {
    recipientId: string,
    time: firebase.firestore.Timestamp,
    traits: number[]
}

const responseConverter: firebase.firestore.FirestoreDataConverter<Response> = {
  toFirestore(modelObject: Response): firebase.firestore.DocumentData {
    return { ...modelObject };
  },

  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions):
    Response {
    const data = snapshot.data(options);
    return {
      recipientId: data.recipientId,
      time: data.time,
      traits: data.traits,
    };
  },
};

export const responses = db.collection('responses').withConverter(responseConverter);

export const genId = () => random(6, 'lowernumeric');

export const addNewUser = (form: Form) => {
  const id = genId();
  return users.doc(id).set({ ...form });
};
