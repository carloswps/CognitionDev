import { useRecoilValue } from 'recoil';
import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function AutoTranscribeAudioSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  const speechToText = useRecoilValue(store.speechToText);

  return (
    <ToggleSwitch
      stateAtom={store.autoTranscribeAudio}
      localizationKey={'com_nav_auto_transcribe_audio' as const}
      switchId="AutoTranscribeAudio"
      onCheckedChange={onCheckedChange}
      disabled={!speechToText}
    />
  );
}
