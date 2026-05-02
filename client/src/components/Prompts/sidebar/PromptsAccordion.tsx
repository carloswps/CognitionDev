import { SystemRoles } from 'librechat-data-provider';
import { AdminSettings } from '~/components/Prompts';
import { useAuthContext } from '~/hooks';
import AutoSendPrompt from '../buttons/AutoSendPrompt';
import FilterPrompts from './FilterPrompts';
import PromptSidePanel from './GroupSidePanel';

export default function PromptsAccordion() {
  const { user } = useAuthContext();
  return (
    <PromptSidePanel className="space-y-2">
      <FilterPrompts />
      {user?.role === SystemRoles.ADMIN && <AdminSettings />}
      <AutoSendPrompt />
    </PromptSidePanel>
  );
}
