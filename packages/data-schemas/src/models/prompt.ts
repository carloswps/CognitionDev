import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import promptSchema from '~/schema/prompt';
import type { IPrompt } from '~/types/prompts';

export function createPromptModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(promptSchema);
  return mongoose.models.Prompt || mongoose.model<IPrompt>('Prompt', promptSchema);
}
