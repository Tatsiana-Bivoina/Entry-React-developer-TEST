import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { changeProductCurrencyIndex, chooseClassName } from '../../controllers/productController';
import { AttributesType, CartDataType, ItemType, PriceType } from '../../types/productType';
import { FaTrash, FaMinus } from 'react-icons/fa';
import './cart-item.scss';

export interface CartItemProps extends PropsFromRedux {
  data: CartDataType;
  key: number;
}

type Props = Readonly<CartItemProps>;

type CartItemState = {
  productCurrencyIndex: number;
  currentPhotoIndex: number;
  startProductPrices: PriceType[];
};

export class CartItem extends Component<Props, CartItemState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      productCurrencyIndex: 0,
      currentPhotoIndex: 0,
      startProductPrices: this.props.data.prices,
    };
  }

  componentDidMount() {
    this.setState({
      productCurrencyIndex: changeProductCurrencyIndex(this.props.data, this.props.currentCurrency),
    });
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: CartItemState) {
    if (this.props.currentCurrency !== prevProps.currentCurrency) {
      this.setState({
        productCurrencyIndex: changeProductCurrencyIndex(
          this.props.data,
          this.props.currentCurrency
        ),
      });
    }

    if (
      this.props.data.prices !== prevProps.data.prices ||
      this.props.productsInCart.length !== prevProps.productsInCart.length
    ) {
      this.props.countTotalPrice(this.props.productsInCart, this.state.productCurrencyIndex);
    }

    if (
      this.props.data.amount !== prevProps.data.amount ||
      this.props.productsInCart.length !== prevProps.productsInCart.length
    ) {
      this.props.countTotalProductsCount(
        this.props.productsInCart,
        this.state.productCurrencyIndex
      );
    }

    if (this.state.productCurrencyIndex !== prevState.productCurrencyIndex) {
      this.props.editItem({
        ...this.props.data,
        prices: this.props.data.prices.map((el: PriceType, index) => {
          return index === this.state.productCurrencyIndex
            ? {
                ...el,
                amount:
                  Math.round(
                    this.state.startProductPrices[this.state.productCurrencyIndex].amount *
                      this.props.data.amount *
                      100
                  ) / 100,
              }
            : el;
        }),
      });
    }
  }

  chooseNextPhoto() {
    if (this.state.currentPhotoIndex < this.props.data.gallery.length - 1) {
      this.setState({ currentPhotoIndex: this.state.currentPhotoIndex + 1 });
    }
  }

  choosePrevPhoto() {
    if (this.state.currentPhotoIndex > 0) {
      this.setState({ currentPhotoIndex: this.state.currentPhotoIndex - 1 });
    }
  }

  incrementAmount() {
    const currentProductData = { ...this.props.data };
    const changedData = {
      ...currentProductData,
      amount: currentProductData.amount + 1,
      prices: currentProductData.prices.map((el: PriceType, index) => {
        return index === this.state.productCurrencyIndex
          ? {
              ...el,
              amount:
                Math.round(
                  this.state.startProductPrices[this.state.productCurrencyIndex].amount *
                    (currentProductData.amount + 1) *
                    100
                ) / 100,
            }
          : el;
      }),
    };
    this.props.editItem(changedData);
  }

  decrementAmount() {
    if (this.props.data.amount > 1) {
      const currentProductData = { ...this.props.data };
      const changedData = {
        ...currentProductData,
        amount: currentProductData.amount - 1,
        prices: currentProductData.prices.map((el: PriceType, index) => {
          return index === this.state.productCurrencyIndex
            ? {
                ...el,
                amount:
                  Math.round(
                    this.state.startProductPrices[this.state.productCurrencyIndex].amount *
                      (currentProductData.amount - 1) *
                      100
                  ) / 100,
              }
            : el;
        }),
      };
      this.props.editItem(changedData);
    }
  }

  setActiveAttributes(name: string, index: string) {
    if (name === 'Size') {
      this.props.editItem({
        ...this.props.data,
        activeAttributes: {
          ...this.props.data.activeAttributes,
          activeSize: index.toString(),
        },
      });
    }
    if (name === 'Capacity') {
      this.props.editItem({
        ...this.props.data,
        activeAttributes: {
          ...this.props.data.activeAttributes,
          activeCapacity: index.toString(),
        },
      });
    }
    if (name === 'With USB 3 ports') {
      this.props.editItem({
        ...this.props.data,
        activeAttributes: {
          ...this.props.data.activeAttributes,
          activeWithUSBPorts: index.toString(),
        },
      });
    }
    if (name === 'Touch ID in keyboard') {
      this.props.editItem({
        ...this.props.data,
        activeAttributes: {
          ...this.props.data.activeAttributes,
          activeTouchId: index.toString(),
        },
      });
    }
  }

  render() {
    const { data, deleteItem, editItem } = this.props;

    return (
      <div className="cart-item">
        <div className="cart-item-data">
          <h3 className="product-brand">{data.brand}</h3>
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
                        onClick={() => {
                          editItem({
                            ...data,
                            activeAttributes: {
                              ...data.activeAttributes,
                              activeColor: index.toString(),
                            },
                          });
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="attribute-btn-container">
                    {el.items.map((elem: ItemType, index) => (
                      <button
                        className={chooseClassName(
                          el.name,
                          index,
                          this.props.data.activeAttributes
                        )}
                        key={index}
                        onClick={() => this.setActiveAttributes(el.name, index.toString())}
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
          <div className="photo">
            <img src={data.gallery[this.state.currentPhotoIndex]} alt="" />
            <div className="photo-slider-buttons">
              <button className="button-prev" onClick={() => this.choosePrevPhoto()} />
              <button className="button-next" onClick={() => this.chooseNextPhoto()} />
            </div>
          </div>
        </div>
        <FaTrash className="icon-delete" onClick={() => deleteItem(data)} />
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
    countTotalProductsCount: (productsData: CartDataType[], currencyIndex: number) =>
      dispatch({
        type: 'COUNT_TOTAL_PRODUCTS_COUNT',
        payload: { data: productsData, currencyIndex: currencyIndex },
      }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CartItem);
