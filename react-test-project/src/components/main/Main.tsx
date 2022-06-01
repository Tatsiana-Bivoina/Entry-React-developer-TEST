import React, { Component } from 'react';
import { AppProps } from '../../App';
import { ProductType } from '../../types/ProductType';
import ProductCardsContainer from '../product-cards-container/ProductCardsContainer';
import './main.scss';

export interface CardsContainerProps extends AppProps {
  cardsData?: ProductType[];
}

export type Props = Readonly<CardsContainerProps>;

export default class Main extends Component<Props> {
  render() {
    return (
      <main className="main">
        <div className="wrapper">
          <h1 className="category-title">Category name</h1>
          <ProductCardsContainer cardsData={this.props.cardsData} />
        </div>
      </main>
    )
  }
}
