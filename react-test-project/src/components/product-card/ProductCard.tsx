import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import { CategoryProductsMinResponse, PriceType } from '../../types/productTypesList';
import './product-card.scss';

export interface CardProps extends PropsFromRedux {
  cardData: CategoryProductsMinResponse;
  key: string;
}

export type Props = Readonly<CardProps>;

type ProductCardState = {
  productCurrencyIndex: number;
  isClicked: boolean;
};

export class ProductCard extends Component<Props, ProductCardState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
      isClicked: false,
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

  changeProductCurrencyIndex(data: CategoryProductsMinResponse): void {
    const currencyElemIndex: number = data.prices.findIndex(
      (elem: PriceType) => elem.currency.symbol === this.props.currentCurrency
    );
    this.setState({ productCurrencyIndex: currencyElemIndex });
  }

  render() {
    const { productCurrencyIndex } = this.state;
    const { cardData, getCurrentProductId, toggleQuickShopModal, isQuickShopModalOpen } =
      this.props;

    return (
      <>
        {this.state.isClicked && (
          <Navigate to={`/category/${this.props.cardData.category}/${this.props.cardData.id}`} />
        )}
        <div
          className={cardData.inStock ? 'card' : 'card overlay'}
          onClick={() => {
            getCurrentProductId(cardData.id);
            this.setState({ isClicked: true });
          }}
        >
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
            {cardData.brand}&nbsp;
            {cardData.name}
          </h3>
          <p className={cardData.inStock ? 'product-price' : 'product-price overlay'}>
            {cardData.prices[productCurrencyIndex].currency.symbol}&nbsp;
            {cardData.prices[productCurrencyIndex].amount}
          </p>
          <button
            className="quick-shop-link"
            title="Buy in 1 click"
            onClick={(event) => {
              event.stopPropagation();
              toggleQuickShopModal(true);
              document.body.classList.toggle('scroll-hidden', !isQuickShopModalOpen);
            }}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentCurrency: state.currencyReducer.currentCurrency,
    isQuickShopModalOpen: state.quickShopReducer.isQuickShopModalOpen,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getCurrentProductId: (id: string) => dispatch({ type: 'GET_CURRENT_PRODUCT_ID', payload: id }),
    toggleQuickShopModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_QUICK_SHOP_MODAL', payload: isOpen }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductCard);
