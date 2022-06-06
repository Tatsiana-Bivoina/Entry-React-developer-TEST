export type ApolloQueryResultType = {
  category: AllProductsMinResponse;
};

export type PriceType = {
  currency: {
    label: string;
    symbol: string;
  };
  amount: number;
};

export type ItemType = {
  displayValue: string;
  value: string;
};

export type AttributesType = {
  name: string;
  type: string;
  items: ItemType[];
};

export type CategoryProductsMinResponse = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  prices: PriceType[];
  category: string;
};

export type ProductDataType = {
  id: string;
  category: string;
  name: string;
  gallery: string[];
  description: string;
  attributes: AttributesType[];
  brand: string;
  prices: PriceType[];
};

export type AllProductsMinResponse = {
  name: string;
  products: CategoryProductsMinResponse[];
};
