export interface ApolloQueryResultType {
  category: AllProductsMinResponse;
}

export interface PriceType {
  currency: {
    label: string;
    symbol: string;
  };
  amount: number;
}

export interface ItemType {
  displayValue: string;
  value: string;
}

export interface AttributesType {
  name: string;
  type: string;
  items: ItemType[];
}

export interface CategoryProductsMinResponse {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: PriceType[];
  category: string;
}

export interface ProductDataType {
  id: string;
  category: string;
  name: string;
  gallery: string[];
  description: string;
  attributes: AttributesType[];
  brand: string;
  prices: PriceType[];
}

export interface CurrenciesDataType {
  label: string;
  symbol: string;
}

export interface CurrencyType {
  currentCurrency: string;
}

export interface AllProductsMinResponse {
  name: string;
  products: CategoryProductsMinResponse[];
}

export interface activeAttributesType {
  activeColor: string;
  activeCapacity: string;
  activeSize: string;
  activeWithUSBPorts: string;
  activeTouchId: string;
}

export interface CartDataType extends ProductDataType {
  generatedId: string;
  activeAttributes: activeAttributesType;
  amount: number;
}

export interface TotalDataCount {
  totalPrice: number;
  totalProductsCount: number;
  tax: number;
}

export interface DefaultPricesType {
  id: string;
  prices: PriceType[];
}
