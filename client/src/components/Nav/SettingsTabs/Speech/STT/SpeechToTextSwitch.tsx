import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function SpeechToTextSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <ToggleSwitch
      stateAtom={store.speechToText}
      localizationKey={'com_nav_speech_to_text' as const}
      switchId="SpeechToText"
      onCheckedChange={onCheckedChange}
      strongLabel={true}
    />
  );
}
