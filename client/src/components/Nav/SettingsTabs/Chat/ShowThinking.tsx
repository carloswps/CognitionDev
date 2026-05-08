import { ESide, InfoHoverCard, Switch } from '@librechat/client';
import { useAtom } from 'jotai';
import { useLocalize } from '~/hooks';
import { showThinkingAtom } from '~/store/showThinking';

export default function SaveDraft({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const [showThinking, setShowThinking] = useAtom(showThinkingAtom);
  const localize = useLocalize();

  const handleCheckedChange = (value: boolean) => {
    setShowThinking(value);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div>{localize('com_nav_show_thinking')}</div>
        <InfoHoverCard side={ESide.Bottom} text={localize('com_nav_info_show_thinking')} />
      </div>
      <Switch
        id="showThinking"
        checked={showThinking}
        onCheckedChange={handleCheckedChange}
        className="ml-4"
        data-testid="showThinking"
        aria-label={localize('com_nav_show_thinking')}
      />
    </div>
  );
}
