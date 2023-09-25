import React from 'react';
import {Platform, UIManager} from 'react-native';

import {RootNavigator} from './navigation/rootNavigator';
import {ProductsProvider} from './state';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function App(): Element {
  return (
    <ProductsProvider>
      <RootNavigator />
    </ProductsProvider>
  );
}

export default App;
