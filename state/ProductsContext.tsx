import * as React from 'react';

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';

import {fetchProducts} from '../api';
import {initialState, ProductsActionKind, reducer} from './productsReducer';
import {Product, ProductsContextType} from './types';

const ProductsContext = createContext<ProductsContextType>({
  error: '',
  loading: false,
  products: [],
  reloadProducts: async () => {},
  setFilter: () => {},
  clearFilter: () => {},
  getProductById: () => undefined,
});

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      'useProductsContext must be used within a ProductsProvider',
    );
  }
  return context;
};

export const ProductsProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [filterValue, setFilterValue] = useState('');
  const [normalizedProducts, setNormalizedProducts] = useState<
    Record<number, Product>
  >({});

  const loadProducts = useCallback(async () => {
    dispatch({type: ProductsActionKind.SET_PRODUCTS_LOADING});
    try {
      const products = await fetchProducts();
      dispatch({type: ProductsActionKind.SET_PRODUCTS, payload: products});
    } catch (error) {
      dispatch({
        type: ProductsActionKind.SET_ERROR,
        payload: 'Error loading products',
      });
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (state.products.length > 0) {
      const normalized = state.products.reduce(
        (acc, product) => ({
          ...acc,
          [product.id]: product,
        }),
        {},
      );
      if (Object.keys(normalized).length > 0) {
        setNormalizedProducts(normalized);
      }
    }
  }, [state.products]);

  const filteredProducts = useMemo(
    () =>
      state.products.filter(p =>
        p.name.toLowerCase().includes(filterValue.toLowerCase()),
      ),
    [filterValue, state.products],
  );

  const setFilter = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterValue('');
  }, []);

  const getProductById = useCallback(
    (id: number) => normalizedProducts[id],
    [normalizedProducts],
  );

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        setFilter,
        clearFilter,
        products: filteredProducts,
        reloadProducts: loadProducts,
        getProductById,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
