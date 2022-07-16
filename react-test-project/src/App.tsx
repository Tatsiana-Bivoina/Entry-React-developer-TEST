import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { client } from '.';
import { getCategoriesQuery } from './queries/categoriesQuery';
import CartPage from './components/cart-page/CartPage';
import CategoryPage from './components/category-page/CategoryPage';
import { Layout } from './components/layout/Layout';
import ProductPage from './components/product-page/ProductPage';
import { CategoriesType } from './types/productTypesList';

export interface AppProps {
  text?: string;
}

type Props = Readonly<AppProps>;

type AppState = {
  categories: string[];
};

class App extends Component<Props, AppState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  async getCategories(): Promise<CategoriesType> {
    const response = await client.query({
      query: getCategoriesQuery(),
    });
    return response.data;
  }

  async componentDidMount() {
    const categoriesArr = (await this.getCategories()).categories.map((el) => el.name);
    this.setState({ categories: categoriesArr });
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout categories={this.state.categories} />}>
          {this.state.categories.length !== 0 && (
            <React.Fragment>
              <Route
                index
                element={<Navigate to={`category/${this.state.categories[0]}`} replace />}
              />
              {this.state.categories.map((el: string, index: number) => (
                <React.Fragment key={index}>
                  <Route path={`category/${el}`} element={<CategoryPage category={el} />} />
                  <Route path={`category/${el}/:id`} element={<ProductPage />} key={index} />
                </React.Fragment>
              ))}
            </React.Fragment>
          )}
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
