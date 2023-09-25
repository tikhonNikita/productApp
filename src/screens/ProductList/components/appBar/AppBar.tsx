import React, {useState} from 'react';
import {LayoutAnimation, StyleSheet, TextInput} from 'react-native';
import {Appbar, Searchbar} from 'react-native-paper';

import {useProductsContext} from '../../../../state';

export const AppBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {setFilter, clearFilter} = useProductsContext();

  const ref = React.useRef<TextInput>(null);

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
    setFilter(searchQuery.trim());
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
        <Appbar.Content title="Product List" style={styles.content} />
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingLeft: 50,
  },
});
