import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/listview">List</Link>
                </li>
                <li>
                  <Link to="/additem">add item</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/listview">
                <Listview />
              </Route>
              <Route path="/additem">
                <Additem />
              </Route>
            </Switch>
          </div>
        </Router>
      </header>
    </div>
  );
}

function Listview() {
  return <h2>This is the list view!</h2>;
}

function Additem() {
  return <h2>This is where you'd add an item!</h2>;
}

export default App;
