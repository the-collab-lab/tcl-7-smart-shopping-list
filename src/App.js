import React from 'react';
import './App.css';

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
