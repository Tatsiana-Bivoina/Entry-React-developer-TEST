import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { changeProductCurrencyIndex, chooseClassName } from '../../controllers/productController';
import { AttributesType, CartDataType, ItemType } from '../../types/productType';
import { FaMinus } from 'react-icons/fa';
import './cart-item.scss';
import ProductPhotoCarousel from '../product-photo-carousel/ProductPhotoCarousel';

export interface CartItemProps extends PropsFromRedux {
  data: CartDataType;
  key: number;
  pageName: string;
}

type Props = Readonly<CartItemProps>;

type CartItemState = {
  productCurrencyIndex: number;
};

export class CartItem extends Component<Props, CartItemState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
    };
  }

  componentDidMount() {
    this.setState({
      productCurrencyIndex: changeProductCurrencyIndex(this.props.data, this.props.currentCurrency),
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (this.props.currentCurrency !== prevProps.currentCurrency) {
      this.setState({
        productCurrencyIndex: changeProductCurrencyIndex(
          this.props.data,
          this.props.currentCurrency
        ),
      });
    }

    if (
      this.props.data.amount !== prevProps.data.amount ||
      this.props.productsInCart.length !== prevProps.productsInCart.length
    ) {
      this.props.countTotalProductsCount(this.props.productsInCart);
      this.props.countTotalPrice(this.props.productsInCart, this.state.productCurrencyIndex);
    }
  }

  incrementAmount() {
    const currentProductData = { ...this.props.data };
    const changedData = {
      ...currentProductData,
      amount: currentProductData.amount + 1,
    };
    this.props.editItem(changedData);
  }

  decrementAmount() {
    if (this.props.data.amount > 1) {
      const currentProductData = { ...this.props.data };
      const changedData = {
        ...currentProductData,
        amount: currentProductData.amount - 1,
      };
      this.props.editItem(changedData);
    } else {
      this.props.deleteItem(this.props.data);
    }
  }

  render() {
    const { data, pageName } = this.props;

    return (
      <div className="cart-item">
        <div className="cart-item-data">
          {pageName === 'cart-page' && <h3 className="product-brand">{data.brand}</h3>}
          <h4 className="product-name">{data.name}</h4>
          <p className="product-current-price">
            {data.prices[this.state.productCurrencyIndex].currency.symbol}
            {data.prices[this.state.productCurrencyIndex].amount}
          </p>
          {data.attributes.map((el: AttributesType, index) => {
            return (
              <div key={index} className="attribute-container">
                <h5 className="attribute-type">{el.name}:</h5>
                {el.name === 'Color' ? (
                  <div className="attribute-color-container">
                    {el.items.map((elem: ItemType, index) => (
                      <div
                        key={index}
                        className={
                          data.activeAttributes.activeColor === index.toString()
                            ? 'attribute-btn-color active'
                            : 'attribute-btn-color'
                        }
                        style={{ backgroundColor: elem.value }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="attribute-btn-container">
                    {el.items.map((elem: ItemType, index) => (
                      <button
                        disabled
                        className={chooseClassName(
                          el.name,
                          index,
                          this.props.data.activeAttributes
                        )}
                        key={index}
                      >
                        {elem.value}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="cart-item-photo">
          <div className="counter-container">
            <button className="btn-plus" onClick={() => this.incrementAmount()}>
              +
            </button>
            <span>{data.amount}</span>
            <button className="btn-minus" onClick={() => this.decrementAmount()}>
              <FaMinus className="icon-minus" />
            </button>
          </div>
          <ProductPhotoCarousel galleryLength={data.gallery.length} pageName={pageName}>
            {data.gallery.map((elem: string, index) => (
              <div className="image-container" key={index}>
                <img src={elem} alt="" />
              </div>
            ))}
          </ProductPhotoCarousel>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentCurrency: state.currencyReducer.currentCurrency,
    productsInCart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    deleteItem: (item: CartDataType) => dispatch({ type: 'DELETE_FROM_CART', payload: item }),
    editItem: (item: CartDataType) => dispatch({ type: 'EDIT_CART', payload: item }),
    countTotalPrice: (productsData: CartDataType[], currencyIndex: number) =>
      dispatch({
        type: 'COUNT_TOTAL_PRICE',
        payload: { data: productsData, currencyIndex: currencyIndex },
      }),
    countTotalProductsCount: (productsData: CartDataType[]) =>
      dispatch({
        type: 'COUNT_TOTAL_PRODUCTS_COUNT',
        payload: { data: productsData },
      }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
