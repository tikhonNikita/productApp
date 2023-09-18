import React, {useMemo} from 'react';
import {FlatList, RefreshControl} from 'react-native';

import {Product, useProductsContext} from '../../../../state';
import {getItemLayout, ProductCard} from './productCard';
import {AppBar} from '../appBar';
import {ListEmptyComponent} from '../ListEmptyComponent/ListEmptyComponent';

const renderItem = ({item}: {item: Product}) => <ProductCard product={item} />;
const keyExtractor = (item: Product) => item.id.toString();

const _ProductList: React.FC = () => {
  const {loading, products, reloadProducts} = useProductsContext();

  const EmptyList = useMemo(
    () => () => <ListEmptyComponent loading={loading} />,
    [loading],
  );

  return (
    <FlatList
      keyboardDismissMode={'on-drag'}
      showsVerticalScrollIndicator={false}
      data={products}
      ListEmptyComponent={EmptyList}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={<AppBar />}
      refreshControl={
        <RefreshControl
          refreshing={loading && products.length > 0}
          onRefresh={reloadProducts}
        />
      }
    />
  );
};

export const ProductList = React.memo(_ProductList);
