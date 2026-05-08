import type React from 'react';
import { useChatHelpers } from '~/hooks';
import { ChatContext } from '~/Providers';

/**
 * Minimal marketplace provider that provides only what SidePanel actually needs
 * Replaces the bloated 44-function ChatContext implementation
 */
interface MarketplaceProviderProps {
  children: React.ReactNode;
}

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({ children }) => {
  const chatHelpers = useChatHelpers(0, 'new');

  return <ChatContext.Provider value={chatHelpers}>{children}</ChatContext.Provider>;
};
