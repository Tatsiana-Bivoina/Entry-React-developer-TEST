import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, client, RootState } from '../..';
import {
  ActiveAttributesType,
  AttributesType,
  CartDataType,
  ItemType,
  PriceType,
  ProductDataType,
} from '../../types/productTypesList';
import { getCurrentProductDataQuery } from '../../queries/currentProductQuery';
import './product-page.scss';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import { chooseClassName } from '../../controllers/productController';
import nextId from 'react-id-generator';
import { FaCheck, FaClock } from 'react-icons/fa';
import parse from 'html-react-parser';
import QuickShopPDP from '../quick-shop/QuickShopPDP';

interface ProductPageProps extends PropsFromRedux {
  fromPage?: string | undefined;
}

type Props = Readonly<ProductPageProps>;

type ProductPageState = {
  currentProductData: ProductDataType;
  productCurrencyIndex: number;
  activeMinPhoto: string;
  maxPhotoSrc: string;
  activeAttributes: ActiveAttributesType;
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
    const data: ProductDataType = await this.getData();
    this.setState({ currentProductData: data });
    this.setState({ maxPhotoSrc: data.gallery[0] });
    this.changeProductCurrencyIndex(data);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.currentCurrency !== this.props.currentCurrency) {
      this.changeProductCurrencyIndex(this.state.currentProductData);
    }
  }

  changeProductCurrencyIndex(data: ProductDataType): void {
    const currencyElemIndex: number = data.prices.findIndex(
      (elem: PriceType) => elem.currency.symbol === this.props.currentCurrency
    );
    this.setState({ productCurrencyIndex: currencyElemIndex });
  }

  setActiveAttributes(name: string, index: string): void {
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

  addProductToCart(): void {
    const finalProductData: CartDataType = {
      ...this.state.currentProductData,
      generatedId: nextId(),
      activeAttributes: this.state.activeAttributes,
      amount: 1,
    };
    this.props.addToCart(finalProductData);
    this.props.countTotalProductsCount(this.props.productsInCart);
    if (this.props.fromPage === 'quickShopPLP') {
      this.props.toggleQuickShopPLPModal(false);
      document.body.classList.toggle('scroll-hidden', !this.props.isQuickShopPLPModalOpen);
    }
  }

  render() {
    const { currentProductData, activeAttributes, productCurrencyIndex } = this.state;
    const {
      isCartModalOpen,
      toggleCurrencySwitcher,
      isQuickShopPDPModalOpen,
      toggleQuickShopPDPModal,
      fromPage,
    } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        {isQuickShopPDPModalOpen && <QuickShopPDP />}
        <section
          className={
            fromPage === 'quickShopPLP'
              ? 'product-page-section quick-shop-plp'
              : 'product-page-section'
          }
          onClick={() => {
            toggleCurrencySwitcher(false);
          }}
        >
          <div className="wrapper">
            {currentProductData && (
              <>
                {fromPage === 'quickShopPLP' && (
                  <h4 className="quick-shop-plp-title">
                    You can add this item to your shopping cart in 1 click
                  </h4>
                )}
                <div className="product-page-container">
                  <div className="photo-container">
                    <div className="min-photo-container">
                      {currentProductData.gallery.map((elem: string, index: number) => (
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
                      {!currentProductData.inStock && (
                        <>
                          <div className="product-overlay" />
                          <h4 className="overlay-title">OUT OF STOCK</h4>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="description-container">
                    <h3 className="product-brand">{currentProductData.brand}</h3>
                    <h4 className="product-name">{currentProductData.name}</h4>
                    {!currentProductData.inStock && (
                      <h4 className="product-out-of-stock">Out of stock</h4>
                    )}
                    {currentProductData.attributes.map((el: AttributesType, index: number) => {
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
                              {el.items.map((elem: ItemType, index: number) => (
                                <button
                                  className={chooseClassName(el.name, index, activeAttributes)}
                                  key={index}
                                  onClick={() =>
                                    this.setActiveAttributes(el.name, index.toString())
                                  }
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
                      <div>
                        <button className="btn-green" onClick={() => this.addProductToCart()}>
                          Add to cart
                        </button>
                        {fromPage !== 'quickShopPLP' && (
                          <button
                            className="btn-green btn-transparent"
                            onClick={() => {
                              toggleQuickShopPDPModal(true);
                              document.body.classList.toggle(
                                'scroll-hidden',
                                !isQuickShopPDPModalOpen
                              );
                            }}
                          >
                            Buy in 1 click
                          </button>
                        )}
                      </div>
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
                    <div className="product-description">
                      {parse(currentProductData.description)}
                    </div>
                  </div>
                </div>
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
    currentProductId: state.currentProductIdReducer,
    currentCurrency: state.currencyReducer.currentCurrency,
    isCartModalOpen: state.modalCartReducer.isCartModalOpen,
    productsInCart: state.cartReducer,
    isQuickShopPDPModalOpen: state.quickShopReducer.isQuickShopPDPModalOpen,
    isQuickShopPLPModalOpen: state.quickShopReducer.isQuickShopPLPModalOpen,
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
    toggleQuickShopPDPModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_QUICK_SHOP_PDP_MODAL', payload: isOpen }),
    toggleQuickShopPLPModal: (isOpen: boolean) =>
      dispatch({ type: 'TOGGLE_QUICK_SHOP_PLP_MODAL', payload: isOpen }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);
