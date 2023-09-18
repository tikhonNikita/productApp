import React from 'react';
import {Card, Text} from 'react-native-paper';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import {StyleSheet} from 'react-native';


import {RootStackParamList} from '../../navigation/rootNavigator';
import {useProductsContext} from '../../state';

import {ProductNotFound} from '../../components';

type Props = {};

type ScreenNavigationProp = NavigationProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC<Props> = () => {
  const {getProductById} = useProductsContext();

  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    params: {productID},
  } = useRoute<RouteProp<RootStackParamList, 'ProductDetail'>>();

  const product = getProductById(productID);

  if (!product) {
    return <ProductNotFound goBack={navigation.goBack} />;
  }

  return (
    <Card>
      <Animated.Image
        source={{uri: product.image}}
        style={styles.imageCover}
        sharedTransitionTag={'productImage' + product.id}
      />
      <Card.Title title={product.name} />
      <Card.Content>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <Text variant="bodyMedium">{product.description}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  imageCover: {
    width: '100%',
    height: 400,
  },
  productPrice: {
    color: 'green',
  },
});
