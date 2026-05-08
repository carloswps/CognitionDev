import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import fileSchema from '~/schema/file';
import type { IMongoFile } from '~/types';

export function createFileModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(fileSchema);
  return mongoose.models.File || mongoose.model<IMongoFile>('File', fileSchema);
}
