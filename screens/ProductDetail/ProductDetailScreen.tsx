import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/rootNavigator';
import {useProductsContext} from '../../state';

import Animated from 'react-native-reanimated';

type Props = {};

export const ProductDetailScreen: React.FC<Props> = () => {
  const {getProductById} = useProductsContext();
  const {
    params: {productID},
  } = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();

  const product = getProductById(productID);

  if (!product) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <Text>ProductDetailScreen</Text>
      <Animated.Image
        source={{uri: product.image}}
        style={{width: 300, height: 400}}
        sharedTransitionTag={'productImage' + product.id}
      />
    </View>
  );
};
