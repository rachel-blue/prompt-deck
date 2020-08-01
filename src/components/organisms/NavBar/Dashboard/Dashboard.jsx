import React from 'react';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  return (
    <nav
      data-test="dashboard-render"
      className="navbar navbar-expand bg-secondary px-2 justify-content-center"
    >
      <div>
        <ul className="navbar-nav mr-auto o-nav-bar__nav-width pl-1">

          <li className="o-nav-bar__nav-item">
            <NavLink
              to="/create-decks"
              className="nav-link"
              activeClassName="chosen"
            >
              Decks
            </NavLink>
          </li>

          <li className="o-nav-bar__nav-item">
            <NavLink
              to="/cards"
              className="nav-link"
              activeClassName="chosen"
            >
              Cards
            </NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Dashboard;
