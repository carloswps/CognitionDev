import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import groupSchema from '~/schema/group';
import type * as t from '~/types';

export function createGroupModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(groupSchema);
  return mongoose.models.Group || mongoose.model<t.IGroup>('Group', groupSchema);
}
