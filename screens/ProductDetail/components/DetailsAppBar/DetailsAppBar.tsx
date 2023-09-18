import React, {ReactNode} from 'react';
import {Appbar} from 'react-native-paper';
import {useProductsContext} from '../../../../state';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

export const DetailsAppBar: (
  props: NativeStackHeaderProps,
) => ReactNode = props => {
  const params = props.route.params as {productID: number};

  const {getProductById} = useProductsContext();
  const product = getProductById(params.productID);

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={goBack} />
      <Appbar.Content title={product?.name ?? ''} />
    </Appbar.Header>
  );
};
