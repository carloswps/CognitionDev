import type { UIResource } from 'librechat-data-provider';
import React, { useMemo } from 'react';
import { useConversationUIResources } from '~/hooks/Messages/useConversationUIResources';
import { useOptionalMessagesConversation } from '~/Providers';
import UIResourceCarousel from '../Chat/Messages/Content/UIResourceCarousel';

interface MCPUIResourceCarouselProps {
  node: {
    properties: {
      resourceIds?: string[];
    };
  };
}

/** Renders multiple MCP UI resources in a carousel. Works in chat, share, and search views. */
export function MCPUIResourceCarousel(props: MCPUIResourceCarouselProps) {
  const { conversationId } = useOptionalMessagesConversation();

  const conversationResourceMap = useConversationUIResources(conversationId ?? undefined);

  const uiResources = useMemo(() => {
    const { resourceIds = [] } = props.node.properties;

    return resourceIds.map((id) => conversationResourceMap.get(id)).filter(Boolean) as UIResource[];
  }, [props.node.properties, conversationResourceMap]);

  if (uiResources.length === 0) {
    return null;
  }

  return <UIResourceCarousel uiResources={uiResources} />;
}
