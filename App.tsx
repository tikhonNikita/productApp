import React from 'react';

import {RootNavigator} from './navigation/rootNavigator';
import {ProductsProvider} from './state/ProductsContext';

function App(): Element {
  return (
    <ProductsProvider>
      <RootNavigator />
    </ProductsProvider>
  );
}

export default App;
