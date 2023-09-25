import {Product, ProductsState} from './types';

const isProducts = (payload: any): payload is Product[] => {
  return Array.isArray(payload);
};

const isErrorMessage = (payload: any): payload is string => {
  return typeof payload === 'string';
};

export enum ProductsActionKind {
  SET_PRODUCTS = 'SET_PRODUCTS',
  SET_ERROR = 'SET_ERROR',
  SET_PRODUCTS_LOADING = 'SET_PRODUCTS_LOADING',
}

// An interface for our actions
type ProductsAction = {
  type: ProductsActionKind;
  payload?: Product[] | string;
};

export const reducer = (
  state: ProductsState,
  action: ProductsAction,
): ProductsState => {
  switch (action.type) {
    case ProductsActionKind.SET_PRODUCTS:
      if (!isProducts(action.payload)) {
        throw new Error('Payload is not an array of products');
      }

      return {
        error: '',
        loading: false,
        products: action.payload,
      };
    case ProductsActionKind.SET_PRODUCTS_LOADING:
      return {
        ...state,
        error: '',
        loading: true,
      };
    case ProductsActionKind.SET_ERROR:
      if (!isErrorMessage(action.payload)) {
        throw new Error('Payload is not an error message');
      }
      return {
        error: action.payload,
        loading: false,
        products: [],
      };
    default: {
      return state;
    }
  }
};

export const initialState = {
  error: '',
  loading: false,
  products: [],
};
