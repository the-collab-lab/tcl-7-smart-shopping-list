import React from 'react';
import './App.css';
import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';
import getToken from './lib/token.js';
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
            <Route path="/">
              <SignIn />
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
  const token = getToken();
  const myStorage = window.localStorage;
  myStorage.setItem('token', token);
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

class SignIn extends React.Component {
  storeTokenOnClient = () => {
    const myStorage = window.localStorage;
    myStorage.setItem('token', getToken());
  };

  render() {
    return (
      <p>
        You can also{' '}
        <a onClick={this.storeTokenOnClient} href="/list-view">
          create a new shopping list{' '}
        </a>
      </p>
    );
  }
}

export default App;
