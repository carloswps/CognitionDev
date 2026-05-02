import { useRecoilValue } from 'recoil';
import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function CloudBrowserVoicesSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const textToSpeech = useRecoilValue(store.textToSpeech);

  return (
    <ToggleSwitch
      stateAtom={store.cloudBrowserVoices}
      localizationKey={'com_nav_enable_cloud_browser_voice' as const}
      switchId="CloudBrowserVoices"
      onCheckedChange={onCheckedChange}
      disabled={!textToSpeech}
    />
  );
}
