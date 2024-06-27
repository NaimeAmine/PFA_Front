// SearchContext.tsx
import React, { createContext, useState, ReactNode, FC } from 'react';

interface SearchContextProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const defaultState: SearchContextProps = {
  searchValue: '',
  setSearchValue: () => {},
};

export const SearchContext = createContext<SearchContextProps>(defaultState);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
