import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <main>
          <Switch>
            <Route path="/listview">
              <Listview />
            </Route>
            <Route path="/additem">
              <Additem />
            </Route>
          </Switch>
        </main>
        <footer>
          <nav>
            <Link to="/listview">List</Link>
            <Link to="/additem">add item</Link>
          </nav>
        </footer>
      </Router>
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
