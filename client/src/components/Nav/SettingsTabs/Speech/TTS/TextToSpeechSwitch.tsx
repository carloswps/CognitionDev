import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function TextToSpeechSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <ToggleSwitch
      stateAtom={store.textToSpeech}
      localizationKey={'com_nav_text_to_speech' as const}
      switchId="TextToSpeech"
      onCheckedChange={onCheckedChange}
      strongLabel={true}
    />
  );
}
