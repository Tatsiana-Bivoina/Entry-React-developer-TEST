import React, { Component } from 'react';
import { AppDispatch, client, RootState } from '../..';
import ProductCardsContainer from '../product-cards-container/ProductCardsContainer';
import { getProductsQuery } from './queries';
import { CategoryProductsMinResponse, DefaultPricesType } from '../../types/productType';
import { connect, ConnectedProps } from 'react-redux';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import './category-page.scss';

export interface CategoryPageProps extends PropsFromRedux {
  category: string;
}

type Props = Readonly<CategoryPageProps>;

export class CategoryPage extends Component<Props> {
  async getData(): Promise<CategoryProductsMinResponse[]> {
    const response = await client.query({
      query: getProductsQuery(this.props.category),
    });
    return response.data.category.products;
  }

  async componentDidMount() {
    const data = await this.getData();
    data.map((el: CategoryProductsMinResponse) => {
      this.props.addDefaultPrices({ id: el.id, prices: [...el.prices] });
    });
    this.props.getProductsData(data);
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.category !== this.props.category) {
      const data = await this.getData();
      this.props.getProductsData(data);
    }
  }

  render() {
    const { category = 'All' } = this.props;
    const { isCartModalOpen } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        <section className="category-page">
          <div className="wrapper">
            <h1 className="category-title">{category}</h1>
            <ProductCardsContainer />
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isCartModalOpen: state.modalCartReducer.isCartModalOpen,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getProductsData: (data: CategoryProductsMinResponse[]) =>
      dispatch({ type: 'GET_PRODUCTS_DATA', payload: data }),
    addDefaultPrices: (item: DefaultPricesType) =>
      dispatch({ type: 'ADD_DEFAULT_PRICES', payload: item }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CategoryPage);
