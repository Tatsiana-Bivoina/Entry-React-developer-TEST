import { CartDataType, CategoryProductsMinResponse, DefaultPricesType } from './productType';

export type CategoryProductsActionType = {
  type: string;
  payload: CategoryProductsMinResponse[];
};

export type CurrentProductActionType = {
  type: string;
  payload: string;
};

export type CartActionType = {
  type: string;
  payload: CartDataType;
};

export type CurrencyActionType = {
  type: string;
  payload: string;
};

export type ModalCartActionType = {
  type: string;
  payload: boolean;
};

export type TotalDataCountActionType = {
  type: string;
  payload: {
    data: CartDataType[];
    currencyIndex: number;
  };
};

export type DefaultPriceActionType = {
  type: string;
  payload: DefaultPricesType;
};

export type ResetTotalDataCountActionType = {
  type: 'RESET_TOTAL_DATA_COUNT';
};

export type ClearCartActionType = {
  type: 'CLEAR_CART';
};
