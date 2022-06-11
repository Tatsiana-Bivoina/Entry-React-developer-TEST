import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppDispatch, client, RootState } from '../..';
import { CurrenciesDataType } from '../../types/productType';
import { getCurrencyQuery } from './queries';
import styled from 'styled-components';
import './header.scss';

const DropDownContainer = styled('div')``;

const DropDownHeader = styled('div')`
  position: relative;
  width: 114px;
  height: 29px;
  font-weight: 500;
  font-size: 18px;
  color: #1d1f22;
  background: transparent;

  span {
    position: absolute;
    right: 23px;
    top: -1px;
  }

  .select-arrow {
    position: absolute;
    right: 6px;
    top: 10px;
    width: 6px;
    height: 3px;
    background-image: url('../../../arrow-icon.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transform: matrix(1, 0, 0, -1, 0, 0);
  }

  &.active > .select-arrow {
    color: red;
    transform: rotate(0deg);
  }
`;

const DropDownListContainer = styled('div')`
  position: relative;
  right: -60px;
  top: 2px;
`;

const DropDownList = styled('ul')`
  width: 114px;
  padding: 0;
  padding-top: 12px;
  box-sizing: border-box;
  margin: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  background: #ffffff;
  color: #1d1f22;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
`;

const ListItem = styled('li')`
  height: 45px;
  list-style: none;
  padding-left: 21px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
`;

export type Props = Readonly<PropsFromRedux>;

type HeaderState = {
  currency: CurrenciesDataType[];
  isOpen: boolean;
  selectedOption: string;
};

export class Header extends Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currency: [],
      isOpen: false,
      selectedOption: '',
    };
  }

  async getData(): Promise<CurrenciesDataType[]> {
    const response = await client.query({
      query: getCurrencyQuery(),
    });
    return response.data.currencies;
  }

  async componentDidMount() {
    const data = await this.getData();
    this.setState({ currency: data });
  }

  changeCurrency(event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.changeCurrency(event.target.value);
  }

  toggling() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onOptionClicked(value: string) {
    this.setState({ selectedOption: value });
    this.setState({ isOpen: false });
  }

  render() {
    const { selectedOption, isOpen, currency } = this.state;

    return (
      <header className="header">
        <div className="wrapper">
          <div className="header-container">
            <div className="page-navigation">
              <NavLink
                to="/category/all"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                All
              </NavLink>
              <NavLink
                to="/category/clothes"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                Clothes
              </NavLink>
              <NavLink
                to="/category/tech"
                className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
              >
                Tech
              </NavLink>
            </div>
            <div className="logo-container">
              <img src="../../a-logo.png" alt="logo" />
            </div>
            <div className="cart-currency-container">
              <DropDownContainer>
                <DropDownHeader onClick={() => this.toggling()} className={isOpen ? 'active' : ''}>
                  <span>{selectedOption || '$'}</span>
                  <div className="select-arrow" />
                </DropDownHeader>
                {isOpen && (
                  <DropDownListContainer>
                    <DropDownList>
                      {currency.map((el: CurrenciesDataType, index) => (
                        <ListItem onClick={() => this.onOptionClicked(el.symbol)} key={index}>
                          {el.symbol} {el.label}
                        </ListItem>
                      ))}
                    </DropDownList>
                  </DropDownListContainer>
                )}
              </DropDownContainer>
              <div className="cart-container">
                <button className="cart" />
                {this.props.cart.length > 0 && (
                  <span className="cart-product-count">{this.props.cart.length}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    cart: state.cartReducer,
    currency: state.currencyReducer.currentCurrency,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    changeCurrency: (currency: string) => dispatch({ type: 'CHANGE_CURRENCY', payload: currency }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
