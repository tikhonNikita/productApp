import React from 'react';

import {RootNavigator} from './navigation/rootNavigator';
import {ProductsProvider} from './state/ProductsContext';
import { Platform, UIManager } from "react-native";

function App(): Element {
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  return (
    <ProductsProvider>
      <RootNavigator />
    </ProductsProvider>
  );
}

export default App;
