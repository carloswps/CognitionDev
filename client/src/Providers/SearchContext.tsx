import type { SearchResultData } from 'librechat-data-provider';
import { createContext, useContext } from 'react';

type SearchContext = {
  searchResults?: { [key: string]: SearchResultData };
};

export const SearchContext = createContext<SearchContext>({} as SearchContext);
export const useSearchContext = () => useContext(SearchContext);
