import {useCallback, useMemo, useState} from 'react';
import {Product} from '../types';

export const useFilteredProducts = (products: Product[]) => {
  const [filterValue, setFilterValue] = useState('');

  const filteredProducts = useMemo(
    () =>
      products.filter(p =>
        p.name.toLowerCase().includes(filterValue.toLowerCase()),
      ),
    [filterValue, products],
  );

  const setFilter = useCallback((value: string) => {
    setFilterValue(value);
  }, []);

  const clearFilter = useCallback(() => {
    setFilterValue('');
  }, []);

  return {
    filteredProducts,
    setFilter,
    clearFilter,
  };
};
