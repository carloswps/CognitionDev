import type { DynamicSettingProps } from 'librechat-data-provider';
import { ComponentTypes } from 'librechat-data-provider';
import {
  DynamicCheckbox,
  DynamicCombobox,
  DynamicDropdown,
  DynamicInput,
  DynamicSlider,
  DynamicSwitch,
  DynamicTags,
  DynamicTextarea,
} from './';

export const componentMapping: Record<
  ComponentTypes,
  React.ComponentType<DynamicSettingProps> | undefined
> = {
  [ComponentTypes.Slider]: DynamicSlider,
  [ComponentTypes.Dropdown]: DynamicDropdown,
  [ComponentTypes.Switch]: DynamicSwitch,
  [ComponentTypes.Textarea]: DynamicTextarea,
  [ComponentTypes.Input]: DynamicInput,
  [ComponentTypes.Checkbox]: DynamicCheckbox,
  [ComponentTypes.Tags]: DynamicTags,
  [ComponentTypes.Combobox]: DynamicCombobox,
};
