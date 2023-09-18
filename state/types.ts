export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type ProductsContextType = {
  error: string;
  loading: boolean;
  products: Product[];
  reloadProducts: () => Promise<void>;
  setFilter: (value: string) => void;
  clearFilter: () => void;
  getProductById: (id: number) => Product | undefined;
};

export type ProductsState = {
  error: string;
  loading: boolean;
  products: Product[];
};

export type ProductsFilteredContextType = {
  filteredProducts: Product[];
  handleFilterChange: (value: string) => void;
  clearFilter: () => void;
  loading: boolean;
  error: string;
};
