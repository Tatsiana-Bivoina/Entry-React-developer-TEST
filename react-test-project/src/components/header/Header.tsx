import React, { Component } from 'react';
import './header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className='header'>
        <div className="wrapper">
          <div className="header-container">
            <div className="page-navigation">
              <button className="nav-item item-women active">Women</button>
              <button className="nav-item item-men">Men</button>
              <button className="nav-item item-kids">Kids</button>
            </div>
            <div className="logo-container">
              <img src="./a-logo.png" alt="logo" />
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
    )
  }
}
