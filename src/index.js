import React from 'react';
import ReactDOM from 'react-dom';
import firebase from '@firebase/app';
import '@firebase/firestore';
import {FirestoreProvider } from 'react-firestore';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const config = {
    apiKey: "AIzaSyBOsjQqoNjd1M2nLK7vAmZoyUlh9eY3VQk",
    projectId: "tcl-7-smart-shopping-list",
};

firebase.initializeApp(config);

ReactDOM.render(<FirestoreProvider firebase={firebase}><App /></FirestoreProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
