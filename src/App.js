import React from 'react';
import './App.css';
import { hasLocalToken, setLocalToken, getLocalToken } from './lib/token.js';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import { render } from 'react-dom';

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
            <Route path="/">
              <Landing />
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

class Landing extends React.Component {
  render() {
    if (hasLocalToken()) {
      return <GetList />;
    } else {
      return <SignIn />;
    }
  }
}

function SignIn() {
  // uses setLocalToken to set token to local storage when button is clicked
  return (
    <div>
      <h1>Welcome to your smart shopping list!</h1>
      <p>Tap “Create shopping list” to get started.</p>
      <a href="./add-item">
        <button onClick={setLocalToken}>Create shopping list</button>
      </a>
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
