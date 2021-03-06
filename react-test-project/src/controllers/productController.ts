import {
  ActiveAttributesType,
  CartDataType,
  PriceType,
  ProductDataType,
} from '../types/productTypesList';

export function chooseClassName(name: string, index: number, data: ActiveAttributesType): string {
  if (name === 'Size') {
    if (data.activeSize === index.toString()) {
      return 'attribute-btn active';
    }
  }
  if (name === 'Capacity') {
    if (data.activeCapacity === index.toString()) {
      return 'attribute-btn active';
    }
  }
  if (name === 'With USB 3 ports') {
    if (data.activeWithUSBPorts === index.toString()) {
      return 'attribute-btn active';
    }
  }
  if (name === 'Touch ID in keyboard') {
    if (data.activeTouchId === index.toString()) {
      return 'attribute-btn active';
    }
  }
  return 'attribute-btn';
}

export function changeProductCurrencyIndex(data: ProductDataType, currentCurrancy: string): number {
  return data.prices.findIndex((elem: PriceType) => elem.currency.symbol === currentCurrancy);
}

export const getLocalStorageCartData = (): CartDataType[] | null => {
  const cartData: string | null = localStorage.getItem('productsInCart');
  if (cartData == null) {
    return cartData;
  }
  return JSON.parse(cartData);
};
