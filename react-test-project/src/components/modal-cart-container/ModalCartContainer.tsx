import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../..';
import './modal-cart-container.scss';

type Props = Readonly<PropsFromRedux>;

export class ModalCartContainer extends Component<Props> {
  render() {
    const { productsInCart, isCartModalOpen } = this.props;

    return (
      <section className="cart-modal-section">
        <div className="wrapper">
          <div className="modal-container">
            <h4>{`My Bag, ${productsInCart.length} items`}</h4>
            <div>
              <Link
                to="/cart"
                onClick={() => {
                  isCartModalOpen(false);
                  document.body.classList.toggle('scroll-hidden', !isCartModalOpen);
                }}
              >
                View bag
              </Link>
              <button>CHECK OUT</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productsInCart: state.cartReducer,
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
