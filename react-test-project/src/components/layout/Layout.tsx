import React, { Component } from 'react';
import { Outlet } from 'react-router';
import Header from '../header/Header';

interface LayoutProps {
  categories: string[];
}

type Props = Readonly<LayoutProps>;

export class Layout extends Component<Props> {
  render() {
    return (
      <>
        <Header categories={this.props.categories} />
        <main className="main">
          <Outlet />
        </main>
      </>
    );
  }
}
