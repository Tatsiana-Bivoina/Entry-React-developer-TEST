import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import { CategoryProductsMinResponse, PriceType } from '../../types/productType';
import './product-card.scss';

export interface CardProps extends PropsFromRedux {
  cardData: CategoryProductsMinResponse;
  key: string;
}

export type Props = Readonly<CardProps>;

type ProductCardState = {
  productCurrencyIndex: number;
};

export class ProductCard extends Component<Props, ProductCardState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
    };
  }

  componentDidMount() {
    this.changeProductCurrencyIndex(this.props.cardData);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.currentCurrency !== this.props.currentCurrency) {
      this.changeProductCurrencyIndex(this.props.cardData);
    }
  }

  changeProductCurrencyIndex(data: CategoryProductsMinResponse) {
    const currencyElemIndex: number = data.prices.findIndex(
      (elem: PriceType) => elem.currency.symbol === this.props.currentCurrency
    );
    this.setState({ productCurrencyIndex: currencyElemIndex });
  }

  render() {
    const { productCurrencyIndex } = this.state;
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
          {cardData.prices[productCurrencyIndex].currency.symbol}&nbsp;
          {cardData.prices[productCurrencyIndex].amount}
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

const mapStateToProps = (state: RootState) => {
  return {
    currentCurrency: state.currencyReducer.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getCurrentProductId: (id: string) => dispatch({ type: 'GET_CURRENT_PRODUCT_ID', payload: id }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductCard);
