import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import { changeProductCurrencyIndex } from '../../controllers/productController';
import { CartDataType } from '../../types/productType';
import CartProductsContainer from '../cart-products-container/CartProductsContainer';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import OrderDataContainer from '../order-data-container/OrderDataContainer';
import './cart-page.scss';

type Props = Readonly<PropsFromRedux>;

type CartPageState = {
  productCurrencyIndex: number;
  showOrderMessage: boolean;
  isCartEmpty: boolean;
  pageName: string;
};

export class CartPage extends Component<Props, CartPageState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
      showOrderMessage: false,
      isCartEmpty: true,
      pageName: 'cart-page',
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

    if (this.props.productsInCart.length !== prevProps.productsInCart.length) {
      if (this.props.productsInCart.length === 0) {
        this.setState({ isCartEmpty: true });
      }
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
    const { showOrderMessage, isCartEmpty, pageName } = this.state;
    const { isCartModalOpen, productsInCart } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        <section className="cart-section">
          <div className="wrapper">
            <h3 className="cart-title">Cart</h3>
            <div className="cart-message-container">
              {showOrderMessage && (
                <>
                  <p className="cart-message">Your order is accepted. Thank you!</p>
                  <Link to={`/category/all`} className="btn-green">
                    Continue Shopping
                  </Link>
                </>
              )}
              {isCartEmpty && (
                <>
                  <p className="cart-message">Your cart is empty.</p>
                  <Link to={`/category/all`} className="btn-green">
                    Go Shopping
                  </Link>
                </>
              )}
            </div>
            <CartProductsContainer pageName={pageName} />
            {productsInCart.length !== 0 && (
              <>
                <OrderDataContainer pageName={pageName} />
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
