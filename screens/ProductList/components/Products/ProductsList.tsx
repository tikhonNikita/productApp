import React from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {Product, useProductsContext} from '../../../../state';
import {getItemLayout, ProductCard} from './productCard';
import {AppBar} from '../appBar';
import {ProductNotFound} from '../../../../components';

const renderItem = ({item}: {item: Product}) => <ProductCard product={item} />;
const keyExtractor = (item: Product) => item.id.toString();

const _ProductList: React.FC = () => {
  const {loading, products, reloadProducts} = useProductsContext();

  return (
    <FlatList
      keyboardDismissMode={'on-drag'}
      showsVerticalScrollIndicator={false}
      data={products}
      ListEmptyComponent={ProductNotFound}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={<AppBar />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reloadProducts} />
      }
    />
  );
};

export const ProductList = React.memo(_ProductList);
