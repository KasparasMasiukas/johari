import random from 'random-string-generator';
import firebase from './firebase';
import { User, Response } from '../context/types';

export const db = firebase.firestore();

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

export const usersCollection = db.collection('users').withConverter(userConverter);

const responseConverter: firebase.firestore.FirestoreDataConverter<Response> = {
  toFirestore(modelObject: Response): firebase.firestore.DocumentData {
    return { ...modelObject };
  },

  fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions):
    Response {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,
      recipientId: data.recipientId,
      time: data.time,
      traits: data.traits,
    };
  },
};

export const responsesCollection = db.collection('responses').withConverter(responseConverter);

export const genId = () => random(6, 'lowernumeric');

export const addNewUser = (form: User) => {
  const id = genId();
  return usersCollection.doc(id).set({ ...form });
};

export const getUser = (id: string) => usersCollection.doc(id).get();
