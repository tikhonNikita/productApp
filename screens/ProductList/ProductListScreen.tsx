import React from 'react';
import { SafeAreaView, View } from "react-native";

import {useProductsContext} from '../../state';
import ProductList from './components/Products';

export const ProductListScreen = () => {
  const {loading, products, getProductById} = useProductsContext();
  console.log('LOADING', loading);
  console.log(
    'PRD',
    products.map(p => p.name),
  );

  console.log('BY ID', getProductById(1));

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <ProductList />
    </View>
  );
};
