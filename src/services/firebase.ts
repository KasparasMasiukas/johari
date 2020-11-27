import firebase from "firebase/app";
import 'firebase/analytics';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBwIzs8W_w_B_8bvRbelINa9GeqzumRh5k",
    authDomain: "johari-4bf80.firebaseapp.com",
    databaseURL: "https://johari-4bf80.firebaseio.com",
    projectId: "johari-4bf80",
    storageBucket: "johari-4bf80.appspot.com",
    messagingSenderId: "222677240548",
    appId: "1:222677240548:web:22bb4536266ef7db523af1",
    measurementId: "G-SFHNN5Z6LD"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
