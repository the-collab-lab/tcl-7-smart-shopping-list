import React from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div>
      <Route path="/list-view"></Route>
      <Route path="/add-item"></Route>
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
    </div>
  );
}

export default Footer;
