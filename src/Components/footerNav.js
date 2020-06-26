import React from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className="fixed bottom-0 w-full">
      <Route path="/list-view"></Route>
      <Route path="/add-item"></Route>
      <footer>
        <nav>
          <NavLink to="/list-view">
            <img className="mx-auto" src="/img/list.svg" alt="view list" />
          </NavLink>
          <NavLink to="/add-item">
            <img className="mx-auto" src="/img/add.svg" alt="add item" />
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
