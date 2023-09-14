import {Product} from '../state/types';

const PRODUCTS_URI =
  'https://dev-autibfbfinllwfr.api.raw-labs.com/your/endpoint/path';

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(PRODUCTS_URI);
  const products: Product[] = await response.json();
  return products;
};
