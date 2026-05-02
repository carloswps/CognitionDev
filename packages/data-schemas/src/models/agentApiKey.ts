import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import agentApiKeySchema, { type IAgentApiKey } from '~/schema/agentApiKey';

export function createAgentApiKeyModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(agentApiKeySchema);
  return (
    mongoose.models.AgentApiKey || mongoose.model<IAgentApiKey>('AgentApiKey', agentApiKeySchema)
  );
}
