import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';

import {Product, useProductsContext} from '../../../../state';
import {getItemLayout, ProductCard} from './productCard';

const renderItem = ({item}: {item: Product}) => <ProductCard product={item} />;
const keyExtractor = (item: Product) => item.id.toString();

const ProductList: React.FC = () => {
  const {loading, products, reloadProducts} = useProductsContext();

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reloadProducts} />
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
});

export default ProductList;
