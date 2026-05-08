/**
 * Universal model name formatter
 * Works for ALL providers: OpenAI, Anthropic, Google, OpenRouter, etc.
 */

function detectProvider(modelId: string, endpoint?: string): string {
  const model = modelId.toLocaleLowerCase();
  const ep = endpoint?.toLocaleLowerCase() || '';

  // Detect provider based on model name
  if (model.includes('claude')) return 'anthropic';
  if (model.includes('gpt-') || model.startsWith('o1') || model.startsWith('o3')) return 'openai';
  if (model.includes('gemini') || model.includes('gemma')) return 'google';
  if (model.includes('llama')) return 'meta-llama';
  if (model.includes('mistral') || model.includes('mixtral')) return 'mistralai';
  if (model.includes('deepseek')) return 'deepseek';
  if (model.includes('kimi')) return 'moonshot';
  if (model.includes('qwen')) return 'alibaba';

  // Detect provider based on endpoint
  if (ep.includes('anthropic')) return 'anthropic';
  if (ep.includes('openai') || ep.includes('azure')) return 'openai';
  if (ep.includes('google') || ep.includes('vertex')) return 'google';
  if (ep.includes('bedrock')) return 'bedrock';

  return 'unknown';
}

/***
 * Remove prefix from model name
 */

function stripProviderPrefix(modelId: string): string {
  const parts = modelId.split('/');
  return parts.length > 1 ? parts[1] : parts[0];
}

/**
 * Formats model name universally
 * @param modelId - Raw ID (e.g., "anthropic/claude-opus-4-7" or "gpt-4o")
 * @param endpoint - Endpoint name (optional, for detection)
 * @returns Formatted name (e.g., "Claude Opus 4.7")
 */

export function formatModelName(modelId: string, endpoint?: string): string {
  if (!modelId) return '';

  const provider = detectProvider(modelId, endpoint);

  return formatModelNameByProvider(modelId, provider);
}

/**
 * Formats model name by provider
 * @param modelId
 * @param provider
 * @returns
 */
function formatModelNameByProvider(modelName: string, provider: string): string {
  switch (provider) {
    case 'anthropic':
      return formatClaudeModel(modelName);
    case 'openai':
      return formatOpenAIModel(modelName);
    case 'google':
      return formatGoogleModel(modelName);
    case 'meta-llama':
      return formatLlamaModel(modelName);
    case 'mistralai':
      return formatMistralModel(modelName);
    case 'deepseek':
      return formatDeepseekModel(modelName);
    case 'moonshot':
      return formatKimiModel(modelName);
    case 'alibaba':
      return formatQwenModel(modelName);
    default:
      return formatGenericModel(modelName);
  }
}

/**
 * Claude: claude-opus-4-7 → Claude Opus 4.7
 */
function formatClaudeModel(modelName: string): string {
  const withoutPrefix = modelName.replace(/^claude-/, '');
  const parts = withoutPrefix.split('-');
  const modelType = parts[0]?.charAt(0).toUpperCase() + parts[0]?.slice(1);

  // Extrai versão (remove datas)
  const versionParts = parts.slice(1).filter((p) => /^\d/.test(p));
  const version = versionParts.slice(0, 2).join('.');

  return `Claude ${modelType} ${version}`.trim().replace(/\s+/g, ' ');
}

/**
 * OpenAI: gpt-4o → GPT-4o, o1-preview → o1
 */
function formatOpenAIModel(modelName: string): string {
  // Modelos "o" (o1, o3, etc.)
  const omniMatch = modelName.match(/\bo(\d+(?:\.\d+)?)\b/i);
  if (omniMatch) return `o${omniMatch[1]}`;

  // Modelos GPT
  const gptMatch = modelName.match(/gpt-(\d+(?:\.\d+)?)([a-z])?(-(.+))?/i);
  if (gptMatch) {
    const version = gptMatch[1];
    const suffix = gptMatch[2] || '';
    const variant = gptMatch[4] || '';
    return `GPT-${version}${suffix} ${variant}`.replace(/\s+/g, ' ').trim();
  }

  return modelName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Google: gemini-2.5-flash → Gemini 2.5 Flash
 */
function formatGoogleModel(modelName: string): string {
  return modelName.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Llama: llama-3-70b-instruct → Llama 3 70B Instruct
 */
function formatLlamaModel(modelName: string): string {
  return modelName
    .replace(/^llama[-_]?/i, 'Llama ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Mistral: mistral-large-2 → Mistral Large 2
 */
function formatMistralModel(modelName: string): string {
  return modelName
    .replace(/^mistral[-_]?/i, 'Mistral ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Deepseek: deepseek-chat → Deepseek Chat
 */
function formatDeepseekModel(modelName: string): string {
  return modelName
    .replace(/^deepseek[-_]?/i, 'Deepseek ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Kimi: kimi-k2 → Kimi K2
 */
function formatKimiModel(modelName: string): string {
  return modelName
    .replace(/^kimi[-_]?/i, 'Kimi ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Qwen: qwen-2.5-72b → Qwen 2.5 72B
 */
function formatQwenModel(modelName: string): string {
  return modelName
    .replace(/^qwen[-_]?/i, 'Qwen ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Genérico: some-model-name → Some Model Name
 */
function formatGenericModel(modelName: string): string {
  return modelName.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
