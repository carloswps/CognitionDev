import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import presetSchema, { type IPreset } from '~/schema/preset';

export function createPresetModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(presetSchema);
  return mongoose.models.Preset || mongoose.model<IPreset>('Preset', presetSchema);
}
