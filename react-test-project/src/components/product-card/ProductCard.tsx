import React, { Component } from 'react';
import { ProductType } from '../../types/ProductType';
import { CardsContainerProps } from '../main/Main';
import './product-card.scss';

export interface CardProps extends CardsContainerProps {
  cardData: ProductType;
}

export type Props = Readonly<CardProps>;

export default class ProductCard extends Component<Props> {
  render() {
    return (
      <div className="card">
        <div className="img-container">
          <img src={this.props.cardData.image} alt='product' />
        </div>
        <h3 className="product-title">{this.props.cardData.title}</h3>
        <p className="product-price">{this.props.cardData.price}</p>
      </div>
    );
  }
}
