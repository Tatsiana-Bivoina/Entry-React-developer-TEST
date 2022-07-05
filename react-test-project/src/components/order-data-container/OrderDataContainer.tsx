import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { changeProductCurrencyIndex } from '../../controllers/productController';
import { CartDataType } from '../../types/productType';

interface OrderDataContainerProps extends PropsFromRedux {
  pageName: string;
}

type Props = Readonly<OrderDataContainerProps>;

type OrderDataContainerState = {
  productCurrencyIndex: number;
};

export class OrderDataContainer extends Component<Props, OrderDataContainerState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
    };
  }

  componentDidMount() {
    if (this.props.productsInCart.length !== 0) {
      this.setState({
        productCurrencyIndex: changeProductCurrencyIndex(
          this.props.productsInCart[0],
          this.props.currentCurrency.currentCurrency
        ),
      });
    }
    this.props.countTotalPrice(this.props.productsInCart, this.state.productCurrencyIndex);
    this.props.countTotalProductsCount(this.props.productsInCart, this.state.productCurrencyIndex);
  }

  render() {
    const { currentCurrency, totalDataCount, pageName } = this.props;

    return (
      <div
        className={pageName === 'cart-page' ? 'order-data-container' : 'order-data-container modal'}
      >
        <div className="order-text-container">
          {pageName === 'cart-page' && (
            <>
              <h3>Tax 21%:</h3>
              <h3>Quantity:</h3>
            </>
          )}
          <h3>Total:</h3>
        </div>
        <div className="order-price-container">
          {pageName === 'cart-page' && (
            <>
              <h3>
                {currentCurrency.currentCurrency}
                {totalDataCount.tax}
              </h3>
              <h3>{totalDataCount.totalProductsCount}</h3>
            </>
          )}
          <h3>
            {currentCurrency.currentCurrency}
            {totalDataCount.totalPrice}
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentCurrency: state.currencyReducer,
    totalDataCount: state.totalDataCountReducer,
    productsInCart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    countTotalPrice: (productsData: CartDataType[], currencyIndex: number) =>
      dispatch({
        type: 'COUNT_TOTAL_PRICE',
        payload: { data: productsData, currencyIndex: currencyIndex },
      }),
    countTotalProductsCount: (productsData: CartDataType[], currencyIndex: number) =>
      dispatch({
        type: 'COUNT_TOTAL_PRODUCTS_COUNT',
        payload: { data: productsData, currencyIndex: currencyIndex },
      }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(OrderDataContainer);
