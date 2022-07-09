import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, client, RootState } from '../..';
import {
  activeAttributesType,
  AttributesType,
  CartDataType,
  ItemType,
  PriceType,
  ProductDataType,
} from '../../types/productType';
import { getCurrentProductDataQuery } from './queries';
import './product-page.scss';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import { chooseClassName } from '../../controllers/productController';
import nextId from 'react-id-generator';
import { FaCheck, FaClock } from 'react-icons/fa';
import parse from 'html-react-parser';

type Props = Readonly<PropsFromRedux>;

type ProductPageState = {
  currentProductData: ProductDataType;
  productCurrencyIndex: number;
  activeMinPhoto: string;
  maxPhotoSrc: string;
  activeAttributes: activeAttributesType;
  buttonText: string;
};

const emptyCurrentProductData: ProductDataType = {
  id: '',
  category: '',
  name: '',
  gallery: [],
  description: '',
  attributes: [
    {
      name: '',
      type: '',
      items: [
        {
          displayValue: '',
          value: '',
        },
      ],
    },
  ],
  inStock: true,
  brand: '',
  prices: [
    {
      currency: {
        label: '',
        symbol: '',
      },
      amount: 0,
    },
  ],
};

export class ProductPage extends Component<Props, ProductPageState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentProductData: emptyCurrentProductData,
      productCurrencyIndex: 0,
      activeMinPhoto: '0',
      maxPhotoSrc: '',
      activeAttributes: {
        activeColor: '0',
        activeCapacity: '0',
        activeSize: '0',
        activeWithUSBPorts: '0',
        activeTouchId: '0',
      },
      buttonText: 'Leave a request',
    };
  }

  async getData(): Promise<ProductDataType> {
    const response = await client.query({
      query: getCurrentProductDataQuery(this.props.currentProductId.id),
    });
    return response.data.product;
  }

  async componentDidMount() {
    const data = await this.getData();
    this.setState({ currentProductData: data });
    this.setState({ maxPhotoSrc: data.gallery[0] });
    this.changeProductCurrencyIndex(data);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.currentCurrency !== this.props.currentCurrency) {
      this.changeProductCurrencyIndex(this.state.currentProductData);
    }
  }

  changeProductCurrencyIndex(data: ProductDataType) {
    const currencyElemIndex: number = data.prices.findIndex(
      (elem: PriceType) => elem.currency.symbol === this.props.currentCurrency
    );
    this.setState({ productCurrencyIndex: currencyElemIndex });
  }

  setActiveAttributes(name: string, index: string) {
    if (name === 'Size') {
      this.setState({
        activeAttributes: {
          ...this.state.activeAttributes,
          activeSize: index.toString(),
        },
      });
    }
    if (name === 'Capacity') {
      this.setState({
        activeAttributes: {
          ...this.state.activeAttributes,
          activeCapacity: index.toString(),
        },
      });
    }
    if (name === 'With USB 3 ports') {
      this.setState({
        activeAttributes: {
          ...this.state.activeAttributes,
          activeWithUSBPorts: index.toString(),
        },
      });
    }
    if (name === 'Touch ID in keyboard') {
      this.setState({
        activeAttributes: {
          ...this.state.activeAttributes,
          activeTouchId: index.toString(),
        },
      });
    }
  }

  addProductToCart() {
    const finalProductData = {
      ...this.state.currentProductData,
      generatedId: nextId(),
      activeAttributes: this.state.activeAttributes,
      amount: 1,
    };
    this.props.addToCart(finalProductData);
    this.props.countTotalProductsCount(this.props.productsInCart);
  }

  render() {
    const { currentProductData, activeAttributes, productCurrencyIndex } = this.state;
    const { isCartModalOpen, toggleCurrencySwitcher } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        <section
          className="product-page-section"
          onClick={() => {
            toggleCurrencySwitcher(false);
          }}
        >
          <div className="wrapper">
            {currentProductData && (
              <div className="product-page-container">
                <div className="photo-container">
                  <div className="min-photo-container">
                    {currentProductData.gallery.map((elem: string, index) => (
                      <img
                        className={
                          this.state.activeMinPhoto === index.toString()
                            ? 'min-photo active'
                            : 'min-photo'
                        }
                        key={index}
                        src={elem}
                        alt=""
                        onClick={() => {
                          this.setState({ activeMinPhoto: index.toString() });
                          this.setState({ maxPhotoSrc: elem });
                        }}
                      />
                    ))}
                  </div>
                  <div className="max-photo-container">
                    <img className="max-photo" src={this.state.maxPhotoSrc} alt="" />
                  </div>
                </div>
                <div className="description-container">
                  <h3 className="product-brand">{currentProductData.brand}</h3>
                  <h4 className="product-name">{currentProductData.name}</h4>
                  {!currentProductData.inStock && (
                    <h4 className="product-out-of-stock">Out of stock</h4>
                  )}
                  {currentProductData.attributes.map((el: AttributesType, index) => {
                    return (
                      <div key={index}>
                        <h5 className="attribute-type">{el.name}:</h5>
                        {el.name === 'Color' ? (
                          <div className="attribute-color-container">
                            {el.items.map((elem: ItemType, index) => (
                              <div
                                key={index}
                                className={
                                  activeAttributes.activeColor === index.toString()
                                    ? 'attribute-btn-color active'
                                    : 'attribute-btn-color'
                                }
                                style={{ backgroundColor: elem.value }}
                                onClick={() => {
                                  this.setState({
                                    activeAttributes: {
                                      ...activeAttributes,
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
                                className={chooseClassName(el.name, index, activeAttributes)}
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
                  <h5 className="product-price-title">
                    {currentProductData.inStock ? 'Price:' : 'Preliminary price:'}
                  </h5>
                  <p className="product-current-price">
                    {currentProductData.prices[productCurrencyIndex].currency.symbol}
                    &nbsp;
                    {currentProductData.prices[productCurrencyIndex].amount}
                  </p>
                  {currentProductData.inStock && (
                    <button className="btn-green" onClick={() => this.addProductToCart()}>
                      Add to cart
                    </button>
                  )}
                  {!currentProductData.inStock && (
                    <button
                      className="btn-green"
                      onClick={() => this.setState({ buttonText: 'Request accepted' })}
                    >
                      {this.state.buttonText === 'Request accepted' && <FaCheck />}
                      {this.state.buttonText === 'Leave a request' && <FaClock />}
                      &nbsp; &nbsp;
                      {this.state.buttonText}
                    </button>
                  )}
                  <div className="product-description">{parse(currentProductData.description)}</div>
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProductId: state.currentProductIdReducer,
    currentCurrency: state.currencyReducer.currentCurrency,
    isCartModalOpen: state.modalCartReducer.isCartModalOpen,
    productsInCart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addToCart: (product: CartDataType) => dispatch({ type: 'ADD_TO_CART', payload: product }),
    toggleCurrencySwitcher: (isCurrencySwitcherOpen: boolean) =>
      dispatch({ type: 'TOGGLE_CURRENCY_SWITCHER', payload: isCurrencySwitcherOpen }),
    countTotalProductsCount: (productsData: CartDataType[]) =>
      dispatch({
        type: 'COUNT_TOTAL_PRODUCTS_COUNT',
        payload: { data: productsData },
      }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);
