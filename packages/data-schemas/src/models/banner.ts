import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import bannerSchema from '~/schema/banner';
import type { IBanner } from '~/types';

export function createBannerModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(bannerSchema);
  return mongoose.models.Banner || mongoose.model<IBanner>('Banner', bannerSchema);
}
