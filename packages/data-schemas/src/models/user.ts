import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import userSchema from '~/schema/user';
import type * as t from '~/types';

export function createUserModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(userSchema);
  return mongoose.models.User || mongoose.model<t.IUser>('User', userSchema);
}
