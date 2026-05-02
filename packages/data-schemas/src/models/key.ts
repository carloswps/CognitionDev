import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import keySchema, { type IKey } from '~/schema/key';

export function createKeyModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(keySchema);
  return mongoose.models.Key || mongoose.model<IKey>('Key', keySchema);
}
