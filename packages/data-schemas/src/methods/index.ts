/* Permissions */
import { type AccessRoleMethods, createAccessRoleMethods } from './accessRole';
import { type AclEntryMethods, createAclEntryMethods, permissionBitSupersets } from './aclEntry';
/* Tier 1 — Simple CRUD */
import { type ActionMethods, createActionMethods } from './action';
/* Tier 5 — Agent */
import { type AgentDeps, type AgentMethods, createAgentMethods } from './agent';
/* Agent API Keys */
import { type AgentApiKeyMethods, createAgentApiKeyMethods } from './agentApiKey';
/* Agent Categories */
import { type AgentCategoryMethods, createAgentCategoryMethods } from './agentCategory';
import { type AssistantMethods, createAssistantMethods } from './assistant';
import { type BannerMethods, createBannerMethods } from './banner';
import { type CategoriesMethods, createCategoriesMethods } from './categories';
/* Config */
import { type ConfigMethods, createConfigMethods } from './config';
import { type ConversationMethods, createConversationMethods } from './conversation';
/* Tier 2 — Moderate (service deps injected) */
import { type ConversationTagMethods, createConversationTagMethods } from './conversationTag';
import { createFileMethods, type FileMethods } from './file';
import { createKeyMethods, type KeyMethods } from './key';
/* MCP Servers */
import { createMCPServerMethods, type MCPServerMethods } from './mcpServer';
/* Memories */
import { createMemoryMethods, type MemoryMethods } from './memory';
import { createMessageMethods, type MessageMethods } from './message';
/* Plugin Auth */
import { createPluginAuthMethods, type PluginAuthMethods } from './pluginAuth';
import { createPresetMethods, type PresetMethods } from './preset';
import { createPromptMethods, type PromptDeps, type PromptMethods } from './prompt';
import type { RoleDeps, RoleMethods } from './role';
import { createRoleMethods, RoleConflictError } from './role';
import { createSessionMethods, DEFAULT_REFRESH_TOKEN_EXPIRY, type SessionMethods } from './session';
import { createShareMethods, type ShareMethods } from './share';
import { createSpendTokensMethods, type SpendTokensMethods } from './spendTokens';
import { createSystemGrantMethods, type SystemGrantMethods } from './systemGrant';
import { createTokenMethods, type TokenMethods } from './token';
import { createToolCallMethods, type ToolCallMethods } from './toolCall';
import { createTransactionMethods, type TransactionMethods } from './transaction';
/* Tier 3 — Complex (heavier injection) */
import {
  cacheTokenValues,
  createTxMethods,
  defaultRate,
  premiumTokenValues,
  type TxDeps,
  type TxMethods,
  tokenValues,
} from './tx';
import { createUserMethods, DEFAULT_SESSION_EXPIRY, type UserMethods } from './user';
import { createUserGroupMethods, type UserGroupMethods } from './userGroup';

export {
  cacheTokenValues,
  DEFAULT_REFRESH_TOKEN_EXPIRY,
  DEFAULT_SESSION_EXPIRY,
  defaultRate,
  permissionBitSupersets,
  premiumTokenValues,
  RoleConflictError,
  tokenValues,
};

export type AllMethods = UserMethods &
  SessionMethods &
  TokenMethods &
  RoleMethods &
  KeyMethods &
  FileMethods &
  MemoryMethods &
  AgentCategoryMethods &
  AgentApiKeyMethods &
  MCPServerMethods &
  UserGroupMethods &
  AclEntryMethods &
  SystemGrantMethods &
  ShareMethods &
  AccessRoleMethods &
  PluginAuthMethods &
  ActionMethods &
  AssistantMethods &
  BannerMethods &
  ToolCallMethods &
  CategoriesMethods &
  PresetMethods &
  ConversationTagMethods &
  MessageMethods &
  ConversationMethods &
  TxMethods &
  TransactionMethods &
  SpendTokensMethods &
  PromptMethods &
  AgentMethods &
  ConfigMethods;

/** Dependencies injected from the api layer into createMethods */
export interface CreateMethodsDeps {
  /** Matches a model name to a canonical key. From @librechat/api. */
  matchModelName?: (model: string, endpoint?: string) => string | undefined;
  /** Finds the first key in values whose key is a substring of model. From @librechat/api. */
  findMatchingPattern?: (
    model: string,
    values: Record<string, number | Record<string, number>>,
  ) => string | undefined;
  /** Removes all ACL permissions for a resource. From PermissionService. */
  removeAllPermissions?: (params: { resourceType: string; resourceId: unknown }) => Promise<void>;
  /** Returns a cache store for the given key. From getLogStores. */
  getCache?: RoleDeps['getCache'];
}

/**
 * Creates all database methods for all collections
 * @param mongoose - Mongoose instance
 * @param deps - Optional dependencies injected from the api layer
 */
export function createMethods(
  mongoose: typeof import('mongoose'),
  deps: CreateMethodsDeps = {},
): AllMethods {
  // Tier 3: tx methods need matchModelName and findMatchingPattern
  const txDeps: TxDeps = {
    matchModelName: deps.matchModelName ?? (() => undefined),
    findMatchingPattern: deps.findMatchingPattern ?? (() => undefined),
  };
  const txMethods = createTxMethods(mongoose, txDeps);

  // Tier 3: transaction methods need tx's getMultiplier/getCacheMultiplier
  const transactionMethods = createTransactionMethods(mongoose, {
    getMultiplier: txMethods.getMultiplier,
    getCacheMultiplier: txMethods.getCacheMultiplier,
  });

  // Tier 3: spendTokens methods need transaction methods
  const spendTokensMethods = createSpendTokensMethods(mongoose, {
    createTransaction: transactionMethods.createTransaction,
    createStructuredTransaction: transactionMethods.createStructuredTransaction,
  });

  const messageMethods = createMessageMethods(mongoose);

  const conversationMethods = createConversationMethods(mongoose, {
    getMessages: messageMethods.getMessages,
    deleteMessages: messageMethods.deleteMessages,
  });

  // ACL entry methods (used internally for removeAllPermissions)
  const aclEntryMethods = createAclEntryMethods(mongoose);

  const systemGrantMethods = createSystemGrantMethods(mongoose);

  // Internal removeAllPermissions: use deleteAclEntries from aclEntryMethods
  // instead of requiring it as an external dep from PermissionService
  const removeAllPermissions =
    deps.removeAllPermissions ??
    (async ({ resourceType, resourceId }: { resourceType: string; resourceId: unknown }) => {
      await aclEntryMethods.deleteAclEntries({ resourceType, resourceId });
    });

  const promptDeps: PromptDeps = {
    removeAllPermissions,
    getSoleOwnedResourceIds: aclEntryMethods.getSoleOwnedResourceIds,
  };
  const promptMethods = createPromptMethods(mongoose, promptDeps);

  // Role methods with optional cache injection
  const roleDeps: RoleDeps = { getCache: deps.getCache };
  const roleMethods = createRoleMethods(mongoose, roleDeps);

  // Tier 1: action methods (created as variable for agent dependency)
  const actionMethods = createActionMethods(mongoose);

  // Tier 5: agent methods need removeAllPermissions + getActions
  const agentDeps: AgentDeps = {
    removeAllPermissions,
    getActions: actionMethods.getActions,
    getSoleOwnedResourceIds: aclEntryMethods.getSoleOwnedResourceIds,
  };
  const agentMethods = createAgentMethods(mongoose, agentDeps);

  return {
    ...createUserMethods(mongoose),
    ...createSessionMethods(mongoose),
    ...createTokenMethods(mongoose),
    ...roleMethods,
    ...createKeyMethods(mongoose),
    ...createFileMethods(mongoose),
    ...createMemoryMethods(mongoose),
    ...createAgentCategoryMethods(mongoose),
    ...createAgentApiKeyMethods(mongoose),
    ...createMCPServerMethods(mongoose),
    ...createAccessRoleMethods(mongoose),
    ...createUserGroupMethods(mongoose),
    ...aclEntryMethods,
    ...systemGrantMethods,
    ...createShareMethods(mongoose),
    ...createPluginAuthMethods(mongoose),
    /* Tier 1 */
    ...actionMethods,
    ...createAssistantMethods(mongoose),
    ...createBannerMethods(mongoose),
    ...createToolCallMethods(mongoose),
    ...createCategoriesMethods(mongoose),
    ...createPresetMethods(mongoose),
    /* Tier 2 */
    ...createConversationTagMethods(mongoose),
    ...messageMethods,
    ...conversationMethods,
    /* Tier 3 */
    ...txMethods,
    ...transactionMethods,
    ...spendTokensMethods,
    ...promptMethods,
    /* Tier 5 */
    ...agentMethods,
    /* Config */
    ...createConfigMethods(mongoose),
  };
}

export type {
  AccessRoleMethods,
  AclEntryMethods,
  ActionMethods,
  AgentApiKeyMethods,
  AgentCategoryMethods,
  AgentMethods,
  AssistantMethods,
  BannerMethods,
  CategoriesMethods,
  ConfigMethods,
  ConversationMethods,
  ConversationTagMethods,
  FileMethods,
  KeyMethods,
  MCPServerMethods,
  MemoryMethods,
  MessageMethods,
  PluginAuthMethods,
  PresetMethods,
  PromptMethods,
  RoleMethods,
  SessionMethods,
  ShareMethods,
  SpendTokensMethods,
  SystemGrantMethods,
  TokenMethods,
  ToolCallMethods,
  TransactionMethods,
  TxMethods,
  UserGroupMethods,
  UserMethods,
};
