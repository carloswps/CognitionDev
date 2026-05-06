import { EModelEndpoint, ErrorTypes } from 'librechat-data-provider';
import { validateEndpointURL } from '~/auth';

import type { BaseInitializeParams, InitializeResultBase, OpenAIConfigOptions, UserKeyValues } from '~/types';
import { checkUserKeyExpiry, isUserProvided } from '~/utils';

import { getOpenAIConfig } from '../openai/config';

const { PROXY, DEEPSEEK_API_KEY, DEEPSEEK_REVERSE_PROXY } = process.env;

/**
 * Initialize DeepSeek options. DeepSeek uses an OpenAI-compatible API.
 * */
export async function initializeDeepSeek({
  req,
  endpoint,
  model_parameters,
  db,
}: BaseInitializeParams): Promise<InitializeResultBase> {
  const appConfig = req.config;
  const { key: expiresAt } = req.body;
  const modelName = model_parameters?.model as string | undefined;

  const credentials = {
    [EModelEndpoint.deepseek]: DEEPSEEK_API_KEY,
  };
  const baseUrlOptions = {
    [EModelEndpoint.deepseek]: DEEPSEEK_REVERSE_PROXY,
  };

  const userProvidesKey = isUserProvided(credentials[endpoint as keyof typeof credentials]);
  const userProvidesURL = isUserProvided(baseUrlOptions[endpoint as keyof typeof baseUrlOptions]);

  let userValues: UserKeyValues | null = null;
  if (expiresAt && (userProvidesKey || userProvidesURL)) {
    checkUserKeyExpiry(expiresAt, endpoint);
    userValues = await db.getUserKeyValues({
      userId: req.user?.id ?? '',
      name: endpoint,
    });
  }

  const apiKey = userProvidesKey
    ? userValues?.apiKey
    : credentials[endpoint as keyof typeof credentials];

  const baseUrl = userProvidesURL
    ? userValues?.baseURL
    : baseUrlOptions[endpoint as keyof typeof baseUrlOptions];

  if (userProvidesURL && baseUrl) {
    await validateEndpointURL(baseUrl, endpoint);
  }
  if (userProvidesKey && !apiKey) {
    throw new Error(JSON.stringify({ type: ErrorTypes.NO_USER_KEY }));
  }

  if (!apiKey) {
    throw new Error(`${endpoint} API Key not provided.`);
  }

  const clientOptions: OpenAIConfigOptions = {
    proxy: PROXY ?? undefined,
    reverseProxyUrl: baseUrl ?? 'https://api.deepseek.com/v1',
    streaming: true,
  };

  const modelOptions = {
    ...(model_parameters ?? {}),
    model: modelName,
    user: req.user?.id,
  };

  const finalClientOptions: OpenAIConfigOptions = {
    ...clientOptions,
    modelOptions,
  };

  const options = getOpenAIConfig(apiKey, finalClientOptions, endpoint);

  const endpointsConfig = appConfig?.endpoints as Record<string, any>;
  const deepseekConfig = endpointsConfig?.[EModelEndpoint.deepseek] as
    | { streamRate?: number }
    | undefined;
  const allConfig = endpointsConfig?.all;

  let streamRate: number | undefined;

  if (deepseekConfig) {
    streamRate = deepseekConfig.streamRate;
  }

  if (allConfig?.streamRate) {
    streamRate = allConfig.streamRate;
  }

  if (streamRate) {
    options.llmConfig._lc_stream_delay = streamRate;
  }

  (options as InitializeResultBase).useLegacyContent = true;
  return options;
}
