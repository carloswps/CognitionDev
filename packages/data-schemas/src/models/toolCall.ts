import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import toolCallSchema, { type IToolCallData } from '~/schema/toolCall';

export function createToolCallModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(toolCallSchema);
  return mongoose.models.ToolCall || mongoose.model<IToolCallData>('ToolCall', toolCallSchema);
}
