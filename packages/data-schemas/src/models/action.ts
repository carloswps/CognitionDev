import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import actionSchema from '~/schema/action';
import type { IAction } from '~/types';

export function createActionModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(actionSchema);
  return mongoose.models.Action || mongoose.model<IAction>('Action', actionSchema);
}
