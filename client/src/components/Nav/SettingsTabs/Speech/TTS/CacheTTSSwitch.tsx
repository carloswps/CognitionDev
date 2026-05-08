import { useRecoilValue } from 'recoil';
import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function CacheTTSSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const textToSpeech = useRecoilValue(store.textToSpeech);

  return (
    <ToggleSwitch
      stateAtom={store.cacheTTS}
      localizationKey={'com_nav_enable_cache_tts' as const}
      switchId="CacheTTS"
      onCheckedChange={onCheckedChange}
      disabled={!textToSpeech}
    />
  );
}
