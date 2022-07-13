import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../..';
import { CategoryProductsMinResponse } from '../../types/productTypesList';
import ProductCard from '../product-card/ProductCard';
import './product-card-container.scss';

type Props = Readonly<PropsFromRedux>;

export class ProductCardsContainer extends Component<Props> {
  render() {
    return (
      <section className="cards-container">
        {this.props.productsData?.map((el: CategoryProductsMinResponse) => {
          return <ProductCard cardData={el} key={el.id} />;
        })}
      </section>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    productsData: state.productsDataReducer,
  };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ProductCardsContainer);
