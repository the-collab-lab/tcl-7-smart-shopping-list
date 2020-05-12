import React from 'react';
import './App.css';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Switch>
            <Route path="/list-view">
              <Listview />
            </Route>
            <Route path="/add-item">
              <ItemForm />
            </Route>
          </Switch>
        </main>
        <footer>
          <nav>
            <NavLink to="/list-view">
              <img src="/img/list.svg" alt="view list" />
            </NavLink>
            <NavLink to="/add-item">
              <img src="/img/add.svg" alt="add item" />
            </NavLink>
          </nav>
        </footer>
      </Router>
    </div>
  );
}

function Listview() {
  return <GetList />;
}

function ItemForm() {
  return (
    <div>
      <h2>This is where you'd add an item!</h2>
      <AddItem />
    </div>
  );
}

export default App;
