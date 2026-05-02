import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import tokenSchema from '~/schema/token';
import type * as t from '~/types';

export function createTokenModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(tokenSchema);
  return mongoose.models.Token || mongoose.model<t.IToken>('Token', tokenSchema);
}
