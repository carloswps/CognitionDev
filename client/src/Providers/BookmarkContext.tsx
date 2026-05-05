import type { TConversationTag } from 'librechat-data-provider';
import { createContext, useContext } from 'react';

type TBookmarkContext = { bookmarks: TConversationTag[] };

export const BookmarkContext = createContext<TBookmarkContext>({
  bookmarks: [],
} as TBookmarkContext);
export const useBookmarkContext = () => useContext(BookmarkContext);
