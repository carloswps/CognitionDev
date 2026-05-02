import type { QueryObserverResult, UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { TConversationTagsResponse } from 'librechat-data-provider';
import { dataService, QueryKeys } from 'librechat-data-provider';

export const useGetConversationTags = (
  config?: UseQueryOptions<TConversationTagsResponse>,
): QueryObserverResult<TConversationTagsResponse> => {
  return useQuery<TConversationTagsResponse>(
    [QueryKeys.conversationTags],
    () => dataService.getConversationTags(),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      ...config,
    },
  );
};
