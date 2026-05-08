import store from '~/store';
import ToggleSwitch from '../../ToggleSwitch';

export default function AutomaticPlaybackSwitch({
  onCheckedChange,
}: {
  onCheckedChange?: (value: boolean) => void;
}) {
  return (
    <ToggleSwitch
      stateAtom={store.automaticPlayback}
      localizationKey={'com_nav_automatic_playback' as const}
      switchId="AutomaticPlayback"
      onCheckedChange={onCheckedChange}
    />
  );
}
