import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import conversationTagSchema, { type IConversationTag } from '~/schema/conversationTag';

export function createConversationTagModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(conversationTagSchema);
  return (
    mongoose.models.ConversationTag ||
    mongoose.model<IConversationTag>('ConversationTag', conversationTagSchema)
  );
}
