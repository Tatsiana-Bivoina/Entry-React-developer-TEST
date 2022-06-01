import React, { Component } from 'react';
import Header from './components/header/Header';
import Main from './components/main/Main';
import { data } from './data';
import { ProductType } from './types/ProductType';

export interface AppProps {
  text?: string;
}

type Props = Readonly<AppProps>;

type AppState = {
  cardsData: ProductType[];
};

class App extends Component<Props, AppState> {
  constructor(text: Props) {
    super(text);
    this.state = {
      cardsData: data,
    };
  }

  public render() {
    return (
      <div className="App">
        <Header />
        <Main cardsData={this.state.cardsData} />
      </div>
    );
  }
}

export default App;
