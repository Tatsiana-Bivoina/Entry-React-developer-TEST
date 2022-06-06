import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../..';
import { CategoryProductsMinResponse } from '../../types/productType';
import './product-card.scss';

export interface CardProps extends PropsFromRedux {
  cardData: CategoryProductsMinResponse;
  key: string;
}

export type Props = Readonly<CardProps>;

export class ProductCard extends Component<Props> {
  render() {
    const { cardData, getCurrentProductId } = this.props;

    return (
      <div className={cardData.inStock ? 'card' : 'card overlay'}>
        <div className="img-container">
          <img src={cardData.gallery[0]} alt="product" />
          {!cardData.inStock && (
            <>
              <div className="product-overlay" />
              <h4 className="overlay-title">OUT OF STOCK</h4>
            </>
          )}
        </div>
        <h3 className={cardData.inStock ? 'product-title' : 'product-title overlay'}>
          {cardData.name}
        </h3>
        <p className={cardData.inStock ? 'product-price' : 'product-price overlay'}>
          {cardData.prices[0].currency.symbol} {cardData.prices[0].amount}
        </p>
        <Link
          to={`/category/${cardData.category}/${cardData.id}`}
          className="cart-link"
          onClick={() => getCurrentProductId(cardData.id)}
        >
          <div className="cart-link-container" />
        </Link>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getCurrentProductId: (id: string) => dispatch({ type: 'GET_CURRENT_PRODUCT_ID', payload: id }),
  };
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductCard);
