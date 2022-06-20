import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import { changeProductCurrencyIndex } from '../../controllers/productController';
import { CartDataType } from '../../types/productType';
import CartItem from '../cart-item/CartItem';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import './cart-page.scss';

type Props = Readonly<PropsFromRedux>;

type CartPageState = {
  productCurrencyIndex: number;
  showOrderMessage: boolean;
  isCartEmpty: boolean;
};

export class CartPage extends Component<Props, CartPageState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
      showOrderMessage: false,
      isCartEmpty: true,
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
      this.setState({ isCartEmpty: false });
    }
    this.props.countTotalPrice(this.props.productsInCart, this.state.productCurrencyIndex);
    this.props.countTotalProductsCount(this.props.productsInCart, this.state.productCurrencyIndex);
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: CartPageState) {
    if (this.props.currentCurrency !== prevProps.currentCurrency) {
      this.setState({
        productCurrencyIndex: changeProductCurrencyIndex(
          this.props.productsInCart[0],
          this.props.currentCurrency.currentCurrency
        ),
      });
    }

    if (this.state.productCurrencyIndex !== prevState.productCurrencyIndex) {
      this.props.countTotalPrice(this.props.productsInCart, this.state.productCurrencyIndex);
    }
  }

  resetData() {
    this.setState({ showOrderMessage: true });
    this.props.resetTotalDataCount();
    this.props.clearCart();
  }

  render() {
    const { isCartModalOpen, productsInCart, currentCurrency, totalDataCount } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        <section className="cart-section">
          <div className="wrapper">
            <h3 className="cart-title">Cart</h3>
            <div className="cart-message-container">
              {this.state.showOrderMessage && (
                <>
                  <p className="cart-message">Your order is accepted. Thank you!</p>
                  <Link to={`/category/all`} className="btn-green">
                    Continue Shopping
                  </Link>
                </>
              )}
              {this.state.isCartEmpty && (
                <>
                  <p className="cart-message">Your cart is empty.</p>
                  <Link to={`/category/all`} className="btn-green">
                    Go Shopping
                  </Link>
                </>
              )}
            </div>
            <div cart-items-container>
              {productsInCart.map((el: CartDataType, index) => (
                <CartItem data={el} key={index} />
              ))}
            </div>
            {productsInCart.length !== 0 && (
              <>
                <div className="order-data-container">
                  <div className="order-text-container">
                    <h3>Tax 21%:</h3>
                    <h3>Quantity:</h3>
                    <h3>Total:</h3>
                  </div>
                  <div className="order-price-container">
                    <h3>
                      {currentCurrency.currentCurrency}
                      {totalDataCount.tax}
                    </h3>
                    <h3>{totalDataCount.totalProductsCount}</h3>
                    <h3>
                      {currentCurrency.currentCurrency}
                      {totalDataCount.totalPrice}
                    </h3>
                  </div>
                </div>
                <button className="btn-green" onClick={() => this.resetData()}>
                  Order
                </button>
              </>
            )}
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isCartModalOpen: state.modalCartReducer.isCartModalOpen,
    productsInCart: state.cartReducer,
    currentCurrency: state.currencyReducer,
    totalDataCount: state.totalDataCountReducer,
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
    resetTotalDataCount: () => dispatch({ type: 'RESET_TOTAL_DATA_COUNT' }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartPage);
