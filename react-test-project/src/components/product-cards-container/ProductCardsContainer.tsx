import React, { Component } from 'react';
import { ProductType } from '../../types/ProductType';
import { CardsContainerProps } from '../main/Main';
import ProductCard from '../product-card/ProductCard';
import './product-card-container.scss';

export type Props = Readonly<CardsContainerProps>;

export default class ProductCardsContainer extends Component<Props> {
  render() {
    return (
      <section className="cards-container">
        {this.props.cardsData?.map((el: ProductType) => {
          return <ProductCard cardData={el} key={el.id} />;
        })}
      </section>
    )
  }
}
