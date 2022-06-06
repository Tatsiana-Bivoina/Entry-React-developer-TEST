import React, { Component } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CategoryPage from './components/category-page/CategoryPage';
import { Layout } from './components/layout/Layout';
import ProductPage from './components/product-page/ProductPage';

export interface AppProps {
  text?: string;
}

type Props = Readonly<AppProps>;

type AppState = {
  category: {
    all: string;
    clothes: string;
    tech: string;
  };
};

class App extends Component<Props, AppState> {
  constructor(text: Props) {
    super(text);
    this.state = {
      category: {
        all: 'all',
        clothes: 'clothes',
        tech: 'tech',
      },
    };
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="category/all" replace />} />
          <Route
            path="category/all"
            element={<CategoryPage category={this.state.category.all} />}
          />
          <Route path="category/all/:id" element={<ProductPage />} />
          <Route
            path="category/clothes"
            element={<CategoryPage category={this.state.category.clothes} />}
          />
          <Route path="category/clothes/:id" element={<ProductPage />} />
          <Route
            path="category/tech"
            element={<CategoryPage category={this.state.category.tech} />}
          />
          <Route path="category/tech/:id" element={<ProductPage />} />
        </Route>
      </Routes>
    );
  }
}

export default App;
