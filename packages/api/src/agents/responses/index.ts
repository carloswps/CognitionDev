/**
 * Open Responses API Module
 *
 * Exports for the Open Responses API implementation.
 * @see https://openresponses.org/specification
 */

// Handlers
export {
  type AttachmentData,
  // Response building
  buildResponse,
  // Non-streaming
  buildResponsesNonStreamingResponse,
  createFunctionCallItem,
  createFunctionCallOutputItem,
  createMessageItem,
  createOutputTextContent,
  createReasoningItem,
  createReasoningTextContent,
  // Tracker
  createResponseTracker,
  // LibreChat extension events
  emitAttachment,
  // Error events
  emitError,
  emitFunctionCallArgumentsDelta,
  emitFunctionCallArgumentsDone,
  // Function call events
  emitFunctionCallItemAdded,
  emitFunctionCallItemDone,
  emitFunctionCallOutputItem,
  // Message events
  emitMessageItemAdded,
  emitMessageItemDone,
  emitOutputTextDelta,
  emitOutputTextDone,
  emitReasoningContentPartAdded,
  emitReasoningContentPartDone,
  emitReasoningDelta,
  emitReasoningDone,
  // Reasoning events
  emitReasoningItemAdded,
  emitReasoningItemDone,
  emitResponseCompleted,
  // Response events
  emitResponseCreated,
  emitResponseFailed,
  emitResponseInProgress,
  emitTextContentPartAdded,
  emitTextContentPartDone,
  // Item builders
  generateItemId,
  type ResponseTracker,
  // Stream config
  type StreamHandlerConfig,
  updateTrackerUsage,
  writeAttachmentEvent,
  writeDone,
  // SSE
  writeEvent,
} from './handlers';
// Service
export {
  buildAggregatedResponse,
  // Input conversion
  convertInputToMessages,
  createAggregatorEventHandlers,
  // Non-streaming
  createResponseAggregator,
  createResponseContext,
  // Event handlers
  createResponsesEventHandlers,
  // Context
  generateResponseId,
  type InternalMessage,
  isValidationFailure,
  mergeMessagesWithInput,
  type ResponseAggregator,
  // Error response
  sendResponsesErrorResponse,
  // Streaming setup
  setupStreamingResponse,
  // Validation
  validateResponseRequest,
} from './service';
// Types
export type {
  Annotation,
  AssistantMessageItemParam,
  // Streaming events
  BaseEvent,
  ContentPartAddedEvent,
  ContentPartDoneEvent,
  DeveloperMessageItemParam,
  ErrorEvent,
  FileCitationAnnotation,
  FunctionCallArgumentsDeltaEvent,
  FunctionCallArgumentsDoneEvent,
  FunctionCallItem,
  FunctionCallItemParam,
  FunctionCallOutputItem,
  FunctionCallOutputItemParam,
  // Tools
  FunctionTool,
  FunctionToolChoice,
  HostedTool,
  IncompleteDetails,
  InputContent,
  InputFileContent,
  InputImageContent,
  InputItem,
  // Input content
  InputTextContent,
  // Response
  InputTokensDetails,
  ItemReferenceParam,
  // Enums
  ItemStatus,
  // LibreChat extensions
  LibreChatAttachmentContent,
  LibreChatAttachmentEvent,
  // Output content
  LogProb,
  // Output items
  MessageItem,
  MessageRole,
  Metadata,
  ModelContent,
  OutputItem,
  OutputItemAddedEvent,
  OutputItemDoneEvent,
  OutputTextContent,
  OutputTextDeltaEvent,
  OutputTextDoneEvent,
  OutputTokensDetails,
  // Request
  ReasoningConfig,
  ReasoningContent,
  ReasoningDeltaEvent,
  ReasoningDoneEvent,
  ReasoningEffort,
  ReasoningItem,
  ReasoningItemParam,
  ReasoningSummary,
  // Reasoning content
  ReasoningTextContent,
  RefusalContent,
  RefusalDeltaEvent,
  RefusalDoneEvent,
  RequestValidationResult,
  Response,
  ResponseCompletedEvent,
  // Internal
  ResponseContext,
  ResponseCreatedEvent,
  ResponseError,
  ResponseEvent,
  ResponseFailedEvent,
  ResponseIncompleteEvent,
  ResponseInProgressEvent,
  ResponseRequest,
  ResponseStatus,
  ServiceTier,
  StreamOptions,
  SummaryTextContent,
  // Input items
  SystemMessageItemParam,
  TextConfig,
  // Response field types
  TextField,
  Tool,
  ToolChoice,
  ToolChoiceValue,
  TopLogProb,
  TruncationValue,
  // Annotations
  UrlCitationAnnotation,
  Usage,
  UserMessageItemParam,
} from './types';
