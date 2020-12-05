import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'fontsource-roboto';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#303f46',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// users.get().then((q) => q.docs.forEach((d) => console.log(d.data())));
// db.collection('responses').get().then((q) => q.docs.forEach((d) => console.log(d.data())));
// responses.get().then((q) => q.docs.forEach((d) => console.log(d.data())));
