import React, {useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  RefreshControl,
  TextInput,
} from 'react-native';

import {Product, useProductsContext} from '../../../../state';
import {getItemLayout, ProductCard} from './productCard';
import {Appbar, Searchbar} from 'react-native-paper';

const Header: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = React.useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Appbar.Header>
      <Searchbar
        onIconPress={() => {
          LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.linear,
            duration: 200,
          });
          setIsExpanded(true);
          ref.current?.focus();
        }}
        onChangeText={setSearchQuery}
        ref={ref}
        inputStyle={{
          height: 30,
        }}
        value={searchQuery}
        onBlur={() => {
          setSearchQuery('');
          setIsExpanded(false);
        }}
        style={{width: isExpanded ? '100%' : 0}}
      />
      {!isExpanded && (
        <Appbar.Content title="Product List" style={{paddingLeft: 50}} />
      )}
    </Appbar.Header>
  );
};

const renderItem = ({item}: {item: Product}) => <ProductCard product={item} />;
const keyExtractor = (item: Product) => item.id.toString();

const ProductList: React.FC = () => {
  const {loading, products, reloadProducts} = useProductsContext();

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={<Header />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reloadProducts} />
      }
    />
  );
};

export default ProductList;
