import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppDispatch, client, RootState } from '../..';
import { CartDataType, CurrenciesDataType } from '../../types/productType';
import { getCurrencyQuery } from '../../queries/currencyQuery';
import styled from 'styled-components';
import './header.scss';

const DropDownContainer = styled('div')`
  position: relative;
`;

const DropDownHeader = styled('div')`
  position: relative;
  width: 114px;
  height: 29px;
  font-weight: 500;
  font-size: 18px;
  color: #1d1f22;
  background: transparent;

  &:hover {
    cursor: pointer;
  }

  span {
    position: absolute;
    right: 23px;
    top: -1px;
  }

  .select-arrow {
    position: absolute;
    right: 6px;
    top: 8px;
    width: 6px;
    height: 3px;
    background-image: url('icons/arrow-icon.png');
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
  position: absolute;
  right: -59px;
  top: 31px;
  z-index: 10;
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
};

export class Header extends Component<Props, HeaderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currency: [],
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
    this.props.countTotalProductsCount(this.props.productsInCart);
  }

  toggling(): void {
    this.props.toggleCurrencySwitcher(!this.props.isCurrencySwitcherOpen);
  }

  onOptionClicked(value: string) {
    this.props.changeCurrency(value);
    this.props.toggleCurrencySwitcher(false);
  }

  closeModal() {
    this.props.toggleCartModal(false);
    document.body.classList.toggle('scroll-hidden', false);
  }

  render() {
    const { currency } = this.state;
    const {
      toggleCartModal,
      isCartModalOpen,
      isCurrencySwitcherOpen,
      currentCurrency,
      productsInCart,
      totalCount,
      toggleCurrencySwitcher,
    } = this.props;

    return (
      <header
        className="header"
        onClick={() => {
          toggleCurrencySwitcher(false);
          this.closeModal();
        }}
      >
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
              <img src="icons/a-logo.png" alt="logo" />
            </div>
            <div className="cart-currency-container" onClick={(event) => event.stopPropagation()}>
              <DropDownContainer className="drop-down-container">
                <DropDownHeader
                  onClick={() => {
                    this.toggling();
                    this.closeModal();
                  }}
                  className={isCurrencySwitcherOpen ? 'active' : ''}
                >
                  <span>{currentCurrency}</span>
                  <div className="select-arrow" />
                </DropDownHeader>
                {isCurrencySwitcherOpen && (
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
                <button
                  className="cart"
                  onClick={() => {
                    toggleCartModal(!isCartModalOpen);
                    document.body.classList.toggle('scroll-hidden', !isCartModalOpen);
                    toggleCurrencySwitcher(false);
                  }}
                />
                {productsInCart.length > 0 && (
                  <span className="cart-product-count">{totalCount}</span>
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
    currentCurrency: state.currencyReducer.currentCurrency,
    isCartModalOpen: state.modalCartReducer.isCartModalOpen,
    isCurrencySwitcherOpen: state.currencySwitcherReducer.isCurrencySwitcherOpen,
    totalCount: state.totalDataCountReducer.totalProductsCount,
    productsInCart: state.cartReducer,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    changeCurrency: (currency: string) => dispatch({ type: 'CHANGE_CURRENCY', payload: currency }),
    toggleCartModal: (isOpenModal: boolean) =>
      dispatch({ type: 'TOGGLE_MODAL', payload: isOpenModal }),
    toggleCurrencySwitcher: (isCurrencySwitcherOpen: boolean) =>
      dispatch({ type: 'TOGGLE_CURRENCY_SWITCHER', payload: isCurrencySwitcherOpen }),
    countTotalProductsCount: (productsData: CartDataType[]) =>
      dispatch({
        type: 'COUNT_TOTAL_PRODUCTS_COUNT',
        payload: { data: productsData },
      }),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Header);
