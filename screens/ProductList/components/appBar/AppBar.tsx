import React, {useState} from 'react';
import {LayoutAnimation, TextInput} from 'react-native';

import {useProductsContext} from '../../../../state';
import {Appbar, Searchbar} from 'react-native-paper';

export const AppBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const ref = React.useRef<TextInput>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {setFilter, clearFilter} = useProductsContext();

  const expandSearchInput = () => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.linear,
      duration: 300,
    });
    setIsExpanded(true);
    ref.current?.focus();
  };

  const clearInput = () => {
    setSearchQuery('');
    clearFilter();
    setIsExpanded(false);
  };

  const onSubmit = () => {
    setFilter(searchQuery);
  };

  const handleBlur = () => {
    if (searchQuery.length === 0) {
      setIsExpanded(false);
    }
  };

  return (
    <Appbar.Header>
      <Searchbar
        onSubmitEditing={onSubmit}
        onIconPress={expandSearchInput}
        onChangeText={setSearchQuery}
        onBlur={handleBlur}
        ref={ref}
        onClearIconPress={clearInput}
        value={isExpanded ? searchQuery : ''}
        style={{width: isExpanded ? '100%' : 0}}
      />
      {!isExpanded && (
        <Appbar.Content title="Product List" style={{paddingLeft: 50}} />
      )}
    </Appbar.Header>
  );
};
