import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <div className="header-container">
            <div className="page-navigation">
              <NavLink
                to="/category/all"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                All
              </NavLink>
              <NavLink
                to="/category/clothes"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                Clothes
              </NavLink>
              <NavLink
                to="/category/tech"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                Tech
              </NavLink>
            </div>
            <div className="logo-container">
              <img src="../../a-logo.png" alt="logo" />
            </div>
            <div className="cart-currency-container">
              <select name="currency" id="currency" className="currency">
                <option value="$">$ USD</option>
                <option value="€">€ EUR</option>
                <option value="¥">¥ JPY</option>
              </select>
              <button className="cart"></button>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
