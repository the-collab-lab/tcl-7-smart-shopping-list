import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

function Footer() {
  return (
    <Router>
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
  );
}

export default Footer;
