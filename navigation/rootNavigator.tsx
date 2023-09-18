import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ProductDetailScreen, ProductList, DetailsAppBar} from '../screens';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: {productID: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'ProductList'}>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{
            header: DetailsAppBar,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
