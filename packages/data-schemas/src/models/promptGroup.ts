import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import promptGroupSchema from '~/schema/promptGroup';
import type { IPromptGroupDocument } from '~/types/prompts';

export function createPromptGroupModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(promptGroupSchema);
  return (
    mongoose.models.PromptGroup ||
    mongoose.model<IPromptGroupDocument>('PromptGroup', promptGroupSchema)
  );
}
