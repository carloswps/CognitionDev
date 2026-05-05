import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import sessionSchema from '~/schema/session';
import type * as t from '~/types';

export function createSessionModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(sessionSchema);
  return mongoose.models.Session || mongoose.model<t.ISession>('Session', sessionSchema);
}
