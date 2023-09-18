import React from 'react';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import {Product} from '../../../../state';

type ProductListProps = {
  products: Product[];
};

const ProductList: React.FC<ProductListProps> = ({products}) => {
  const renderItem = ({item}: {item: Product}) => (
    <View style={styles.productContainer}>
      <Image source={{uri: item.image}} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDescription: {
    marginVertical: 5,
  },
  productPrice: {
    marginTop: 5,
    color: 'green',
  },
});

export default ProductList;
