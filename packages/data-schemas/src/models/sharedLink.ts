import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import shareSchema, { type ISharedLink } from '~/schema/share';

export function createSharedLinkModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(shareSchema);
  return mongoose.models.SharedLink || mongoose.model<ISharedLink>('SharedLink', shareSchema);
}
