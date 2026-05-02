import { Button, TooltipAnchor } from '@librechat/client';
import type { TPromptGroup } from 'librechat-data-provider';
import {
  PermissionBits,
  Permissions,
  PermissionTypes,
  ResourceType,
  SystemRoles,
} from 'librechat-data-provider';
import { Share2Icon } from 'lucide-react';
import React from 'react';
import { GenericGrantAccessDialog } from '~/components/Sharing';
import { useAuthContext, useHasAccess, useLocalize, useResourcePermissions } from '~/hooks';

const SharePrompt = React.memo(
  ({ group, disabled }: { group?: TPromptGroup; disabled: boolean }) => {
    const { user } = useAuthContext();
    const localize = useLocalize();

    // Check if user has permission to share prompts
    const hasAccessToSharePrompts = useHasAccess({
      permissionType: PermissionTypes.PROMPTS,
      permission: Permissions.SHARE,
    });

    // Check user's permissions on this specific promptGroup
    // The query will be disabled if groupId is empty
    const groupId = group?._id || '';
    const { hasPermission, isLoading: permissionsLoading } = useResourcePermissions(
      ResourceType.PROMPTGROUP,
      groupId,
    );

    // Early return if no group
    if (!group || !groupId) {
      return null;
    }

    const canShareThisPrompt = hasPermission(PermissionBits.SHARE);

    const shouldShowShareButton =
      (group.author === user?.id || user?.role === SystemRoles.ADMIN || canShareThisPrompt) &&
      hasAccessToSharePrompts &&
      !permissionsLoading;

    if (!shouldShowShareButton) {
      return null;
    }

    return (
      <GenericGrantAccessDialog
        resourceDbId={groupId}
        resourceName={group.name}
        resourceType={ResourceType.PROMPTGROUP}
        disabled={disabled}
      >
        <TooltipAnchor
          description={localize('com_ui_share')}
          side="bottom"
          render={
            <Button
              variant="outline"
              size="icon"
              className="size-9 border-border-medium"
              aria-label={localize('com_ui_share')}
              disabled={disabled}
            >
              <Share2Icon className="size-5" aria-hidden="true" />
            </Button>
          }
        />
      </GenericGrantAccessDialog>
    );
  },
);

SharePrompt.displayName = 'SharePrompt';

export default SharePrompt;
