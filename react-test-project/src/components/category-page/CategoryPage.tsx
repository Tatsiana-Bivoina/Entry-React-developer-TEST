import React, { Component } from 'react';
import { AppDispatch, client, RootState } from '../..';
import ProductCardsContainer from '../product-cards-container/ProductCardsContainer';
import { getProductsQuery } from '../../queries/productsQuery';
import { CategoryProductsMinResponse } from '../../types/productTypesList';
import { connect, ConnectedProps } from 'react-redux';
import ModalCartContainer from '../modal-cart-container/ModalCartContainer';
import './category-page.scss';
import QuickShopPLP from '../quick-shop/QuickShopPLP';

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
    const data: CategoryProductsMinResponse[] = await this.getData();
    this.props.getProductsData(data);
  }

  async componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.category !== this.props.category) {
      const data: CategoryProductsMinResponse[] = await this.getData();
      this.props.getProductsData(data);
    }
  }

  render() {
    const { category } = this.props;
    const { isCartModalOpen, toggleCurrencySwitcher, isQuickShopPLPModalOpen } = this.props;

    return (
      <>
        {isCartModalOpen && <ModalCartContainer />}
        {isQuickShopPLPModalOpen && <QuickShopPLP />}
        <section
          className="category-page"
          onClick={() => {
            toggleCurrencySwitcher(false);
          }}
        >
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
    isQuickShopPLPModalOpen: state.quickShopReducer.isQuickShopPLPModalOpen,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    getProductsData: (data: CategoryProductsMinResponse[]) =>
      dispatch({ type: 'GET_PRODUCTS_DATA', payload: data }),
    toggleCurrencySwitcher: (isCurrencySwitcherOpen: boolean) =>
      dispatch({ type: 'TOGGLE_CURRENCY_SWITCHER', payload: isCurrencySwitcherOpen }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(CategoryPage);
