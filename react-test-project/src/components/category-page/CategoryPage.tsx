import React, { Component } from 'react';
import { AppDispatch, client } from '../..';
import ProductCardsContainer from '../product-cards-container/ProductCardsContainer';
import { getProductsQuery } from './queries';
import './category-page.scss';
import { CategoryProductsMinResponse } from '../../types/productType';
import { connect, ConnectedProps } from 'react-redux';

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

    return (
      <section className="category-page">
        <div className="wrapper">
          <h1 className="category-title">{category}</h1>
          <ProductCardsContainer />
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getProductsData: (data: CategoryProductsMinResponse[]) =>
      dispatch({ type: 'GET_PRODUCTS_DATA', payload: data }),
  };
};

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CategoryPage);
