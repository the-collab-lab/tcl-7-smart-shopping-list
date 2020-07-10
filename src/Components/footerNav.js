import React from 'react';
import { BrowserRouter as Route, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <div className="fixed bottom-0 w-full bg-green-600 shadow-lg outline-none text-gray-400">
      <Route path="/list-view"></Route>
      <Route path="/add-item"></Route>
      <footer>
        <nav>
          <NavLink
            className="hover:bg-green-700 active-link:bg-green-700"
            to="/list-view"
          >
            <img className="mx-auto" src="/img/list.svg" alt="view list" />
          </NavLink>
          <NavLink
            className="hover:bg-green-700 active-link:bg-green-700"
            to="/add-item"
          >
            <img className="mx-auto" src="/img/add.svg" alt="add item" />
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}

export default Footer;
