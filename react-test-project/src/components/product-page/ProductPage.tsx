import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppDispatch, client, RootState } from '../..';
import {
  activeAttributesType,
  AttributesType,
  CartDataType,
  ItemType,
  ProductDataType,
} from '../../types/productType';
import { getCurrentProductDataQuery } from './queries';
import './product-page.scss';

type Props = Readonly<PropsFromRedux>;

type ProductPageState = {
  currentProductData: ProductDataType;
  activeMinPhoto: string;
  maxPhotoSrc: string;
  activeAttributes: activeAttributesType;
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
      activeMinPhoto: '0',
      maxPhotoSrc: '',
      activeAttributes: {
        activeColor: '0',
        activeCapacity: '0',
        activeSize: '0',
        activeWithUSBPorts: '0',
        activeTouchId: '0',
      },
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
  }

  chooseClassName(name: string, index: number): string {
    if (name === 'Size') {
      if (this.state.activeAttributes.activeSize === index.toString()) {
        return 'attribute-btn active';
      }
    }
    if (name === 'Capacity') {
      if (this.state.activeAttributes.activeCapacity === index.toString()) {
        return 'attribute-btn active';
      }
    }
    if (name === 'With USB 3 ports') {
      if (this.state.activeAttributes.activeWithUSBPorts === index.toString()) {
        return 'attribute-btn active';
      }
    }
    if (name === 'Touch ID in keyboard') {
      if (this.state.activeAttributes.activeTouchId === index.toString()) {
        return 'attribute-btn active';
      }
    }
    return 'attribute-btn';
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

  addProductToCart(): void {
    const finalProductData = {
      ...this.state.currentProductData,
      activeAttributes: this.state.activeAttributes,
    };
    this.props.addToCart(finalProductData);
  }

  render() {
    const { currentProductData } = this.state;
    const regex = /(<([^>]+)>)/g;

    return (
      <section className="product-page-section">
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
                                this.state.activeAttributes.activeColor === index.toString()
                                  ? 'attribute-btn-color active'
                                  : 'attribute-btn-color'
                              }
                              style={{ backgroundColor: elem.value }}
                              onClick={() => {
                                this.setState({
                                  activeAttributes: {
                                    ...this.state.activeAttributes,
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
                              className={this.chooseClassName(el.name, index)}
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
                <h5 className="product-price-title">Price:</h5>
                <p className="product-current-price">
                  {currentProductData.prices[0].currency.symbol}
                  {currentProductData.prices[0].amount}
                </p>
                <button className="btn-add-to-cart" onClick={() => this.addProductToCart()}>
                  Add to cart
                </button>
                <p
                  dangerouslySetInnerHTML={{
                    __html: currentProductData.description.replace(regex, ''),
                  }}
                  className="product-description"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentProductId: state.currentProductIdReducer,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addToCart: (product: CartDataType) => dispatch({ type: 'ADD_TO_CART', payload: product }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);
