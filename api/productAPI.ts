import {Product} from '../state/types';

const PRODUCTS_URI =
  'https://dev-autibfbfinllwfr.api.raw-labs.com/your/endpoint/path';

type ProductResponse = {
  products: Product[];
};

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_URI);
  const productResponse: ProductResponse = await response.json();
  return productResponse.products;
};
