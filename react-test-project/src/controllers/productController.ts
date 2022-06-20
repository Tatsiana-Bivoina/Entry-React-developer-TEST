import { activeAttributesType, PriceType, ProductDataType } from '../types/productType';

export function chooseClassName(name: string, index: number, data: activeAttributesType): string {
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
