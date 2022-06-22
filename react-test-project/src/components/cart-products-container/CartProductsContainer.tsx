import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../..';
import { CartDataType } from '../../types/productType';
import CartItem from '../cart-item/CartItem';

interface CartProductsContainerProps extends PropsFromRedux {
  pageName: string;
}

type Props = Readonly<CartProductsContainerProps>;

export class CartProductsContainer extends Component<Props> {
  render() {
    const { productsInCart, pageName } = this.props;

    return (
      <div
        className={pageName === 'cart-page' ? 'cart-items-container' : 'cart-items-container modal'}
      >
        {productsInCart.map((el: CartDataType, index) => (
          <CartItem data={el} key={index} pageName={pageName} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productsInCart: state.cartReducer,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartProductsContainer);
