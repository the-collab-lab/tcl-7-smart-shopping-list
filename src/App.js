import React from 'react';
import './App.css';

import GetList from './Components/getList.js';
import AddItem from './Components/addItem.js';

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
              <Additem />
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
      <GetList />
      <AddItem />
    </div>
  );
}

export default App;
