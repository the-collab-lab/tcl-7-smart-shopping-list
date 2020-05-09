import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FirestoreDocument } from 'react-firestore';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';

function App() {
  return (
    <div className="App">
      <GetList />
      <AddItem />
    </div>
  );
}

export default App;
