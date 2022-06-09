import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../..';
import './header.scss';

export type Props = Readonly<PropsFromRedux>;

export class Header extends Component<Props> {
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
              <div className="cart-container">
                <button className="cart"></button>
                {this.props.cart.length > 0 && (
                  <span className="cart-product-count">{this.props.cart.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    cart: state.cartReducer,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
