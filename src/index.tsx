import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {users, db, responses} from './services/db';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

users.get().then(q => q.docs.forEach(d => console.log(d.data())));
db.collection('responses').get().then(q => q.docs.forEach(d => console.log(d.data())));
responses.get().then(q => q.docs.forEach(d => console.log(d.data())));