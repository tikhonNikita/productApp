import React from 'react';
import {RefreshControl} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {Product, useProductsContext} from '../../../../state';
import {getItemLayout, ProductCard} from './productCard';
import {Text} from 'react-native-paper';

const HEADER_HEIGHT = 75;

type HeaderProps = {
  style: ReturnType<typeof useAnimatedStyle>;
};
const Header: React.FC<HeaderProps> = ({style}) => {
  return (
    <Animated.View
      style={[
        {height: HEADER_HEIGHT, width: '100%', backgroundColor: 'green'},
        style,
      ]}>
      <Text>HEADER</Text>
    </Animated.View>
  );
};

const renderItem = ({item}: {item: Product}) => <ProductCard product={item} />;
const keyExtractor = (item: Product) => item.id.toString();

const ProductList: React.FC = () => {
  const {loading, products, reloadProducts} = useProductsContext();

  const scrollClamp = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollClamp.value = event.contentOffset.y;
    },
  });

  const animatedMargin = useAnimatedStyle(() => {
    const interpolateY = interpolate(
      scrollClamp.value,
      [10, HEADER_HEIGHT * 1.1],
      [0, HEADER_HEIGHT],
      Extrapolate.CLAMP,
    );

    return {
      paddingTop: interpolateY,
    };
  });

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      data={products}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      ListHeaderComponent={() => <Header style={animatedMargin} />}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={reloadProducts} />
      }
    />
  );
};

export default ProductList;
