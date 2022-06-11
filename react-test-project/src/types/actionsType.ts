import { CartDataType, CategoryProductsMinResponse } from './productType';

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
