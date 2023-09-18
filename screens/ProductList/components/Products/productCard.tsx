import React from 'react';

import {Card, Text, Button} from 'react-native-paper';
import {Dimensions, StyleSheet, View} from 'react-native';

import {Product} from '../../../../state';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../navigation/rootNavigator';
import Animated from 'react-native-reanimated';

const width = Dimensions.get('window').width;

const ITEM_HEIGHT = 300;

export const getItemLayout = (data: unknown, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

type ScreenNavigationProp = NavigationProp<RootStackParamList, 'ProductList'>;

const _ProductCard = ({product}: {product: Product}) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const goToDetails = () =>
    navigation.navigate('ProductDetail', {productID: product.id});

  return (
    <Card style={styles.productContainer}>
      <Animated.Image
        source={{uri: product.image}}
        style={styles.productImage}
        sharedTransitionTag={'productImage' + product.id}
      />
      <View style={styles.cardContent}>
        <Card.Content style={styles.productInfo}>
          <Text variant="titleLarge" ellipsizeMode={'tail'} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={goToDetails}>Details</Button>
        </Card.Actions>
      </View>
    </Card>
  );
};

export const ProductCard = React.memo(_ProductCard);

const styles = StyleSheet.create({
  imageSurface: {
    borderRadius: 10,
    height: 200,
  },
  productContainer: {
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 20,
    alignSelf: 'center',
    borderRadius: 5,
    width: width - 40,
    height: 300,
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
  productInfo: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    maxWidth: '65%',
  },
  productPrice: {
    marginTop: 10,
    color: 'green',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
