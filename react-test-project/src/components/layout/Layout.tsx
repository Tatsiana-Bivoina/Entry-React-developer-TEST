import React, { Component } from 'react';
import { Outlet } from 'react-router';
import Header from '../header/Header';

export class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </>
    );
  }
}
