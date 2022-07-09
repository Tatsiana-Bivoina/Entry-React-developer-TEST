import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import CartProductsContainer from '../cart-products-container/CartProductsContainer';
import OrderDataContainer from '../order-data-container/OrderDataContainer';
import './modal-cart-container.scss';

type Props = Readonly<PropsFromRedux>;

type ModalCartContainerState = {
  pageName: string;
};

export class ModalCartContainer extends Component<Props, ModalCartContainerState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageName: 'cart-modal-page',
    };
  }

  render() {
    const { pageName } = this.state;
    const { productsInCart, isCartModalOpen, totalCount } = this.props;

    return (
      <section
        className="cart-modal-section"
        onClick={() => {
          isCartModalOpen(false);
          document.body.classList.toggle('scroll-hidden', !isCartModalOpen);
        }}
      >
        <div className="wrapper">
          <div className="modal-container" onClick={(event) => event.stopPropagation()}>
            <h4 className="modal-container-title">
              My Bag, <span>{`${totalCount} items`}</span>
            </h4>
            <CartProductsContainer pageName={pageName} />
            {productsInCart.length !== 0 && (
              <>
                <OrderDataContainer pageName={pageName} />
                <div className="modal-btn-container">
                  <Link
                    className="btn-view-bag"
                    to="/cart"
                    onClick={() => {
                      isCartModalOpen(false);
                      document.body.classList.toggle('scroll-hidden', !isCartModalOpen);
                    }}
                  >
                    View bag
                  </Link>
                  <button className="btn-green">CHECK OUT</button>
                </div>
              </>
            )}
            {productsInCart.length === 0 && (
              <>
                <p className="cart-message">Your cart is empty.</p>
                <Link
                  to={`/category/all`}
                  className="btn-green"
                  onClick={() => {
                    isCartModalOpen(false);
                    document.body.classList.toggle('scroll-hidden', !isCartModalOpen);
                  }}
                >
                  Go Shopping
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productsInCart: state.cartReducer,
    totalCount: state.totalDataCountReducer.totalProductsCount,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    isCartModalOpen: (value: boolean) => dispatch({ type: 'TOGGLE_MODAL', payload: value }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModalCartContainer);
