import { applyTenantIsolation } from '~/models/plugins/tenantIsolation';
import transactionSchema, { type ITransaction } from '~/schema/transaction';

export function createTransactionModel(mongoose: typeof import('mongoose')) {
  applyTenantIsolation(transactionSchema);
  return (
    mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', transactionSchema)
  );
}
