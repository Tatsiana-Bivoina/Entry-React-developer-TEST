import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { client, RootState } from '../..';
import { AttributesType, ItemType, ProductDataType } from '../../types/productType';
import { getCurrentProductDataQuery } from './queries';

type Props = Readonly<PropsFromRedux>;

type ProductPageState = {
  currentProductData: ProductDataType;
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
    };
  }

  async getData(): Promise<ProductDataType> {
    const response = await client.query({
      query: getCurrentProductDataQuery(this.props.currentProductId),
    });
    return response.data.product;
  }

  async componentDidMount() {
    const data = await this.getData();
    this.setState({ currentProductData: data });
  }
  render() {
    const { currentProductData } = this.state;
    const regex = /(<([^>]+)>)/g;
    const formattedDescription = currentProductData.description.replace(regex, '');

    return (
      <section>
        <div className="wrapper">
          <div className="photo-container">
            <div></div>
            <div>
              <img src="" alt="" />
            </div>
          </div>
          <div className="description-container">
            <h3>{currentProductData.brand}</h3>
            <h4>{currentProductData.name}</h4>
            {currentProductData.attributes.map((el: AttributesType, index) => {
              return (
                <div key={index}>
                  <h5>{el.name}:</h5>
                  {el.name === 'Color' ? (
                    <div>
                      {el.items.map((elem: ItemType, index) => (
                        <input type={'color'} key={index} value={elem.value} readOnly />
                      ))}
                    </div>
                  ) : (
                    <div>
                      {el.items.map((elem: ItemType, index) => (
                        <button key={index}>{elem.value}</button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <h5>Price:</h5>
            <p>
              {currentProductData.prices[0].currency.symbol}
              {currentProductData.prices[0].amount}
            </p>
            <button>Add to cart</button>
            <p dangerouslySetInnerHTML={{ __html: formattedDescription }} />
          </div>
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

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductPage);
