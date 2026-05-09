import { r as reactExports, n as global, ar as createStore, j as jsxRuntimeExports, as as equal, at as parse, au as translateX, av as translateY, aw as scaleX, ax as scaleY, ay as multiply, R as React } from "./vendor.MscUbBdQ.js";
const DndContext = reactExports.createContext({
  dragDropManager: void 0
});
function invariant(condition, format, ...args) {
  if (!condition) {
    let error;
    if (format === void 0) {
      error = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    } else {
      let argIndex = 0;
      error = new Error(format.replace(/%s/g, function() {
        return args[argIndex++];
      }));
      error.name = "Invariant Violation";
    }
    error.framesToPop = 1;
    throw error;
  }
}
function get(obj, path, defaultValue) {
  return path.split(".").reduce(
    (a2, c2) => a2 && a2[c2] ? a2[c2] : defaultValue || null,
    obj
  );
}
function without$1(items, item) {
  return items.filter(
    (i2) => i2 !== item
  );
}
function isObject(input) {
  return typeof input === "object";
}
function xor(itemsA, itemsB) {
  const map = /* @__PURE__ */ new Map();
  const insertItem = (item) => {
    map.set(item, map.has(item) ? map.get(item) + 1 : 1);
  };
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  const result = [];
  map.forEach((count, key) => {
    if (count === 1) {
      result.push(key);
    }
  });
  return result;
}
function intersection(itemsA, itemsB) {
  return itemsA.filter(
    (t) => itemsB.indexOf(t) > -1
  );
}
const INIT_COORDS = "dnd-core/INIT_COORDS";
const BEGIN_DRAG = "dnd-core/BEGIN_DRAG";
const PUBLISH_DRAG_SOURCE = "dnd-core/PUBLISH_DRAG_SOURCE";
const HOVER = "dnd-core/HOVER";
const DROP = "dnd-core/DROP";
const END_DRAG = "dnd-core/END_DRAG";
function setClientOffset(clientOffset, sourceClientOffset) {
  return {
    type: INIT_COORDS,
    payload: {
      sourceClientOffset: sourceClientOffset || null,
      clientOffset: clientOffset || null
    }
  };
}
const ResetCoordinatesAction = {
  type: INIT_COORDS,
  payload: {
    clientOffset: null,
    sourceClientOffset: null
  }
};
function createBeginDrag(manager) {
  return function beginDrag(sourceIds = [], options = {
    publishSource: true
  }) {
    const { publishSource = true, clientOffset, getSourceClientOffset: getSourceClientOffset2 } = options;
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    manager.dispatch(setClientOffset(clientOffset));
    verifyInvariants$1(sourceIds, monitor, registry);
    const sourceId = getDraggableSource(sourceIds, monitor);
    if (sourceId == null) {
      manager.dispatch(ResetCoordinatesAction);
      return;
    }
    let sourceClientOffset = null;
    if (clientOffset) {
      if (!getSourceClientOffset2) {
        throw new Error("getSourceClientOffset must be defined");
      }
      verifyGetSourceClientOffsetIsFunction(getSourceClientOffset2);
      sourceClientOffset = getSourceClientOffset2(sourceId);
    }
    manager.dispatch(setClientOffset(clientOffset, sourceClientOffset));
    const source = registry.getSource(sourceId);
    const item = source.beginDrag(monitor, sourceId);
    if (item == null) {
      return void 0;
    }
    verifyItemIsObject(item);
    registry.pinSource(sourceId);
    const itemType = registry.getSourceType(sourceId);
    return {
      type: BEGIN_DRAG,
      payload: {
        itemType,
        item,
        sourceId,
        clientOffset: clientOffset || null,
        sourceClientOffset: sourceClientOffset || null,
        isSourcePublic: !!publishSource
      }
    };
  };
}
function verifyInvariants$1(sourceIds, monitor, registry) {
  invariant(!monitor.isDragging(), "Cannot call beginDrag while dragging.");
  sourceIds.forEach(function(sourceId) {
    invariant(registry.getSource(sourceId), "Expected sourceIds to be registered.");
  });
}
function verifyGetSourceClientOffsetIsFunction(getSourceClientOffset2) {
  invariant(typeof getSourceClientOffset2 === "function", "When clientOffset is provided, getSourceClientOffset must be a function.");
}
function verifyItemIsObject(item) {
  invariant(isObject(item), "Item must be an object.");
}
function getDraggableSource(sourceIds, monitor) {
  let sourceId = null;
  for (let i2 = sourceIds.length - 1; i2 >= 0; i2--) {
    if (monitor.canDragSource(sourceIds[i2])) {
      sourceId = sourceIds[i2];
      break;
    }
  }
  return sourceId;
}
function _defineProperty$4(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$4(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$4(target, key, source[key]);
    });
  }
  return target;
}
function createDrop(manager) {
  return function drop(options = {}) {
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    verifyInvariants(monitor);
    const targetIds = getDroppableTargets(monitor);
    targetIds.forEach((targetId, index) => {
      const dropResult = determineDropResult(targetId, index, registry, monitor);
      const action = {
        type: DROP,
        payload: {
          dropResult: _objectSpread$4({}, options, dropResult)
        }
      };
      manager.dispatch(action);
    });
  };
}
function verifyInvariants(monitor) {
  invariant(monitor.isDragging(), "Cannot call drop while not dragging.");
  invariant(!monitor.didDrop(), "Cannot call drop twice during one drag operation.");
}
function determineDropResult(targetId, index, registry, monitor) {
  const target = registry.getTarget(targetId);
  let dropResult = target ? target.drop(monitor, targetId) : void 0;
  verifyDropResultType(dropResult);
  if (typeof dropResult === "undefined") {
    dropResult = index === 0 ? {} : monitor.getDropResult();
  }
  return dropResult;
}
function verifyDropResultType(dropResult) {
  invariant(typeof dropResult === "undefined" || isObject(dropResult), "Drop result must either be an object or undefined.");
}
function getDroppableTargets(monitor) {
  const targetIds = monitor.getTargetIds().filter(monitor.canDropOnTarget, monitor);
  targetIds.reverse();
  return targetIds;
}
function createEndDrag(manager) {
  return function endDrag() {
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    verifyIsDragging(monitor);
    const sourceId = monitor.getSourceId();
    if (sourceId != null) {
      const source = registry.getSource(sourceId, true);
      source.endDrag(monitor, sourceId);
      registry.unpinSource();
    }
    return {
      type: END_DRAG
    };
  };
}
function verifyIsDragging(monitor) {
  invariant(monitor.isDragging(), "Cannot call endDrag while not dragging.");
}
function matchesType(targetType, draggedItemType) {
  if (draggedItemType === null) {
    return targetType === null;
  }
  return Array.isArray(targetType) ? targetType.some(
    (t) => t === draggedItemType
  ) : targetType === draggedItemType;
}
function createHover(manager) {
  return function hover(targetIdsArg, { clientOffset } = {}) {
    verifyTargetIdsIsArray(targetIdsArg);
    const targetIds = targetIdsArg.slice(0);
    const monitor = manager.getMonitor();
    const registry = manager.getRegistry();
    const draggedItemType = monitor.getItemType();
    removeNonMatchingTargetIds(targetIds, registry, draggedItemType);
    checkInvariants(targetIds, monitor, registry);
    hoverAllTargets(targetIds, monitor, registry);
    return {
      type: HOVER,
      payload: {
        targetIds,
        clientOffset: clientOffset || null
      }
    };
  };
}
function verifyTargetIdsIsArray(targetIdsArg) {
  invariant(Array.isArray(targetIdsArg), "Expected targetIds to be an array.");
}
function checkInvariants(targetIds, monitor, registry) {
  invariant(monitor.isDragging(), "Cannot call hover while not dragging.");
  invariant(!monitor.didDrop(), "Cannot call hover after drop.");
  for (let i2 = 0; i2 < targetIds.length; i2++) {
    const targetId = targetIds[i2];
    invariant(targetIds.lastIndexOf(targetId) === i2, "Expected targetIds to be unique in the passed array.");
    const target = registry.getTarget(targetId);
    invariant(target, "Expected targetIds to be registered.");
  }
}
function removeNonMatchingTargetIds(targetIds, registry, draggedItemType) {
  for (let i2 = targetIds.length - 1; i2 >= 0; i2--) {
    const targetId = targetIds[i2];
    const targetType = registry.getTargetType(targetId);
    if (!matchesType(targetType, draggedItemType)) {
      targetIds.splice(i2, 1);
    }
  }
}
function hoverAllTargets(targetIds, monitor, registry) {
  targetIds.forEach(function(targetId) {
    const target = registry.getTarget(targetId);
    target.hover(monitor, targetId);
  });
}
function createPublishDragSource(manager) {
  return function publishDragSource() {
    const monitor = manager.getMonitor();
    if (monitor.isDragging()) {
      return {
        type: PUBLISH_DRAG_SOURCE
      };
    }
    return;
  };
}
function createDragDropActions(manager) {
  return {
    beginDrag: createBeginDrag(manager),
    publishDragSource: createPublishDragSource(manager),
    hover: createHover(manager),
    drop: createDrop(manager),
    endDrag: createEndDrag(manager)
  };
}
class DragDropManagerImpl {
  receiveBackend(backend) {
    this.backend = backend;
  }
  getMonitor() {
    return this.monitor;
  }
  getBackend() {
    return this.backend;
  }
  getRegistry() {
    return this.monitor.registry;
  }
  getActions() {
    const manager = this;
    const { dispatch } = this.store;
    function bindActionCreator(actionCreator) {
      return (...args) => {
        const action = actionCreator.apply(manager, args);
        if (typeof action !== "undefined") {
          dispatch(action);
        }
      };
    }
    const actions = createDragDropActions(this);
    return Object.keys(actions).reduce((boundActions, key) => {
      const action = actions[key];
      boundActions[key] = bindActionCreator(action);
      return boundActions;
    }, {});
  }
  dispatch(action) {
    this.store.dispatch(action);
  }
  constructor(store, monitor) {
    this.isSetUp = false;
    this.handleRefCountChange = () => {
      const shouldSetUp = this.store.getState().refCount > 0;
      if (this.backend) {
        if (shouldSetUp && !this.isSetUp) {
          this.backend.setup();
          this.isSetUp = true;
        } else if (!shouldSetUp && this.isSetUp) {
          this.backend.teardown();
          this.isSetUp = false;
        }
      }
    };
    this.store = store;
    this.monitor = monitor;
    store.subscribe(this.handleRefCountChange);
  }
}
function add(a2, b2) {
  return {
    x: a2.x + b2.x,
    y: a2.y + b2.y
  };
}
function subtract(a2, b2) {
  return {
    x: a2.x - b2.x,
    y: a2.y - b2.y
  };
}
function getSourceClientOffset(state) {
  const { clientOffset, initialClientOffset, initialSourceClientOffset } = state;
  if (!clientOffset || !initialClientOffset || !initialSourceClientOffset) {
    return null;
  }
  return subtract(add(clientOffset, initialSourceClientOffset), initialClientOffset);
}
function getDifferenceFromInitialOffset(state) {
  const { clientOffset, initialClientOffset } = state;
  if (!clientOffset || !initialClientOffset) {
    return null;
  }
  return subtract(clientOffset, initialClientOffset);
}
const NONE = [];
const ALL = [];
NONE.__IS_NONE__ = true;
ALL.__IS_ALL__ = true;
function areDirty(dirtyIds, handlerIds) {
  if (dirtyIds === NONE) {
    return false;
  }
  if (dirtyIds === ALL || typeof handlerIds === "undefined") {
    return true;
  }
  const commonIds = intersection(handlerIds, dirtyIds);
  return commonIds.length > 0;
}
class DragDropMonitorImpl {
  subscribeToStateChange(listener, options = {}) {
    const { handlerIds } = options;
    invariant(typeof listener === "function", "listener must be a function.");
    invariant(typeof handlerIds === "undefined" || Array.isArray(handlerIds), "handlerIds, when specified, must be an array of strings.");
    let prevStateId = this.store.getState().stateId;
    const handleChange = () => {
      const state = this.store.getState();
      const currentStateId = state.stateId;
      try {
        const canSkipListener = currentStateId === prevStateId || currentStateId === prevStateId + 1 && !areDirty(state.dirtyHandlerIds, handlerIds);
        if (!canSkipListener) {
          listener();
        }
      } finally {
        prevStateId = currentStateId;
      }
    };
    return this.store.subscribe(handleChange);
  }
  subscribeToOffsetChange(listener) {
    invariant(typeof listener === "function", "listener must be a function.");
    let previousState = this.store.getState().dragOffset;
    const handleChange = () => {
      const nextState = this.store.getState().dragOffset;
      if (nextState === previousState) {
        return;
      }
      previousState = nextState;
      listener();
    };
    return this.store.subscribe(handleChange);
  }
  canDragSource(sourceId) {
    if (!sourceId) {
      return false;
    }
    const source = this.registry.getSource(sourceId);
    invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
    if (this.isDragging()) {
      return false;
    }
    return source.canDrag(this, sourceId);
  }
  canDropOnTarget(targetId) {
    if (!targetId) {
      return false;
    }
    const target = this.registry.getTarget(targetId);
    invariant(target, `Expected to find a valid target. targetId=${targetId}`);
    if (!this.isDragging() || this.didDrop()) {
      return false;
    }
    const targetType = this.registry.getTargetType(targetId);
    const draggedItemType = this.getItemType();
    return matchesType(targetType, draggedItemType) && target.canDrop(this, targetId);
  }
  isDragging() {
    return Boolean(this.getItemType());
  }
  isDraggingSource(sourceId) {
    if (!sourceId) {
      return false;
    }
    const source = this.registry.getSource(sourceId, true);
    invariant(source, `Expected to find a valid source. sourceId=${sourceId}`);
    if (!this.isDragging() || !this.isSourcePublic()) {
      return false;
    }
    const sourceType = this.registry.getSourceType(sourceId);
    const draggedItemType = this.getItemType();
    if (sourceType !== draggedItemType) {
      return false;
    }
    return source.isDragging(this, sourceId);
  }
  isOverTarget(targetId, options = {
    shallow: false
  }) {
    if (!targetId) {
      return false;
    }
    const { shallow } = options;
    if (!this.isDragging()) {
      return false;
    }
    const targetType = this.registry.getTargetType(targetId);
    const draggedItemType = this.getItemType();
    if (draggedItemType && !matchesType(targetType, draggedItemType)) {
      return false;
    }
    const targetIds = this.getTargetIds();
    if (!targetIds.length) {
      return false;
    }
    const index = targetIds.indexOf(targetId);
    if (shallow) {
      return index === targetIds.length - 1;
    } else {
      return index > -1;
    }
  }
  getItemType() {
    return this.store.getState().dragOperation.itemType;
  }
  getItem() {
    return this.store.getState().dragOperation.item;
  }
  getSourceId() {
    return this.store.getState().dragOperation.sourceId;
  }
  getTargetIds() {
    return this.store.getState().dragOperation.targetIds;
  }
  getDropResult() {
    return this.store.getState().dragOperation.dropResult;
  }
  didDrop() {
    return this.store.getState().dragOperation.didDrop;
  }
  isSourcePublic() {
    return Boolean(this.store.getState().dragOperation.isSourcePublic);
  }
  getInitialClientOffset() {
    return this.store.getState().dragOffset.initialClientOffset;
  }
  getInitialSourceClientOffset() {
    return this.store.getState().dragOffset.initialSourceClientOffset;
  }
  getClientOffset() {
    return this.store.getState().dragOffset.clientOffset;
  }
  getSourceClientOffset() {
    return getSourceClientOffset(this.store.getState().dragOffset);
  }
  getDifferenceFromInitialOffset() {
    return getDifferenceFromInitialOffset(this.store.getState().dragOffset);
  }
  constructor(store, registry) {
    this.store = store;
    this.registry = registry;
  }
}
const scope = typeof global !== "undefined" ? global : self;
const BrowserMutationObserver = scope.MutationObserver || scope.WebKitMutationObserver;
function makeRequestCallFromTimer(callback) {
  return function requestCall() {
    const timeoutHandle = setTimeout(handleTimer, 0);
    const intervalHandle = setInterval(handleTimer, 50);
    function handleTimer() {
      clearTimeout(timeoutHandle);
      clearInterval(intervalHandle);
      callback();
    }
  };
}
function makeRequestCallFromMutationObserver(callback) {
  let toggle = 1;
  const observer = new BrowserMutationObserver(callback);
  const node = document.createTextNode("");
  observer.observe(node, {
    characterData: true
  });
  return function requestCall() {
    toggle = -toggle;
    node.data = toggle;
  };
}
const makeRequestCall = typeof BrowserMutationObserver === "function" ? (
  // reliably everywhere they are implemented.
  // They are implemented in all modern browsers.
  //
  // - Android 4-4.3
  // - Chrome 26-34
  // - Firefox 14-29
  // - Internet Explorer 11
  // - iPad Safari 6-7.1
  // - iPhone Safari 7-7.1
  // - Safari 6-7
  makeRequestCallFromMutationObserver
) : (
  // task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
  // 11-12, and in web workers in many engines.
  // Although message channels yield to any queued rendering and IO tasks, they
  // would be better than imposing the 4ms delay of timers.
  // However, they do not work reliably in Internet Explorer or Safari.
  // Internet Explorer 10 is the only browser that has setImmediate but does
  // not have MutationObservers.
  // Although setImmediate yields to the browser's renderer, it would be
  // preferrable to falling back to setTimeout since it does not have
  // the minimum 4ms penalty.
  // Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
  // Desktop to a lesser extent) that renders both setImmediate and
  // MessageChannel useless for the purposes of ASAP.
  // https://github.com/kriskowal/q/issues/396
  // Timers are implemented universally.
  // We fall back to timers in workers in most engines, and in foreground
  // contexts in the following browsers.
  // However, note that even this simple case requires nuances to operate in a
  // broad spectrum of browsers.
  //
  // - Firefox 3-13
  // - Internet Explorer 6-9
  // - iPad Safari 4.3
  // - Lynx 2.8.7
  makeRequestCallFromTimer
);
class AsapQueue {
  // Use the fastest means possible to execute a task in its own turn, with
  // priority over other events including IO, animation, reflow, and redraw
  // events in browsers.
  //
  // An exception thrown by a task will permanently interrupt the processing of
  // subsequent tasks. The higher level `asap` function ensures that if an
  // exception is thrown by a task, that the task queue will continue flushing as
  // soon as possible, but if you use `rawAsap` directly, you are responsible to
  // either ensure that no exceptions are thrown from your task, or to manually
  // call `rawAsap.requestFlush` if an exception is thrown.
  enqueueTask(task) {
    const { queue: q, requestFlush } = this;
    if (!q.length) {
      requestFlush();
      this.flushing = true;
    }
    q[q.length] = task;
  }
  constructor() {
    this.queue = [];
    this.pendingErrors = [];
    this.flushing = false;
    this.index = 0;
    this.capacity = 1024;
    this.flush = () => {
      const { queue: q } = this;
      while (this.index < q.length) {
        const currentIndex = this.index;
        this.index++;
        q[currentIndex].call();
        if (this.index > this.capacity) {
          for (let scan = 0, newLength = q.length - this.index; scan < newLength; scan++) {
            q[scan] = q[scan + this.index];
          }
          q.length -= this.index;
          this.index = 0;
        }
      }
      q.length = 0;
      this.index = 0;
      this.flushing = false;
    };
    this.registerPendingError = (err) => {
      this.pendingErrors.push(err);
      this.requestErrorThrow();
    };
    this.requestFlush = makeRequestCall(this.flush);
    this.requestErrorThrow = makeRequestCallFromTimer(() => {
      if (this.pendingErrors.length) {
        throw this.pendingErrors.shift();
      }
    });
  }
}
class RawTask {
  call() {
    try {
      this.task && this.task();
    } catch (error) {
      this.onError(error);
    } finally {
      this.task = null;
      this.release(this);
    }
  }
  constructor(onError, release) {
    this.onError = onError;
    this.release = release;
    this.task = null;
  }
}
class TaskFactory {
  create(task) {
    const tasks = this.freeTasks;
    const t1 = tasks.length ? tasks.pop() : new RawTask(
      this.onError,
      (t) => tasks[tasks.length] = t
    );
    t1.task = task;
    return t1;
  }
  constructor(onError) {
    this.onError = onError;
    this.freeTasks = [];
  }
}
const asapQueue = new AsapQueue();
const taskFactory = new TaskFactory(asapQueue.registerPendingError);
function asap(task) {
  asapQueue.enqueueTask(taskFactory.create(task));
}
const ADD_SOURCE = "dnd-core/ADD_SOURCE";
const ADD_TARGET = "dnd-core/ADD_TARGET";
const REMOVE_SOURCE = "dnd-core/REMOVE_SOURCE";
const REMOVE_TARGET = "dnd-core/REMOVE_TARGET";
function addSource(sourceId) {
  return {
    type: ADD_SOURCE,
    payload: {
      sourceId
    }
  };
}
function addTarget(targetId) {
  return {
    type: ADD_TARGET,
    payload: {
      targetId
    }
  };
}
function removeSource(sourceId) {
  return {
    type: REMOVE_SOURCE,
    payload: {
      sourceId
    }
  };
}
function removeTarget(targetId) {
  return {
    type: REMOVE_TARGET,
    payload: {
      targetId
    }
  };
}
function validateSourceContract(source) {
  invariant(typeof source.canDrag === "function", "Expected canDrag to be a function.");
  invariant(typeof source.beginDrag === "function", "Expected beginDrag to be a function.");
  invariant(typeof source.endDrag === "function", "Expected endDrag to be a function.");
}
function validateTargetContract(target) {
  invariant(typeof target.canDrop === "function", "Expected canDrop to be a function.");
  invariant(typeof target.hover === "function", "Expected hover to be a function.");
  invariant(typeof target.drop === "function", "Expected beginDrag to be a function.");
}
function validateType(type, allowArray) {
  if (allowArray && Array.isArray(type)) {
    type.forEach(
      (t) => validateType(t, false)
    );
    return;
  }
  invariant(typeof type === "string" || typeof type === "symbol", allowArray ? "Type can only be a string, a symbol, or an array of either." : "Type can only be a string or a symbol.");
}
var HandlerRole;
(function(HandlerRole2) {
  HandlerRole2["SOURCE"] = "SOURCE";
  HandlerRole2["TARGET"] = "TARGET";
})(HandlerRole || (HandlerRole = {}));
let nextUniqueId = 0;
function getNextUniqueId() {
  return nextUniqueId++;
}
function getNextHandlerId(role) {
  const id = getNextUniqueId().toString();
  switch (role) {
    case HandlerRole.SOURCE:
      return `S${id}`;
    case HandlerRole.TARGET:
      return `T${id}`;
    default:
      throw new Error(`Unknown Handler Role: ${role}`);
  }
}
function parseRoleFromHandlerId(handlerId) {
  switch (handlerId[0]) {
    case "S":
      return HandlerRole.SOURCE;
    case "T":
      return HandlerRole.TARGET;
    default:
      throw new Error(`Cannot parse handler ID: ${handlerId}`);
  }
}
function mapContainsValue(map, searchValue) {
  const entries = map.entries();
  let isDone = false;
  do {
    const { done, value: [, value] } = entries.next();
    if (value === searchValue) {
      return true;
    }
    isDone = !!done;
  } while (!isDone);
  return false;
}
class HandlerRegistryImpl {
  addSource(type, source) {
    validateType(type);
    validateSourceContract(source);
    const sourceId = this.addHandler(HandlerRole.SOURCE, type, source);
    this.store.dispatch(addSource(sourceId));
    return sourceId;
  }
  addTarget(type, target) {
    validateType(type, true);
    validateTargetContract(target);
    const targetId = this.addHandler(HandlerRole.TARGET, type, target);
    this.store.dispatch(addTarget(targetId));
    return targetId;
  }
  containsHandler(handler) {
    return mapContainsValue(this.dragSources, handler) || mapContainsValue(this.dropTargets, handler);
  }
  getSource(sourceId, includePinned = false) {
    invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
    const isPinned = includePinned && sourceId === this.pinnedSourceId;
    const source = isPinned ? this.pinnedSource : this.dragSources.get(sourceId);
    return source;
  }
  getTarget(targetId) {
    invariant(this.isTargetId(targetId), "Expected a valid target ID.");
    return this.dropTargets.get(targetId);
  }
  getSourceType(sourceId) {
    invariant(this.isSourceId(sourceId), "Expected a valid source ID.");
    return this.types.get(sourceId);
  }
  getTargetType(targetId) {
    invariant(this.isTargetId(targetId), "Expected a valid target ID.");
    return this.types.get(targetId);
  }
  isSourceId(handlerId) {
    const role = parseRoleFromHandlerId(handlerId);
    return role === HandlerRole.SOURCE;
  }
  isTargetId(handlerId) {
    const role = parseRoleFromHandlerId(handlerId);
    return role === HandlerRole.TARGET;
  }
  removeSource(sourceId) {
    invariant(this.getSource(sourceId), "Expected an existing source.");
    this.store.dispatch(removeSource(sourceId));
    asap(() => {
      this.dragSources.delete(sourceId);
      this.types.delete(sourceId);
    });
  }
  removeTarget(targetId) {
    invariant(this.getTarget(targetId), "Expected an existing target.");
    this.store.dispatch(removeTarget(targetId));
    this.dropTargets.delete(targetId);
    this.types.delete(targetId);
  }
  pinSource(sourceId) {
    const source = this.getSource(sourceId);
    invariant(source, "Expected an existing source.");
    this.pinnedSourceId = sourceId;
    this.pinnedSource = source;
  }
  unpinSource() {
    invariant(this.pinnedSource, "No source is pinned at the time.");
    this.pinnedSourceId = null;
    this.pinnedSource = null;
  }
  addHandler(role, type, handler) {
    const id = getNextHandlerId(role);
    this.types.set(id, type);
    if (role === HandlerRole.SOURCE) {
      this.dragSources.set(id, handler);
    } else if (role === HandlerRole.TARGET) {
      this.dropTargets.set(id, handler);
    }
    return id;
  }
  constructor(store) {
    this.types = /* @__PURE__ */ new Map();
    this.dragSources = /* @__PURE__ */ new Map();
    this.dropTargets = /* @__PURE__ */ new Map();
    this.pinnedSourceId = null;
    this.pinnedSource = null;
    this.store = store;
  }
}
const strictEquality = (a2, b2) => a2 === b2;
function areCoordsEqual(offsetA, offsetB) {
  if (!offsetA && !offsetB) {
    return true;
  } else if (!offsetA || !offsetB) {
    return false;
  } else {
    return offsetA.x === offsetB.x && offsetA.y === offsetB.y;
  }
}
function areArraysEqual(a2, b2, isEqual = strictEquality) {
  if (a2.length !== b2.length) {
    return false;
  }
  for (let i2 = 0; i2 < a2.length; ++i2) {
    if (!isEqual(a2[i2], b2[i2])) {
      return false;
    }
  }
  return true;
}
function reduce$5(_state = NONE, action) {
  switch (action.type) {
    case HOVER:
      break;
    case ADD_SOURCE:
    case ADD_TARGET:
    case REMOVE_TARGET:
    case REMOVE_SOURCE:
      return NONE;
    case BEGIN_DRAG:
    case PUBLISH_DRAG_SOURCE:
    case END_DRAG:
    case DROP:
    default:
      return ALL;
  }
  const { targetIds = [], prevTargetIds = [] } = action.payload;
  const result = xor(targetIds, prevTargetIds);
  const didChange = result.length > 0 || !areArraysEqual(targetIds, prevTargetIds);
  if (!didChange) {
    return NONE;
  }
  const prevInnermostTargetId = prevTargetIds[prevTargetIds.length - 1];
  const innermostTargetId = targetIds[targetIds.length - 1];
  if (prevInnermostTargetId !== innermostTargetId) {
    if (prevInnermostTargetId) {
      result.push(prevInnermostTargetId);
    }
    if (innermostTargetId) {
      result.push(innermostTargetId);
    }
  }
  return result;
}
function _defineProperty$3(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$3(target, key, source[key]);
    });
  }
  return target;
}
const initialState$1 = {
  initialSourceClientOffset: null,
  initialClientOffset: null,
  clientOffset: null
};
function reduce$4(state = initialState$1, action) {
  const { payload } = action;
  switch (action.type) {
    case INIT_COORDS:
    case BEGIN_DRAG:
      return {
        initialSourceClientOffset: payload.sourceClientOffset,
        initialClientOffset: payload.clientOffset,
        clientOffset: payload.clientOffset
      };
    case HOVER:
      if (areCoordsEqual(state.clientOffset, payload.clientOffset)) {
        return state;
      }
      return _objectSpread$3({}, state, {
        clientOffset: payload.clientOffset
      });
    case END_DRAG:
    case DROP:
      return initialState$1;
    default:
      return state;
  }
}
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$2(target, key, source[key]);
    });
  }
  return target;
}
const initialState = {
  itemType: null,
  item: null,
  sourceId: null,
  targetIds: [],
  dropResult: null,
  didDrop: false,
  isSourcePublic: null
};
function reduce$3(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case BEGIN_DRAG:
      return _objectSpread$2({}, state, {
        itemType: payload.itemType,
        item: payload.item,
        sourceId: payload.sourceId,
        isSourcePublic: payload.isSourcePublic,
        dropResult: null,
        didDrop: false
      });
    case PUBLISH_DRAG_SOURCE:
      return _objectSpread$2({}, state, {
        isSourcePublic: true
      });
    case HOVER:
      return _objectSpread$2({}, state, {
        targetIds: payload.targetIds
      });
    case REMOVE_TARGET:
      if (state.targetIds.indexOf(payload.targetId) === -1) {
        return state;
      }
      return _objectSpread$2({}, state, {
        targetIds: without$1(state.targetIds, payload.targetId)
      });
    case DROP:
      return _objectSpread$2({}, state, {
        dropResult: payload.dropResult,
        didDrop: true,
        targetIds: []
      });
    case END_DRAG:
      return _objectSpread$2({}, state, {
        itemType: null,
        item: null,
        sourceId: null,
        dropResult: null,
        didDrop: false,
        isSourcePublic: null,
        targetIds: []
      });
    default:
      return state;
  }
}
function reduce$2(state = 0, action) {
  switch (action.type) {
    case ADD_SOURCE:
    case ADD_TARGET:
      return state + 1;
    case REMOVE_SOURCE:
    case REMOVE_TARGET:
      return state - 1;
    default:
      return state;
  }
}
function reduce$1(state = 0) {
  return state + 1;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    });
  }
  return target;
}
function reduce(state = {}, action) {
  return {
    dirtyHandlerIds: reduce$5(state.dirtyHandlerIds, {
      type: action.type,
      payload: _objectSpread$1({}, action.payload, {
        prevTargetIds: get(state, "dragOperation.targetIds", [])
      })
    }),
    dragOffset: reduce$4(state.dragOffset, action),
    refCount: reduce$2(state.refCount, action),
    dragOperation: reduce$3(state.dragOperation, action),
    stateId: reduce$1(state.stateId)
  };
}
function createDragDropManager(backendFactory, globalContext = void 0, backendOptions = {}, debugMode = false) {
  const store = makeStoreInstance(debugMode);
  const monitor = new DragDropMonitorImpl(store, new HandlerRegistryImpl(store));
  const manager = new DragDropManagerImpl(store, monitor);
  const backend = backendFactory(manager, globalContext, backendOptions);
  manager.receiveBackend(backend);
  return manager;
}
function makeStoreInstance(debugMode) {
  const reduxDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__;
  return createStore(reduce, debugMode && reduxDevTools && reduxDevTools({
    name: "dnd-core",
    instanceId: "dnd-core"
  }));
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
let refCount = 0;
const INSTANCE_SYM = /* @__PURE__ */ Symbol.for("__REACT_DND_CONTEXT_INSTANCE__");
var DndProvider = /* @__PURE__ */ reactExports.memo(function DndProvider2(_param) {
  var { children } = _param, props = _objectWithoutProperties(_param, [
    "children"
  ]);
  const [manager, isGlobalInstance] = getDndContextValue(props);
  reactExports.useEffect(() => {
    if (isGlobalInstance) {
      const context = getGlobalContext();
      ++refCount;
      return () => {
        if (--refCount === 0) {
          context[INSTANCE_SYM] = null;
        }
      };
    }
    return;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext.Provider, {
    value: manager,
    children
  });
});
function getDndContextValue(props) {
  if ("manager" in props) {
    const manager2 = {
      dragDropManager: props.manager
    };
    return [
      manager2,
      false
    ];
  }
  const manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
  const isGlobalInstance = !props.context;
  return [
    manager,
    isGlobalInstance
  ];
}
function createSingletonDndContext(backend, context = getGlobalContext(), options, debugMode) {
  const ctx = context;
  if (!ctx[INSTANCE_SYM]) {
    ctx[INSTANCE_SYM] = {
      dragDropManager: createDragDropManager(backend, context, options, debugMode)
    };
  }
  return ctx[INSTANCE_SYM];
}
function getGlobalContext() {
  return typeof global !== "undefined" ? global : window;
}
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function useCollector(monitor, collect, onUpdate) {
  const [collected, setCollected] = reactExports.useState(
    () => collect(monitor)
  );
  const updateCollected = reactExports.useCallback(() => {
    const nextValue = collect(monitor);
    if (!equal(collected, nextValue)) {
      setCollected(nextValue);
      if (onUpdate) {
        onUpdate();
      }
    }
  }, [
    collected,
    monitor,
    onUpdate
  ]);
  useIsomorphicLayoutEffect(updateCollected);
  return [
    collected,
    updateCollected
  ];
}
function useMonitorOutput(monitor, collect, onCollect) {
  const [collected, updateCollected] = useCollector(monitor, collect, onCollect);
  useIsomorphicLayoutEffect(function subscribeToMonitorStateChange() {
    const handlerId = monitor.getHandlerId();
    if (handlerId == null) {
      return;
    }
    return monitor.subscribeToStateChange(updateCollected, {
      handlerIds: [
        handlerId
      ]
    });
  }, [
    monitor,
    updateCollected
  ]);
  return collected;
}
function useCollectedProps(collector, monitor, connector) {
  return useMonitorOutput(
    monitor,
    collector || (() => ({})),
    () => connector.reconnect()
  );
}
function useOptionalFactory(arg, deps) {
  const memoDeps = [
    ...deps || []
  ];
  if (deps == null && typeof arg !== "function") {
    memoDeps.push(arg);
  }
  return reactExports.useMemo(() => {
    return typeof arg === "function" ? arg() : arg;
  }, memoDeps);
}
function useConnectDragSource(connector) {
  return reactExports.useMemo(
    () => connector.hooks.dragSource(),
    [
      connector
    ]
  );
}
function useConnectDragPreview(connector) {
  return reactExports.useMemo(
    () => connector.hooks.dragPreview(),
    [
      connector
    ]
  );
}
let isCallingCanDrag = false;
let isCallingIsDragging = false;
class DragSourceMonitorImpl {
  receiveHandlerId(sourceId) {
    this.sourceId = sourceId;
  }
  getHandlerId() {
    return this.sourceId;
  }
  canDrag() {
    invariant(!isCallingCanDrag, "You may not call monitor.canDrag() inside your canDrag() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingCanDrag = true;
      return this.internalMonitor.canDragSource(this.sourceId);
    } finally {
      isCallingCanDrag = false;
    }
  }
  isDragging() {
    if (!this.sourceId) {
      return false;
    }
    invariant(!isCallingIsDragging, "You may not call monitor.isDragging() inside your isDragging() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor");
    try {
      isCallingIsDragging = true;
      return this.internalMonitor.isDraggingSource(this.sourceId);
    } finally {
      isCallingIsDragging = false;
    }
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  isDraggingSource(sourceId) {
    return this.internalMonitor.isDraggingSource(sourceId);
  }
  isOverTarget(targetId, options) {
    return this.internalMonitor.isOverTarget(targetId, options);
  }
  getTargetIds() {
    return this.internalMonitor.getTargetIds();
  }
  isSourcePublic() {
    return this.internalMonitor.isSourcePublic();
  }
  getSourceId() {
    return this.internalMonitor.getSourceId();
  }
  subscribeToOffsetChange(listener) {
    return this.internalMonitor.subscribeToOffsetChange(listener);
  }
  canDragSource(sourceId) {
    return this.internalMonitor.canDragSource(sourceId);
  }
  canDropOnTarget(targetId) {
    return this.internalMonitor.canDropOnTarget(targetId);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.sourceId = null;
    this.internalMonitor = manager.getMonitor();
  }
}
let isCallingCanDrop = false;
class DropTargetMonitorImpl {
  receiveHandlerId(targetId) {
    this.targetId = targetId;
  }
  getHandlerId() {
    return this.targetId;
  }
  subscribeToStateChange(listener, options) {
    return this.internalMonitor.subscribeToStateChange(listener, options);
  }
  canDrop() {
    if (!this.targetId) {
      return false;
    }
    invariant(!isCallingCanDrop, "You may not call monitor.canDrop() inside your canDrop() implementation. Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor");
    try {
      isCallingCanDrop = true;
      return this.internalMonitor.canDropOnTarget(this.targetId);
    } finally {
      isCallingCanDrop = false;
    }
  }
  isOver(options) {
    if (!this.targetId) {
      return false;
    }
    return this.internalMonitor.isOverTarget(this.targetId, options);
  }
  getItemType() {
    return this.internalMonitor.getItemType();
  }
  getItem() {
    return this.internalMonitor.getItem();
  }
  getDropResult() {
    return this.internalMonitor.getDropResult();
  }
  didDrop() {
    return this.internalMonitor.didDrop();
  }
  getInitialClientOffset() {
    return this.internalMonitor.getInitialClientOffset();
  }
  getInitialSourceClientOffset() {
    return this.internalMonitor.getInitialSourceClientOffset();
  }
  getSourceClientOffset() {
    return this.internalMonitor.getSourceClientOffset();
  }
  getClientOffset() {
    return this.internalMonitor.getClientOffset();
  }
  getDifferenceFromInitialOffset() {
    return this.internalMonitor.getDifferenceFromInitialOffset();
  }
  constructor(manager) {
    this.targetId = null;
    this.internalMonitor = manager.getMonitor();
  }
}
function registerTarget(type, target, manager) {
  const registry = manager.getRegistry();
  const targetId = registry.addTarget(type, target);
  return [
    targetId,
    () => registry.removeTarget(targetId)
  ];
}
function registerSource(type, source, manager) {
  const registry = manager.getRegistry();
  const sourceId = registry.addSource(type, source);
  return [
    sourceId,
    () => registry.removeSource(sourceId)
  ];
}
function shallowEqual(objA, objB, compare, compareContext) {
  let compareResult = void 0;
  if (compareResult !== void 0) {
    return !!compareResult;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    const valueA = objA[key];
    const valueB = objB[key];
    compareResult = void 0;
    if (compareResult === false || compareResult === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
}
function isRef(obj) {
  return (
    // eslint-disable-next-line no-prototype-builtins
    obj !== null && typeof obj === "object" && Object.prototype.hasOwnProperty.call(obj, "current")
  );
}
function throwIfCompositeComponentElement(element) {
  if (typeof element.type === "string") {
    return;
  }
  const displayName = element.type.displayName || element.type.name || "the component";
  throw new Error(`Only native element nodes can now be passed to React DnD connectors.You can either wrap ${displayName} into a <div>, or turn it into a drag source or a drop target itself.`);
}
function wrapHookToRecognizeElement(hook) {
  return (elementOrNode = null, options = null) => {
    if (!reactExports.isValidElement(elementOrNode)) {
      const node = elementOrNode;
      hook(node, options);
      return node;
    }
    const element = elementOrNode;
    throwIfCompositeComponentElement(element);
    const ref = options ? (node) => hook(node, options) : hook;
    return cloneWithRef(element, ref);
  };
}
function wrapConnectorHooks(hooks) {
  const wrappedHooks = {};
  Object.keys(hooks).forEach((key) => {
    const hook = hooks[key];
    if (key.endsWith("Ref")) {
      wrappedHooks[key] = hooks[key];
    } else {
      const wrappedHook = wrapHookToRecognizeElement(hook);
      wrappedHooks[key] = () => wrappedHook;
    }
  });
  return wrappedHooks;
}
function setRef(ref, node) {
  if (typeof ref === "function") {
    ref(node);
  } else {
    ref.current = node;
  }
}
function cloneWithRef(element, newRef) {
  const previousRef = element.ref;
  invariant(typeof previousRef !== "string", "Cannot connect React DnD to an element with an existing string ref. Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs");
  if (!previousRef) {
    return reactExports.cloneElement(element, {
      ref: newRef
    });
  } else {
    return reactExports.cloneElement(element, {
      ref: (node) => {
        setRef(previousRef, node);
        setRef(newRef, node);
      }
    });
  }
}
class SourceConnector {
  receiveHandlerId(newHandlerId) {
    if (this.handlerId === newHandlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get connectTarget() {
    return this.dragSource;
  }
  get dragSourceOptions() {
    return this.dragSourceOptionsInternal;
  }
  set dragSourceOptions(options) {
    this.dragSourceOptionsInternal = options;
  }
  get dragPreviewOptions() {
    return this.dragPreviewOptionsInternal;
  }
  set dragPreviewOptions(options) {
    this.dragPreviewOptionsInternal = options;
  }
  reconnect() {
    const didChange = this.reconnectDragSource();
    this.reconnectDragPreview(didChange);
  }
  reconnectDragSource() {
    const dragSource = this.dragSource;
    const didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();
    if (didChange) {
      this.disconnectDragSource();
    }
    if (!this.handlerId) {
      return didChange;
    }
    if (!dragSource) {
      this.lastConnectedDragSource = dragSource;
      return didChange;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragSource = dragSource;
      this.lastConnectedDragSourceOptions = this.dragSourceOptions;
      this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
    }
    return didChange;
  }
  reconnectDragPreview(forceDidChange = false) {
    const dragPreview = this.dragPreview;
    const didChange = forceDidChange || this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();
    if (didChange) {
      this.disconnectDragPreview();
    }
    if (!this.handlerId) {
      return;
    }
    if (!dragPreview) {
      this.lastConnectedDragPreview = dragPreview;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDragPreview = dragPreview;
      this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
      this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
    }
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didConnectedDragSourceChange() {
    return this.lastConnectedDragSource !== this.dragSource;
  }
  didConnectedDragPreviewChange() {
    return this.lastConnectedDragPreview !== this.dragPreview;
  }
  didDragSourceOptionsChange() {
    return !shallowEqual(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
  }
  didDragPreviewOptionsChange() {
    return !shallowEqual(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
  }
  disconnectDragSource() {
    if (this.dragSourceUnsubscribe) {
      this.dragSourceUnsubscribe();
      this.dragSourceUnsubscribe = void 0;
    }
  }
  disconnectDragPreview() {
    if (this.dragPreviewUnsubscribe) {
      this.dragPreviewUnsubscribe();
      this.dragPreviewUnsubscribe = void 0;
      this.dragPreviewNode = null;
      this.dragPreviewRef = null;
    }
  }
  get dragSource() {
    return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
  }
  get dragPreview() {
    return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
  }
  clearDragSource() {
    this.dragSourceNode = null;
    this.dragSourceRef = null;
  }
  clearDragPreview() {
    this.dragPreviewNode = null;
    this.dragPreviewRef = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dragSource: (node, options) => {
        this.clearDragSource();
        this.dragSourceOptions = options || null;
        if (isRef(node)) {
          this.dragSourceRef = node;
        } else {
          this.dragSourceNode = node;
        }
        this.reconnectDragSource();
      },
      dragPreview: (node, options) => {
        this.clearDragPreview();
        this.dragPreviewOptions = options || null;
        if (isRef(node)) {
          this.dragPreviewRef = node;
        } else {
          this.dragPreviewNode = node;
        }
        this.reconnectDragPreview();
      }
    });
    this.handlerId = null;
    this.dragSourceRef = null;
    this.dragSourceOptionsInternal = null;
    this.dragPreviewRef = null;
    this.dragPreviewOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDragSource = null;
    this.lastConnectedDragSourceOptions = null;
    this.lastConnectedDragPreview = null;
    this.lastConnectedDragPreviewOptions = null;
    this.backend = backend;
  }
}
class TargetConnector {
  get connectTarget() {
    return this.dropTarget;
  }
  reconnect() {
    const didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();
    if (didChange) {
      this.disconnectDropTarget();
    }
    const dropTarget = this.dropTarget;
    if (!this.handlerId) {
      return;
    }
    if (!dropTarget) {
      this.lastConnectedDropTarget = dropTarget;
      return;
    }
    if (didChange) {
      this.lastConnectedHandlerId = this.handlerId;
      this.lastConnectedDropTarget = dropTarget;
      this.lastConnectedDropTargetOptions = this.dropTargetOptions;
      this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
    }
  }
  receiveHandlerId(newHandlerId) {
    if (newHandlerId === this.handlerId) {
      return;
    }
    this.handlerId = newHandlerId;
    this.reconnect();
  }
  get dropTargetOptions() {
    return this.dropTargetOptionsInternal;
  }
  set dropTargetOptions(options) {
    this.dropTargetOptionsInternal = options;
  }
  didHandlerIdChange() {
    return this.lastConnectedHandlerId !== this.handlerId;
  }
  didDropTargetChange() {
    return this.lastConnectedDropTarget !== this.dropTarget;
  }
  didOptionsChange() {
    return !shallowEqual(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
  }
  disconnectDropTarget() {
    if (this.unsubscribeDropTarget) {
      this.unsubscribeDropTarget();
      this.unsubscribeDropTarget = void 0;
    }
  }
  get dropTarget() {
    return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
  }
  clearDropTarget() {
    this.dropTargetRef = null;
    this.dropTargetNode = null;
  }
  constructor(backend) {
    this.hooks = wrapConnectorHooks({
      dropTarget: (node, options) => {
        this.clearDropTarget();
        this.dropTargetOptions = options;
        if (isRef(node)) {
          this.dropTargetRef = node;
        } else {
          this.dropTargetNode = node;
        }
        this.reconnect();
      }
    });
    this.handlerId = null;
    this.dropTargetRef = null;
    this.dropTargetOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDropTarget = null;
    this.lastConnectedDropTargetOptions = null;
    this.backend = backend;
  }
}
function useDragDropManager() {
  const { dragDropManager } = reactExports.useContext(DndContext);
  invariant(dragDropManager != null, "Expected drag drop context");
  return dragDropManager;
}
function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  const manager = useDragDropManager();
  const connector = reactExports.useMemo(
    () => new SourceConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragSource();
  }, [
    connector,
    dragSourceOptions
  ]);
  useIsomorphicLayoutEffect(() => {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
    return () => connector.disconnectDragPreview();
  }, [
    connector,
    dragPreviewOptions
  ]);
  return connector;
}
function useDragSourceMonitor() {
  const manager = useDragDropManager();
  return reactExports.useMemo(
    () => new DragSourceMonitorImpl(manager),
    [
      manager
    ]
  );
}
class DragSourceImpl {
  beginDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    let result = null;
    if (typeof spec.item === "object") {
      result = spec.item;
    } else if (typeof spec.item === "function") {
      result = spec.item(monitor);
    } else {
      result = {};
    }
    return result !== null && result !== void 0 ? result : null;
  }
  canDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (typeof spec.canDrag === "boolean") {
      return spec.canDrag;
    } else if (typeof spec.canDrag === "function") {
      return spec.canDrag(monitor);
    } else {
      return true;
    }
  }
  isDragging(globalMonitor, target) {
    const spec = this.spec;
    const monitor = this.monitor;
    const { isDragging } = spec;
    return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
  }
  endDrag() {
    const spec = this.spec;
    const monitor = this.monitor;
    const connector = this.connector;
    const { end } = spec;
    if (end) {
      end(monitor.getItem(), monitor);
    }
    connector.reconnect();
  }
  constructor(spec, monitor, connector) {
    this.spec = spec;
    this.monitor = monitor;
    this.connector = connector;
  }
}
function useDragSource(spec, monitor, connector) {
  const handler = reactExports.useMemo(
    () => new DragSourceImpl(spec, monitor, connector),
    [
      monitor,
      connector
    ]
  );
  reactExports.useEffect(() => {
    handler.spec = spec;
  }, [
    spec
  ]);
  return handler;
}
function useDragType(spec) {
  return reactExports.useMemo(() => {
    const result = spec.type;
    invariant(result != null, "spec.type must be defined");
    return result;
  }, [
    spec
  ]);
}
function useRegisteredDragSource(spec, monitor, connector) {
  const manager = useDragDropManager();
  const handler = useDragSource(spec, monitor, connector);
  const itemType = useDragType(spec);
  useIsomorphicLayoutEffect(function registerDragSource() {
    if (itemType != null) {
      const [handlerId, unregister] = registerSource(itemType, handler, manager);
      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }
    return;
  }, [
    manager,
    monitor,
    connector,
    handler,
    itemType
  ]);
}
function useDrag(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  invariant(!spec.begin, `useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)`);
  const monitor = useDragSourceMonitor();
  const connector = useDragSourceConnector(spec.options, spec.previewOptions);
  useRegisteredDragSource(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDragSource(connector),
    useConnectDragPreview(connector)
  ];
}
function useConnectDropTarget(connector) {
  return reactExports.useMemo(
    () => connector.hooks.dropTarget(),
    [
      connector
    ]
  );
}
function useDropTargetConnector(options) {
  const manager = useDragDropManager();
  const connector = reactExports.useMemo(
    () => new TargetConnector(manager.getBackend()),
    [
      manager
    ]
  );
  useIsomorphicLayoutEffect(() => {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
    return () => connector.disconnectDropTarget();
  }, [
    options
  ]);
  return connector;
}
function useDropTargetMonitor() {
  const manager = useDragDropManager();
  return reactExports.useMemo(
    () => new DropTargetMonitorImpl(manager),
    [
      manager
    ]
  );
}
function useAccept(spec) {
  const { accept } = spec;
  return reactExports.useMemo(() => {
    invariant(spec.accept != null, "accept must be defined");
    return Array.isArray(accept) ? accept : [
      accept
    ];
  }, [
    accept
  ]);
}
class DropTargetImpl {
  canDrop() {
    const spec = this.spec;
    const monitor = this.monitor;
    return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
  }
  hover() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.hover) {
      spec.hover(monitor.getItem(), monitor);
    }
  }
  drop() {
    const spec = this.spec;
    const monitor = this.monitor;
    if (spec.drop) {
      return spec.drop(monitor.getItem(), monitor);
    }
    return;
  }
  constructor(spec, monitor) {
    this.spec = spec;
    this.monitor = monitor;
  }
}
function useDropTarget(spec, monitor) {
  const dropTarget = reactExports.useMemo(
    () => new DropTargetImpl(spec, monitor),
    [
      monitor
    ]
  );
  reactExports.useEffect(() => {
    dropTarget.spec = spec;
  }, [
    spec
  ]);
  return dropTarget;
}
function useRegisteredDropTarget(spec, monitor, connector) {
  const manager = useDragDropManager();
  const dropTarget = useDropTarget(spec, monitor);
  const accept = useAccept(spec);
  useIsomorphicLayoutEffect(function registerDropTarget() {
    const [handlerId, unregister] = registerTarget(accept, dropTarget, manager);
    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [
    manager,
    monitor,
    dropTarget,
    connector,
    accept.map(
      (a2) => a2.toString()
    ).join("|")
  ]);
}
function useDrop(specArg, deps) {
  const spec = useOptionalFactory(specArg, deps);
  const monitor = useDropTargetMonitor();
  const connector = useDropTargetConnector(spec.options);
  useRegisteredDropTarget(spec, monitor, connector);
  return [
    useCollectedProps(spec.collect, monitor, connector),
    useConnectDropTarget(connector)
  ];
}
function memoize(fn) {
  let result = null;
  const memoized = () => {
    if (result == null) {
      result = fn();
    }
    return result;
  };
  return memoized;
}
function without(items, item) {
  return items.filter(
    (i2) => i2 !== item
  );
}
function union(itemsA, itemsB) {
  const set = /* @__PURE__ */ new Set();
  const insertItem = (item) => set.add(item);
  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  const result = [];
  set.forEach(
    (key) => result.push(key)
  );
  return result;
}
class EnterLeaveCounter {
  enter(enteringNode) {
    const previousLength = this.entered.length;
    const isNodeEntered = (node) => this.isNodeInDocument(node) && (!node.contains || node.contains(enteringNode));
    this.entered = union(this.entered.filter(isNodeEntered), [
      enteringNode
    ]);
    return previousLength === 0 && this.entered.length > 0;
  }
  leave(leavingNode) {
    const previousLength = this.entered.length;
    this.entered = without(this.entered.filter(this.isNodeInDocument), leavingNode);
    return previousLength > 0 && this.entered.length === 0;
  }
  reset() {
    this.entered = [];
  }
  constructor(isNodeInDocument) {
    this.entered = [];
    this.isNodeInDocument = isNodeInDocument;
  }
}
class NativeDragSource {
  initializeExposedProperties() {
    Object.keys(this.config.exposeProperties).forEach((property) => {
      Object.defineProperty(this.item, property, {
        configurable: true,
        enumerable: true,
        get() {
          console.warn(`Browser doesn't allow reading "${property}" until the drop event.`);
          return null;
        }
      });
    });
  }
  loadDataTransfer(dataTransfer) {
    if (dataTransfer) {
      const newProperties = {};
      Object.keys(this.config.exposeProperties).forEach((property) => {
        const propertyFn = this.config.exposeProperties[property];
        if (propertyFn != null) {
          newProperties[property] = {
            value: propertyFn(dataTransfer, this.config.matchesTypes),
            configurable: true,
            enumerable: true
          };
        }
      });
      Object.defineProperties(this.item, newProperties);
    }
  }
  canDrag() {
    return true;
  }
  beginDrag() {
    return this.item;
  }
  isDragging(monitor, handle) {
    return handle === monitor.getSourceId();
  }
  endDrag() {
  }
  constructor(config) {
    this.config = config;
    this.item = {};
    this.initializeExposedProperties();
  }
}
const FILE = "__NATIVE_FILE__";
const URL = "__NATIVE_URL__";
const TEXT = "__NATIVE_TEXT__";
const HTML = "__NATIVE_HTML__";
const NativeTypes = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FILE,
  HTML,
  TEXT,
  URL
}, Symbol.toStringTag, { value: "Module" }));
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
  const result = typesToTry.reduce(
    (resultSoFar, typeToTry) => resultSoFar || dataTransfer.getData(typeToTry),
    ""
  );
  return result != null ? result : defaultValue;
}
const nativeTypesConfig = {
  [FILE]: {
    exposeProperties: {
      files: (dataTransfer) => Array.prototype.slice.call(dataTransfer.files),
      items: (dataTransfer) => dataTransfer.items,
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Files"
    ]
  },
  [HTML]: {
    exposeProperties: {
      html: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Html",
      "text/html"
    ]
  },
  [URL]: {
    exposeProperties: {
      urls: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, "").split("\n"),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Url",
      "text/uri-list"
    ]
  },
  [TEXT]: {
    exposeProperties: {
      text: (dataTransfer, matchesTypes) => getDataFromDataTransfer(dataTransfer, matchesTypes, ""),
      dataTransfer: (dataTransfer) => dataTransfer
    },
    matchesTypes: [
      "Text",
      "text/plain"
    ]
  }
};
function createNativeDragSource(type, dataTransfer) {
  const config = nativeTypesConfig[type];
  if (!config) {
    throw new Error(`native type ${type} has no configuration`);
  }
  const result = new NativeDragSource(config);
  result.loadDataTransfer(dataTransfer);
  return result;
}
function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }
  const dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(nativeTypesConfig).filter((nativeItemType) => {
    const typeConfig = nativeTypesConfig[nativeItemType];
    if (!(typeConfig === null || typeConfig === void 0 ? void 0 : typeConfig.matchesTypes)) {
      return false;
    }
    return typeConfig.matchesTypes.some(
      (t) => dataTransferTypes.indexOf(t) > -1
    );
  })[0] || null;
}
const isFirefox = memoize(
  () => /firefox/i.test(navigator.userAgent)
);
const isSafari = memoize(
  () => Boolean(window.safari)
);
class MonotonicInterpolant {
  interpolate(x2) {
    const { xs, ys, c1s, c2s, c3s } = this;
    let i2 = xs.length - 1;
    if (x2 === xs[i2]) {
      return ys[i2];
    }
    let low = 0;
    let high = c3s.length - 1;
    let mid;
    while (low <= high) {
      mid = Math.floor(0.5 * (low + high));
      const xHere = xs[mid];
      if (xHere < x2) {
        low = mid + 1;
      } else if (xHere > x2) {
        high = mid - 1;
      } else {
        return ys[mid];
      }
    }
    i2 = Math.max(0, high);
    const diff = x2 - xs[i2];
    const diffSq = diff * diff;
    return ys[i2] + c1s[i2] * diff + c2s[i2] * diffSq + c3s[i2] * diff * diffSq;
  }
  constructor(xs, ys) {
    const { length } = xs;
    const indexes = [];
    for (let i2 = 0; i2 < length; i2++) {
      indexes.push(i2);
    }
    indexes.sort(
      (a2, b2) => xs[a2] < xs[b2] ? -1 : 1
    );
    const dxs = [];
    const ms = [];
    let dx;
    let dy;
    for (let i1 = 0; i1 < length - 1; i1++) {
      dx = xs[i1 + 1] - xs[i1];
      dy = ys[i1 + 1] - ys[i1];
      dxs.push(dx);
      ms.push(dy / dx);
    }
    const c1s = [
      ms[0]
    ];
    for (let i2 = 0; i2 < dxs.length - 1; i2++) {
      const m22 = ms[i2];
      const mNext = ms[i2 + 1];
      if (m22 * mNext <= 0) {
        c1s.push(0);
      } else {
        dx = dxs[i2];
        const dxNext = dxs[i2 + 1];
        const common = dx + dxNext;
        c1s.push(3 * common / ((common + dxNext) / m22 + (common + dx) / mNext));
      }
    }
    c1s.push(ms[ms.length - 1]);
    const c2s = [];
    const c3s = [];
    let m2;
    for (let i3 = 0; i3 < c1s.length - 1; i3++) {
      m2 = ms[i3];
      const c1 = c1s[i3];
      const invDx = 1 / dxs[i3];
      const common = c1 + c1s[i3 + 1] - m2 - m2;
      c2s.push((m2 - c1 - common) * invDx);
      c3s.push(common * invDx * invDx);
    }
    this.xs = xs;
    this.ys = ys;
    this.c1s = c1s;
    this.c2s = c2s;
    this.c3s = c3s;
  }
}
const ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
  const el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;
  if (!el) {
    return null;
  }
  const { top, left } = el.getBoundingClientRect();
  return {
    x: left,
    y: top
  };
}
function getEventClientOffset(e2) {
  return {
    x: e2.clientX,
    y: e2.clientY
  };
}
function isImageNode(node) {
  var ref;
  return node.nodeName === "IMG" && (isFirefox() || !((ref = document.documentElement) === null || ref === void 0 ? void 0 : ref.contains(node)));
}
function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
  let dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  let dragPreviewHeight = isImage ? dragPreview.height : sourceHeight;
  if (isSafari() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }
  return {
    dragPreviewWidth,
    dragPreviewHeight
  };
}
function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
  const isImage = isImageNode(dragPreview);
  const dragPreviewNode = isImage ? sourceNode : dragPreview;
  const dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
  const offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
  };
  const { offsetWidth: sourceWidth, offsetHeight: sourceHeight } = sourceNode;
  const { anchorX, anchorY } = anchorPoint;
  const { dragPreviewWidth, dragPreviewHeight } = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight);
  const calculateYOffset = () => {
    const interpolantY = new MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the top
      offsetFromDragPreview.y,
      // Align at the center
      offsetFromDragPreview.y / sourceHeight * dragPreviewHeight,
      // Dock to the bottom
      offsetFromDragPreview.y + dragPreviewHeight - sourceHeight
    ]);
    let y2 = interpolantY.interpolate(anchorY);
    if (isSafari() && isImage) {
      y2 += (window.devicePixelRatio - 1) * dragPreviewHeight;
    }
    return y2;
  };
  const calculateXOffset = () => {
    const interpolantX = new MonotonicInterpolant([
      0,
      0.5,
      1
    ], [
      // Dock to the left
      offsetFromDragPreview.x,
      // Align at the center
      offsetFromDragPreview.x / sourceWidth * dragPreviewWidth,
      // Dock to the right
      offsetFromDragPreview.x + dragPreviewWidth - sourceWidth
    ]);
    return interpolantX.interpolate(anchorX);
  };
  const { offsetX, offsetY } = offsetPoint;
  const isManualOffsetX = offsetX === 0 || offsetX;
  const isManualOffsetY = offsetY === 0 || offsetY;
  return {
    x: isManualOffsetX ? offsetX : calculateXOffset(),
    y: isManualOffsetY ? offsetY : calculateYOffset()
  };
}
class OptionsReader {
  get window() {
    if (this.globalContext) {
      return this.globalContext;
    } else if (typeof window !== "undefined") {
      return window;
    }
    return void 0;
  }
  get document() {
    var ref;
    if ((ref = this.globalContext) === null || ref === void 0 ? void 0 : ref.document) {
      return this.globalContext.document;
    } else if (this.window) {
      return this.window.document;
    } else {
      return void 0;
    }
  }
  get rootElement() {
    var ref;
    return ((ref = this.optionsArgs) === null || ref === void 0 ? void 0 : ref.rootElement) || this.window;
  }
  constructor(globalContext, options) {
    this.ownerDocument = null;
    this.globalContext = globalContext;
    this.optionsArgs = options;
  }
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2] != null ? arguments[i2] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}
class HTML5BackendImpl {
  /**
  * Generate profiling statistics for the HTML5Backend.
  */
  profile() {
    var ref, ref1;
    return {
      sourcePreviewNodes: this.sourcePreviewNodes.size,
      sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
      sourceNodeOptions: this.sourceNodeOptions.size,
      sourceNodes: this.sourceNodes.size,
      dragStartSourceIds: ((ref = this.dragStartSourceIds) === null || ref === void 0 ? void 0 : ref.length) || 0,
      dropTargetIds: this.dropTargetIds.length,
      dragEnterTargetIds: this.dragEnterTargetIds.length,
      dragOverTargetIds: ((ref1 = this.dragOverTargetIds) === null || ref1 === void 0 ? void 0 : ref1.length) || 0
    };
  }
  // public for test
  get window() {
    return this.options.window;
  }
  get document() {
    return this.options.document;
  }
  /**
  * Get the root element to use for event subscriptions
  */
  get rootElement() {
    return this.options.rootElement;
  }
  setup() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    if (root.__isReactDndBackendSetUp) {
      throw new Error("Cannot have two HTML5 backends at the same time.");
    }
    root.__isReactDndBackendSetUp = true;
    this.addEventListeners(root);
  }
  teardown() {
    const root = this.rootElement;
    if (root === void 0) {
      return;
    }
    root.__isReactDndBackendSetUp = false;
    this.removeEventListeners(this.rootElement);
    this.clearCurrentDragSourceNode();
    if (this.asyncEndDragFrameId) {
      var ref;
      (ref = this.window) === null || ref === void 0 ? void 0 : ref.cancelAnimationFrame(this.asyncEndDragFrameId);
    }
  }
  connectDragPreview(sourceId, node, options) {
    this.sourcePreviewNodeOptions.set(sourceId, options);
    this.sourcePreviewNodes.set(sourceId, node);
    return () => {
      this.sourcePreviewNodes.delete(sourceId);
      this.sourcePreviewNodeOptions.delete(sourceId);
    };
  }
  connectDragSource(sourceId, node, options) {
    this.sourceNodes.set(sourceId, node);
    this.sourceNodeOptions.set(sourceId, options);
    const handleDragStart = (e2) => this.handleDragStart(e2, sourceId);
    const handleSelectStart = (e2) => this.handleSelectStart(e2);
    node.setAttribute("draggable", "true");
    node.addEventListener("dragstart", handleDragStart);
    node.addEventListener("selectstart", handleSelectStart);
    return () => {
      this.sourceNodes.delete(sourceId);
      this.sourceNodeOptions.delete(sourceId);
      node.removeEventListener("dragstart", handleDragStart);
      node.removeEventListener("selectstart", handleSelectStart);
      node.setAttribute("draggable", "false");
    };
  }
  connectDropTarget(targetId, node) {
    const handleDragEnter = (e2) => this.handleDragEnter(e2, targetId);
    const handleDragOver = (e2) => this.handleDragOver(e2, targetId);
    const handleDrop = (e2) => this.handleDrop(e2, targetId);
    node.addEventListener("dragenter", handleDragEnter);
    node.addEventListener("dragover", handleDragOver);
    node.addEventListener("drop", handleDrop);
    return () => {
      node.removeEventListener("dragenter", handleDragEnter);
      node.removeEventListener("dragover", handleDragOver);
      node.removeEventListener("drop", handleDrop);
    };
  }
  addEventListeners(target) {
    if (!target.addEventListener) {
      return;
    }
    target.addEventListener("dragstart", this.handleTopDragStart);
    target.addEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.addEventListener("dragend", this.handleTopDragEndCapture, true);
    target.addEventListener("dragenter", this.handleTopDragEnter);
    target.addEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.addEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.addEventListener("dragover", this.handleTopDragOver);
    target.addEventListener("dragover", this.handleTopDragOverCapture, true);
    target.addEventListener("drop", this.handleTopDrop);
    target.addEventListener("drop", this.handleTopDropCapture, true);
  }
  removeEventListeners(target) {
    if (!target.removeEventListener) {
      return;
    }
    target.removeEventListener("dragstart", this.handleTopDragStart);
    target.removeEventListener("dragstart", this.handleTopDragStartCapture, true);
    target.removeEventListener("dragend", this.handleTopDragEndCapture, true);
    target.removeEventListener("dragenter", this.handleTopDragEnter);
    target.removeEventListener("dragenter", this.handleTopDragEnterCapture, true);
    target.removeEventListener("dragleave", this.handleTopDragLeaveCapture, true);
    target.removeEventListener("dragover", this.handleTopDragOver);
    target.removeEventListener("dragover", this.handleTopDragOverCapture, true);
    target.removeEventListener("drop", this.handleTopDrop);
    target.removeEventListener("drop", this.handleTopDropCapture, true);
  }
  getCurrentSourceNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
    return _objectSpread({
      dropEffect: this.altKeyPressed ? "copy" : "move"
    }, sourceNodeOptions || {});
  }
  getCurrentDropEffect() {
    if (this.isDraggingNativeItem()) {
      return "copy";
    }
    return this.getCurrentSourceNodeOptions().dropEffect;
  }
  getCurrentSourcePreviewNodeOptions() {
    const sourceId = this.monitor.getSourceId();
    const sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
    return _objectSpread({
      anchorX: 0.5,
      anchorY: 0.5,
      captureDraggingState: false
    }, sourcePreviewNodeOptions || {});
  }
  isDraggingNativeItem() {
    const itemType = this.monitor.getItemType();
    return Object.keys(NativeTypes).some(
      (key) => NativeTypes[key] === itemType
    );
  }
  beginDragNativeItem(type, dataTransfer) {
    this.clearCurrentDragSourceNode();
    this.currentNativeSource = createNativeDragSource(type, dataTransfer);
    this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
    this.actions.beginDrag([
      this.currentNativeHandle
    ]);
  }
  setCurrentDragSourceNode(node) {
    this.clearCurrentDragSourceNode();
    this.currentDragSourceNode = node;
    const MOUSE_MOVE_TIMEOUT = 1e3;
    this.mouseMoveTimeoutTimer = setTimeout(() => {
      var ref;
      return (ref = this.rootElement) === null || ref === void 0 ? void 0 : ref.addEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
    }, MOUSE_MOVE_TIMEOUT);
  }
  clearCurrentDragSourceNode() {
    if (this.currentDragSourceNode) {
      this.currentDragSourceNode = null;
      if (this.rootElement) {
        var ref;
        (ref = this.window) === null || ref === void 0 ? void 0 : ref.clearTimeout(this.mouseMoveTimeoutTimer || void 0);
        this.rootElement.removeEventListener("mousemove", this.endDragIfSourceWasRemovedFromDOM, true);
      }
      this.mouseMoveTimeoutTimer = null;
      return true;
    }
    return false;
  }
  handleDragStart(e2, sourceId) {
    if (e2.defaultPrevented) {
      return;
    }
    if (!this.dragStartSourceIds) {
      this.dragStartSourceIds = [];
    }
    this.dragStartSourceIds.unshift(sourceId);
  }
  handleDragEnter(_e, targetId) {
    this.dragEnterTargetIds.unshift(targetId);
  }
  handleDragOver(_e, targetId) {
    if (this.dragOverTargetIds === null) {
      this.dragOverTargetIds = [];
    }
    this.dragOverTargetIds.unshift(targetId);
  }
  handleDrop(_e, targetId) {
    this.dropTargetIds.unshift(targetId);
  }
  constructor(manager, globalContext, options) {
    this.sourcePreviewNodes = /* @__PURE__ */ new Map();
    this.sourcePreviewNodeOptions = /* @__PURE__ */ new Map();
    this.sourceNodes = /* @__PURE__ */ new Map();
    this.sourceNodeOptions = /* @__PURE__ */ new Map();
    this.dragStartSourceIds = null;
    this.dropTargetIds = [];
    this.dragEnterTargetIds = [];
    this.currentNativeSource = null;
    this.currentNativeHandle = null;
    this.currentDragSourceNode = null;
    this.altKeyPressed = false;
    this.mouseMoveTimeoutTimer = null;
    this.asyncEndDragFrameId = null;
    this.dragOverTargetIds = null;
    this.lastClientOffset = null;
    this.hoverRafId = null;
    this.getSourceClientOffset = (sourceId) => {
      const source = this.sourceNodes.get(sourceId);
      return source && getNodeClientOffset(source) || null;
    };
    this.endDragNativeItem = () => {
      if (!this.isDraggingNativeItem()) {
        return;
      }
      this.actions.endDrag();
      if (this.currentNativeHandle) {
        this.registry.removeSource(this.currentNativeHandle);
      }
      this.currentNativeHandle = null;
      this.currentNativeSource = null;
    };
    this.isNodeInDocument = (node) => {
      return Boolean(node && this.document && this.document.body && this.document.body.contains(node));
    };
    this.endDragIfSourceWasRemovedFromDOM = () => {
      const node = this.currentDragSourceNode;
      if (node == null || this.isNodeInDocument(node)) {
        return;
      }
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.scheduleHover = (dragOverTargetIds) => {
      if (this.hoverRafId === null && typeof requestAnimationFrame !== "undefined") {
        this.hoverRafId = requestAnimationFrame(() => {
          if (this.monitor.isDragging()) {
            this.actions.hover(dragOverTargetIds || [], {
              clientOffset: this.lastClientOffset
            });
          }
          this.hoverRafId = null;
        });
      }
    };
    this.cancelHover = () => {
      if (this.hoverRafId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(this.hoverRafId);
        this.hoverRafId = null;
      }
    };
    this.handleTopDragStartCapture = () => {
      this.clearCurrentDragSourceNode();
      this.dragStartSourceIds = [];
    };
    this.handleTopDragStart = (e2) => {
      if (e2.defaultPrevented) {
        return;
      }
      const { dragStartSourceIds } = this;
      this.dragStartSourceIds = null;
      const clientOffset = getEventClientOffset(e2);
      if (this.monitor.isDragging()) {
        this.actions.endDrag();
        this.cancelHover();
      }
      this.actions.beginDrag(dragStartSourceIds || [], {
        publishSource: false,
        getSourceClientOffset: this.getSourceClientOffset,
        clientOffset
      });
      const { dataTransfer } = e2;
      const nativeType = matchNativeItemType(dataTransfer);
      if (this.monitor.isDragging()) {
        if (dataTransfer && typeof dataTransfer.setDragImage === "function") {
          const sourceId = this.monitor.getSourceId();
          const sourceNode = this.sourceNodes.get(sourceId);
          const dragPreview = this.sourcePreviewNodes.get(sourceId) || sourceNode;
          if (dragPreview) {
            const { anchorX, anchorY, offsetX, offsetY } = this.getCurrentSourcePreviewNodeOptions();
            const anchorPoint = {
              anchorX,
              anchorY
            };
            const offsetPoint = {
              offsetX,
              offsetY
            };
            const dragPreviewOffset = getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
            dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
          }
        }
        try {
          dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setData("application/json", {});
        } catch (err) {
        }
        this.setCurrentDragSourceNode(e2.target);
        const { captureDraggingState } = this.getCurrentSourcePreviewNodeOptions();
        if (!captureDraggingState) {
          setTimeout(
            () => this.actions.publishDragSource(),
            0
          );
        } else {
          this.actions.publishDragSource();
        }
      } else if (nativeType) {
        this.beginDragNativeItem(nativeType);
      } else if (dataTransfer && !dataTransfer.types && (e2.target && !e2.target.hasAttribute || !e2.target.hasAttribute("draggable"))) {
        return;
      } else {
        e2.preventDefault();
      }
    };
    this.handleTopDragEndCapture = () => {
      if (this.clearCurrentDragSourceNode() && this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleTopDragEnterCapture = (e2) => {
      this.dragEnterTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e2.dataTransfer);
      }
      const isFirstEnter = this.enterLeaveCounter.enter(e2.target);
      if (!isFirstEnter || this.monitor.isDragging()) {
        return;
      }
      const { dataTransfer } = e2;
      const nativeType = matchNativeItemType(dataTransfer);
      if (nativeType) {
        this.beginDragNativeItem(nativeType, dataTransfer);
      }
    };
    this.handleTopDragEnter = (e2) => {
      const { dragEnterTargetIds } = this;
      this.dragEnterTargetIds = [];
      if (!this.monitor.isDragging()) {
        return;
      }
      this.altKeyPressed = e2.altKey;
      if (dragEnterTargetIds.length > 0) {
        this.actions.hover(dragEnterTargetIds, {
          clientOffset: getEventClientOffset(e2)
        });
      }
      const canDrop = dragEnterTargetIds.some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e2.preventDefault();
        if (e2.dataTransfer) {
          e2.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      }
    };
    this.handleTopDragOverCapture = (e2) => {
      this.dragOverTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e2.dataTransfer);
      }
    };
    this.handleTopDragOver = (e2) => {
      const { dragOverTargetIds } = this;
      this.dragOverTargetIds = [];
      if (!this.monitor.isDragging()) {
        e2.preventDefault();
        if (e2.dataTransfer) {
          e2.dataTransfer.dropEffect = "none";
        }
        return;
      }
      this.altKeyPressed = e2.altKey;
      this.lastClientOffset = getEventClientOffset(e2);
      this.scheduleHover(dragOverTargetIds);
      const canDrop = (dragOverTargetIds || []).some(
        (targetId) => this.monitor.canDropOnTarget(targetId)
      );
      if (canDrop) {
        e2.preventDefault();
        if (e2.dataTransfer) {
          e2.dataTransfer.dropEffect = this.getCurrentDropEffect();
        }
      } else if (this.isDraggingNativeItem()) {
        e2.preventDefault();
      } else {
        e2.preventDefault();
        if (e2.dataTransfer) {
          e2.dataTransfer.dropEffect = "none";
        }
      }
    };
    this.handleTopDragLeaveCapture = (e2) => {
      if (this.isDraggingNativeItem()) {
        e2.preventDefault();
      }
      const isLastLeave = this.enterLeaveCounter.leave(e2.target);
      if (!isLastLeave) {
        return;
      }
      if (this.isDraggingNativeItem()) {
        setTimeout(
          () => this.endDragNativeItem(),
          0
        );
      }
      this.cancelHover();
    };
    this.handleTopDropCapture = (e2) => {
      this.dropTargetIds = [];
      if (this.isDraggingNativeItem()) {
        var ref;
        e2.preventDefault();
        (ref = this.currentNativeSource) === null || ref === void 0 ? void 0 : ref.loadDataTransfer(e2.dataTransfer);
      } else if (matchNativeItemType(e2.dataTransfer)) {
        e2.preventDefault();
      }
      this.enterLeaveCounter.reset();
    };
    this.handleTopDrop = (e2) => {
      const { dropTargetIds } = this;
      this.dropTargetIds = [];
      this.actions.hover(dropTargetIds, {
        clientOffset: getEventClientOffset(e2)
      });
      this.actions.drop({
        dropEffect: this.getCurrentDropEffect()
      });
      if (this.isDraggingNativeItem()) {
        this.endDragNativeItem();
      } else if (this.monitor.isDragging()) {
        this.actions.endDrag();
      }
      this.cancelHover();
    };
    this.handleSelectStart = (e2) => {
      const target = e2.target;
      if (typeof target.dragDrop !== "function") {
        return;
      }
      if (target.tagName === "INPUT" || target.tagName === "SELECT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      e2.preventDefault();
      target.dragDrop();
    };
    this.options = new OptionsReader(globalContext, options);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();
    this.enterLeaveCounter = new EnterLeaveCounter(this.isNodeInDocument);
  }
}
const HTML5Backend = function createBackend(manager, context, options) {
  return new HTML5BackendImpl(manager, context, options);
};
var e = function(t) {
  return "number" == typeof t;
}, i = function(t) {
  return "function" == typeof t;
}, n = function(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}, r = function(t) {
  return Array.prototype.slice.apply(t);
}, s = function(t) {
  var e2 = t.reduce(function(t2, e3) {
    return t2[e3] = (t2[e3] || 0) + 1, t2;
  }, {});
  return Object.keys(e2).filter(function(t2) {
    return e2[t2] > 1;
  });
};
function a(t) {
  return [].slice.call(arguments, 1).forEach(function(e2) {
    if (e2) for (var i2 in e2) Object.prototype.hasOwnProperty.call(e2, i2) && (t[i2] = e2[i2]);
  }), t;
}
var o, l = function(t, e2, i2) {
  return t + (e2 - t) * i2;
}, p = { __proto__: null, isNumber: e, isFunction: i, isObject: n, toArray: r, getDuplicateValsAsStrings: s, assign: a, tweenProp: l }, c$1 = "data-flip-id", u$1 = "data-inverse-flip-id", d$1 = "data-portal-key", f$1 = "data-exit-container", h$1 = { __proto__: null, DATA_FLIP_ID: c$1, DATA_INVERSE_FLIP_ID: u$1, DATA_FLIP_CONFIG: "data-flip-config", DATA_PORTAL_KEY: d$1 }, g = { noWobble: { stiffness: 200, damping: 26 }, gentle: { stiffness: 120, damping: 14 }, veryGentle: { stiffness: 130, damping: 17 }, wobbly: { stiffness: 180, damping: 12 }, stiff: { stiffness: 260, damping: 26 } }, m$1 = function(t) {
  return n(t) ? t : Object.keys(g).indexOf(t) > -1 ? g[t] : {};
};
"undefined" != typeof window && (o = window.requestAnimationFrame);
var v = o = o || function(t) {
  window.setTimeout(t, 1e3 / 60);
}, y$1 = Date.now(), _ = "object" == typeof performance && "function" == typeof performance.now ? function() {
  return performance.now();
} : function() {
  return Date.now() - y$1;
};
function S(t, e2) {
  var i2 = t.indexOf(e2);
  -1 !== i2 && t.splice(i2, 1);
}
var E = /* @__PURE__ */ (function() {
  function t() {
  }
  return t.prototype.run = function() {
    var t2 = this;
    v(function() {
      t2.springSystem.loop(_());
    });
  }, t;
})(), A = function() {
  this.position = 0, this.velocity = 0;
}, C = 0, b = 1e-3, I = /* @__PURE__ */ (function() {
  function t(t2) {
    this._id = "s" + C++, this._springSystem = t2, this.listeners = [], this._startValue = 0, this._currentState = new A(), this._displacementFromRestThreshold = 1e-3, this._endValue = 0, this._overshootClampingEnabled = false, this._previousState = new A(), this._restSpeedThreshold = 1e-3, this._tempState = new A(), this._timeAccumulator = 0, this._wasAtRest = true, this._cachedSpringConfig = {};
  }
  var e2 = t.prototype;
  return e2.getId = function() {
    return this._id;
  }, e2.destroy = function() {
    this.listeners = [], this._springSystem.deregisterSpring(this);
  }, e2.setSpringConfig = function(t2) {
    return this._springConfig = t2, this;
  }, e2.getCurrentValue = function() {
    return this._currentState.position;
  }, e2.getDisplacementDistanceForState = function(t2) {
    return Math.abs(this._endValue - t2.position);
  }, e2.setEndValue = function(t2) {
    if (t2 === this._endValue) return this;
    if (this.prevEndValue = t2, this._endValue === t2 && this.isAtRest()) return this;
    this._startValue = this.getCurrentValue(), this._endValue = t2, this._springSystem.activateSpring(this.getId());
    for (var e3 = 0, i2 = this.listeners.length; e3 < i2; e3++) {
      var n2 = this.listeners[e3].onSpringEndStateChange;
      n2 && n2(this);
    }
    return this;
  }, e2.setVelocity = function(t2) {
    return t2 === this._currentState.velocity || (this._currentState.velocity = t2, this._springSystem.activateSpring(this.getId())), this;
  }, e2.setCurrentValue = function(t2) {
    this._startValue = t2, this._currentState.position = t2;
    for (var e3 = 0, i2 = this.listeners.length; e3 < i2; e3++) {
      var n2 = this.listeners[e3];
      n2.onSpringUpdate && n2.onSpringUpdate(this);
    }
    return this;
  }, e2.setAtRest = function() {
    return this._endValue = this._currentState.position, this._tempState.position = this._currentState.position, this._currentState.velocity = 0, this;
  }, e2.setOvershootClampingEnabled = function(t2) {
    return this._overshootClampingEnabled = t2, this;
  }, e2.isOvershooting = function() {
    var t2 = this._startValue, e3 = this._endValue;
    return this._springConfig.tension > 0 && (t2 < e3 && this.getCurrentValue() > e3 || t2 > e3 && this.getCurrentValue() < e3);
  }, e2.advance = function(t2, e3) {
    var i2 = this.isAtRest();
    if (!i2 || !this._wasAtRest) {
      var n2 = e3;
      e3 > 0.064 && (n2 = 0.064), this._timeAccumulator += n2;
      for (var r2, s2, a2, o2, l2, p2, c2 = this._springConfig.tension, u2 = this._springConfig.friction, d2 = this._currentState.position, f2 = this._currentState.velocity, h2 = this._tempState.position, g2 = this._tempState.velocity; this._timeAccumulator >= b; ) this._timeAccumulator -= b, this._timeAccumulator < b && (this._previousState.position = d2, this._previousState.velocity = f2), s2 = c2 * (this._endValue - h2) - u2 * f2, o2 = c2 * (this._endValue - (h2 = d2 + (r2 = f2) * b * 0.5)) - u2 * (g2 = f2 + s2 * b * 0.5), p2 = c2 * (this._endValue - (h2 = d2 + (a2 = g2) * b * 0.5)) - u2 * (g2 = f2 + o2 * b * 0.5), h2 = d2 + (l2 = g2) * b, d2 += 1 / 6 * (r2 + 2 * (a2 + l2) + (g2 = f2 + p2 * b)) * b, f2 += 1 / 6 * (s2 + 2 * (o2 + p2) + (c2 * (this._endValue - h2) - u2 * g2)) * b;
      this._tempState.position = h2, this._tempState.velocity = g2, this._currentState.position = d2, this._currentState.velocity = f2, this._timeAccumulator > 0 && this._interpolate(this._timeAccumulator / b), (this.isAtRest() || this._overshootClampingEnabled && this.isOvershooting()) && (this._springConfig.tension > 0 ? (this._startValue = this._endValue, this._currentState.position = this._endValue) : (this._endValue = this._currentState.position, this._startValue = this._endValue), this.setVelocity(0), i2 = true);
      var m2 = false;
      this._wasAtRest && (this._wasAtRest = false, m2 = true);
      var v2 = false;
      i2 && (this._wasAtRest = true, v2 = true), this.notifyPositionUpdated(m2, v2);
    }
  }, e2.notifyPositionUpdated = function(t2, e3) {
    var i2 = this;
    this.listeners.filter(Boolean).forEach(function(n2) {
      t2 && n2.onSpringActivate && !i2._onActivateCalled && (n2.onSpringActivate(i2), i2._onActivateCalled = true), n2.onSpringUpdate && n2.onSpringUpdate(i2), e3 && n2.onSpringAtRest && n2.onSpringAtRest(i2);
    });
  }, e2.systemShouldAdvance = function() {
    return !this.isAtRest() || !this.wasAtRest();
  }, e2.wasAtRest = function() {
    return this._wasAtRest;
  }, e2.isAtRest = function() {
    return Math.abs(this._currentState.velocity) < this._restSpeedThreshold && (this.getDisplacementDistanceForState(this._currentState) <= this._displacementFromRestThreshold || 0 === this._springConfig.tension);
  }, e2._interpolate = function(t2) {
    this._currentState.position = this._currentState.position * t2 + this._previousState.position * (1 - t2), this._currentState.velocity = this._currentState.velocity * t2 + this._previousState.velocity * (1 - t2);
  }, e2.addListener = function(t2) {
    return this.listeners.push(t2), this;
  }, e2.addOneTimeListener = function(t2) {
    var e3 = this;
    return Object.keys(t2).forEach(function(i2) {
      var n2;
      t2[i2] = (n2 = t2[i2], function() {
        n2.apply(void 0, [].slice.call(arguments)), e3.removeListener(t2);
      });
    }), this.listeners.push(t2), this;
  }, e2.removeListener = function(t2) {
    return S(this.listeners, t2), this;
  }, t;
})(), w = /* @__PURE__ */ (function() {
  function t(t2) {
    this.looper = t2 || new E(), this.looper.springSystem = this, this.listeners = [], this._activeSprings = [], this._idleSpringIndices = [], this._isIdle = true, this._lastTimeMillis = -1, this._springRegistry = {};
  }
  var e2 = t.prototype;
  return e2.createSpring = function(t2, e3) {
    return this.createSpringWithConfig({ tension: t2, friction: e3 });
  }, e2.createSpringWithConfig = function(t2) {
    var e3 = new I(this);
    return this.registerSpring(e3), e3.setSpringConfig(t2), e3;
  }, e2.getIsIdle = function() {
    return this._isIdle;
  }, e2.registerSpring = function(t2) {
    this._springRegistry[t2.getId()] = t2;
  }, e2.deregisterSpring = function(t2) {
    S(this._activeSprings, t2), delete this._springRegistry[t2.getId()];
  }, e2.advance = function(t2, e3) {
    for (var i2 = this; this._idleSpringIndices.length > 0; ) this._idleSpringIndices.pop();
    for (this._activeSprings.filter(Boolean).forEach(function(n3) {
      n3.systemShouldAdvance() ? n3.advance(t2 / 1e3, e3 / 1e3) : i2._idleSpringIndices.push(i2._activeSprings.indexOf(n3));
    }); this._idleSpringIndices.length > 0; ) {
      var n2 = this._idleSpringIndices.pop();
      n2 >= 0 && this._activeSprings.splice(n2, 1);
    }
  }, e2.loop = function(t2) {
    var e3;
    -1 === this._lastTimeMillis && (this._lastTimeMillis = t2 - 1);
    var i2 = t2 - this._lastTimeMillis;
    this._lastTimeMillis = t2;
    var n2 = 0, r2 = this.listeners.length;
    for (n2 = 0; n2 < r2; n2++) (e3 = this.listeners[n2]).onBeforeIntegrate && e3.onBeforeIntegrate(this);
    for (this.advance(t2, i2), 0 === this._activeSprings.length && (this._isIdle = true, this._lastTimeMillis = -1), n2 = 0; n2 < r2; n2++) (e3 = this.listeners[n2]).onAfterIntegrate && e3.onAfterIntegrate(this);
    this._isIdle || this.looper.run();
  }, e2.activateSpring = function(t2) {
    var e3 = this._springRegistry[t2];
    -1 === this._activeSprings.indexOf(e3) && this._activeSprings.push(e3), this.getIsIdle() && (this._isIdle = false, this.looper.run());
  }, t;
})(), O = new w(), x = function(t) {
  var e2 = t.springConfig, i2 = e2.overshootClamping, n2 = t.getOnUpdateFunc, r2 = t.onAnimationEnd, s2 = t.onSpringActivate, a2 = O.createSpring(e2.stiffness, e2.damping);
  a2.setOvershootClampingEnabled(!!i2);
  var o2 = { onSpringActivate: s2, onSpringAtRest: function() {
    a2.destroy(), r2();
  }, onSpringUpdate: n2({ spring: a2, onAnimationEnd: r2 }) };
  return a2.addListener(o2), a2;
}, U = function(t) {
  var e2 = x(t);
  return e2.setEndValue(1), e2;
}, V = function(t, e2) {
  if (void 0 === e2 && (e2 = {}), t && t.length) {
    e2.reverse && t.reverse();
    var i2, n2 = "number" != typeof (i2 = e2.speed) ? 1.1 : 1 + Math.min(Math.max(5 * i2, 0), 5), r2 = 1 / Math.max(Math.min(t.length, 100), 10), s2 = t.map(function(t2, e3) {
      var i3 = t2.getOnUpdateFunc;
      return t2.getOnUpdateFunc = function(t3) {
        var a2 = i3(t3);
        return function(t4) {
          var i4 = t4.getCurrentValue();
          (i4 = i4 < 0.01 ? 0 : i4 > 0.99 ? 1 : i4) >= r2 && s2[e3 + 1] && s2[e3 + 1](Math.max(Math.min(i4 * n2, 1), 0)), a2(t4);
        };
      }, t2;
    }).map(function(t2) {
      var e3 = x(t2);
      if (e3) return e3.setEndValue.bind(e3);
    }).filter(Boolean);
    s2[0] && s2[0](1);
  }
}, F = function(t) {
  return [0, 1, 4, 5, 12, 13].map(function(e2) {
    return t[e2];
  });
}, P = function(t) {
  return t.top < window.innerHeight && t.bottom > 0 && t.left < window.innerWidth && t.right > 0;
};
function D(t) {
  return JSON.parse(t.dataset.flipConfig || "{}");
}
var R = function(t, e2) {
  var i2;
  return a(t, ((i2 = {})[e2[0]] = e2[1], i2));
}, T = function(t, e2) {
  return r(e2 ? document.querySelectorAll("[" + d$1 + '="' + e2 + '"]') : t.querySelectorAll("[" + c$1 + "]"));
}, M = function(t) {
  return t.map(function(t2) {
    return [t2, t2.getBoundingClientRect()];
  });
}, k = function(n2) {
  var o2 = n2.cachedOrderedFlipIds, p2 = void 0 === o2 ? [] : o2, f2 = n2.inProgressAnimations, h2 = void 0 === f2 ? {} : f2, v2 = n2.flippedElementPositionsBeforeUpdate, y2 = void 0 === v2 ? {} : v2, _2 = n2.flipCallbacks, S2 = void 0 === _2 ? {} : _2, E2 = n2.containerEl, A2 = n2.applyTransformOrigin, C2 = n2.spring, b2 = n2.debug, I2 = n2.portalKey, w2 = n2.staggerConfig, O2 = void 0 === w2 ? {} : w2, x2 = n2.decisionData, k2 = void 0 === x2 ? {} : x2, j2 = n2.handleEnterUpdateDelete, B = n2.onComplete, N = n2.onStart;
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var L, q = M(T((L = { element: E2, portalKey: I2 }).element, L.portalKey)).map(function(t) {
      var e2 = t[0], i2 = t[1], n3 = window.getComputedStyle(e2);
      return [e2.dataset.flipId, { element: e2, rect: i2, opacity: parseFloat(n3.opacity), transform: n3.transform }];
    }).reduce(R, {}), X = (function(t) {
      var e2 = t.containerEl, i2 = t.portalKey;
      return i2 ? /* @__PURE__ */ (function(t2) {
        return function(e3) {
          return r(document.querySelectorAll("[" + d$1 + '="' + t2 + '"]' + e3));
        };
      })(i2) : e2 ? (function(t2) {
        var e3 = Math.random().toFixed(5);
        return t2.dataset.flipperId = e3, function(i3) {
          return r(t2.querySelectorAll('[data-flipper-id="' + e3 + '"] ' + i3));
        };
      })(e2) : function() {
        return [];
      };
    })({ containerEl: E2, portalKey: I2 }), Y = /* @__PURE__ */ (function(t) {
      return function(e2) {
        return t("[" + c$1 + '="' + e2 + '"]')[0];
      };
    })(X), W = function(t) {
      return y2[t] && q[t];
    }, K = Object.keys(y2).concat(Object.keys(q)).filter(function(t) {
      return !W(t);
    }), H = { flipCallbacks: S2, getElement: Y, flippedElementPositionsBeforeUpdate: y2, flippedElementPositionsAfterUpdate: q, inProgressAnimations: h2, decisionData: k2 }, J = (function(t) {
      var e2, i2 = t.unflippedIds, n3 = t.flipCallbacks, r2 = t.getElement, s2 = t.flippedElementPositionsBeforeUpdate, a2 = t.flippedElementPositionsAfterUpdate, o3 = t.inProgressAnimations, l2 = t.decisionData, p3 = i2.filter(function(t2) {
        return a2[t2];
      }).filter(function(t2) {
        return n3[t2] && n3[t2].onAppear;
      }), c2 = i2.filter(function(t2) {
        return s2[t2] && n3[t2] && n3[t2].onExit;
      }), u2 = new Promise(function(t2) {
        e2 = t2;
      }), d2 = [], f3 = 0, h3 = c2.map(function(t2, i3) {
        var r3 = s2[t2].domDataForExitAnimations, a3 = r3.element, p4 = r3.parent, c3 = r3.childPosition, u3 = c3.top, h4 = c3.left, g2 = c3.width, m2 = c3.height;
        "static" === getComputedStyle(p4).position && (p4.style.position = "relative"), a3.style.transform = "matrix(1, 0, 0, 1, 0, 0)", a3.style.position = "absolute", a3.style.top = u3 + "px", a3.style.left = h4 + "px", a3.style.height = m2 + "px", a3.style.width = g2 + "px";
        var v3 = d2.filter(function(t3) {
          return t3[0] === p4;
        })[0];
        v3 || (v3 = [p4, document.createDocumentFragment()], d2.push(v3)), v3[1].appendChild(a3), f3 += 1;
        var y3 = function() {
          try {
            p4.removeChild(a3);
          } catch (t3) {
          } finally {
            0 == (f3 -= 1) && e2();
          }
        };
        return o3[t2] = { stop: y3 }, function() {
          return n3[t2].onExit(a3, i3, y3, l2);
        };
      });
      return d2.forEach(function(t2) {
        t2[0].appendChild(t2[1]);
      }), h3.length || e2(), { hideEnteringElements: function() {
        p3.forEach(function(t2) {
          var e3 = r2(t2);
          e3 && (e3.style.opacity = "0");
        });
      }, animateEnteringElements: function() {
        p3.forEach(function(t2, e3) {
          var i3 = r2(t2);
          i3 && n3[t2].onAppear(i3, e3, l2);
        });
      }, animateExitingElements: function() {
        return h3.forEach(function(t2) {
          return t2();
        }), u2;
      } };
    })(a({}, H, { unflippedIds: K })), z = J.hideEnteringElements, G = J.animateEnteringElements, Q = J.animateExitingElements, Z = a({}, H, { containerEl: E2, flippedIds: p2.filter(W), applyTransformOrigin: A2, spring: C2, debug: b2, staggerConfig: O2, scopedSelector: X, onComplete: B });
    N && N(E2, k2);
    var $ = (function(n3) {
      var o3, p3 = n3.flippedIds, c2 = n3.flipCallbacks, d2 = n3.inProgressAnimations, f3 = n3.flippedElementPositionsBeforeUpdate, h3 = n3.flippedElementPositionsAfterUpdate, v3 = n3.applyTransformOrigin, y3 = n3.spring, _3 = n3.getElement, S3 = n3.debug, E3 = n3.staggerConfig, A3 = void 0 === E3 ? {} : E3, C3 = n3.decisionData, b3 = void 0 === C3 ? {} : C3, I3 = n3.onComplete, w3 = n3.containerEl, O3 = new Promise(function(t) {
        o3 = t;
      });
      if (I3 && O3.then(function() {
        return I3(w3, b3);
      }), !p3.length) return function() {
        return o3([]), O3;
      };
      var x3 = [], R2 = _3(p3[0]), T2 = R2 ? R2.ownerDocument.querySelector("body") : document.querySelector("body");
      s(p3);
      var M2 = p3.map(function(n4) {
        var s2 = f3[n4].rect, p4 = h3[n4].rect, _4 = f3[n4].opacity, S4 = h3[n4].opacity, E4 = p4.width < 1 || p4.height < 1, A4 = h3[n4].element;
        if (!P(s2) && !P(p4)) return false;
        if (!A4) return false;
        var C4, I4, w4, O4 = D(A4), U2 = (w4 = (I4 = void 0 === (C4 = { flipperSpring: y3, flippedSpring: O4.spring }) ? {} : C4).flippedSpring, a({}, g.noWobble, m$1(I4.flipperSpring), m$1(w4))), V2 = true === O4.stagger ? "default" : O4.stagger, R3 = { element: A4, id: n4, stagger: V2, springConfig: U2 };
        if (c2[n4] && c2[n4].shouldFlip && !c2[n4].shouldFlip(b3.previous, b3.current)) return false;
        var k4 = Math.abs(s2.left - p4.left) + Math.abs(s2.top - p4.top), j4 = Math.abs(s2.width - p4.width) + Math.abs(s2.height - p4.height), B3 = Math.abs(S4 - _4);
        if (0 === s2.height && 0 === p4.height || 0 === s2.width && 0 === p4.width || k4 < 0.5 && j4 < 0.5 && B3 < 0.01) return false;
        var N3 = parse(h3[n4].transform), L3 = { matrix: N3 }, q3 = { matrix: [] }, X2 = [N3];
        O4.translate && (X2.push(translateX(s2.left - p4.left)), X2.push(translateY(s2.top - p4.top))), O4.scale && (X2.push(scaleX(Math.max(s2.width, 1) / Math.max(p4.width, 1))), X2.push(scaleY(Math.max(s2.height, 1) / Math.max(p4.height, 1)))), O4.opacity && (q3.opacity = _4, L3.opacity = S4);
        var Y2 = [];
        if (!c2[n4] || !c2[n4].shouldInvert || c2[n4].shouldInvert(b3.previous, b3.current)) {
          var W2 = (function(t, e2) {
            return r(t.querySelectorAll("[" + u$1 + '="' + e2 + '"]'));
          })(A4, n4);
          Y2 = W2.map(function(t) {
            return [t, D(t)];
          });
        }
        q3.matrix = F(X2.reduce(multiply)), L3.matrix = F(L3.matrix);
        var K2, H2 = (function(t) {
          var i2 = t.element, n5 = t.invertedChildren, r2 = t.body;
          return function(t2) {
            var s3 = t2.matrix, a2 = t2.opacity, o4 = t2.forceMinVals;
            if (e(a2) && (i2.style.opacity = a2 + ""), o4 && (i2.style.minHeight = "1px", i2.style.minWidth = "1px"), s3) {
              var l2 = (function(t3) {
                return "matrix(" + t3.join(", ") + ")";
              })(s3);
              i2.style.transform = l2, n5 && (function(t3) {
                var e2 = t3.matrix, i3 = t3.body;
                t3.invertedChildren.forEach(function(t4) {
                  var n6 = t4[0], r3 = t4[1];
                  if (i3.contains(n6)) {
                    var s4 = e2[0], a3 = e2[3], o5 = e2[5], l3 = { translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 }, p5 = "";
                    r3.translate && (l3.translateX = -e2[4] / s4, l3.translateY = -o5 / a3, p5 += "translate(" + l3.translateX + "px, " + l3.translateY + "px)"), r3.scale && (l3.scaleX = 1 / s4, l3.scaleY = 1 / a3, p5 += " scale(" + l3.scaleX + ", " + l3.scaleY + ")"), n6.style.transform = p5;
                  }
                });
              })({ invertedChildren: n5, matrix: s3, body: r2 });
            }
          };
        })({ element: A4, invertedChildren: Y2, body: T2 });
        if (c2[n4] && c2[n4].onComplete) {
          var J2 = c2[n4].onComplete;
          K2 = function() {
            return J2(A4, b3);
          };
        }
        var z2 = e(q3.opacity) && e(L3.opacity) && q3.opacity !== L3.opacity, G2 = false;
        return a({}, R3, { stagger: V2, springConfig: U2, getOnUpdateFunc: function(t) {
          var e2 = t.spring, i2 = t.onAnimationEnd;
          return d2[n4] = { destroy: e2.destroy.bind(e2), onAnimationEnd: i2 }, function(t2) {
            c2[n4] && c2[n4].onSpringUpdate && c2[n4].onSpringUpdate(t2.getCurrentValue()), G2 || (G2 = true, c2[n4] && c2[n4].onStart && c2[n4].onStart(A4, b3));
            var e3 = t2.getCurrentValue();
            if (T2.contains(A4)) {
              var i3 = { matrix: [] };
              i3.matrix = q3.matrix.map(function(t3, i4) {
                return l(t3, L3.matrix[i4], e3);
              }), z2 && (i3.opacity = l(q3.opacity, L3.opacity, e3)), H2(i3);
            } else t2.destroy();
          };
        }, initializeFlip: function() {
          H2({ matrix: q3.matrix, opacity: z2 ? q3.opacity : void 0, forceMinVals: E4 }), c2[n4] && c2[n4].onStartImmediate && c2[n4].onStartImmediate(A4, b3), O4.transformOrigin ? A4.style.transformOrigin = O4.transformOrigin : v3 && (A4.style.transformOrigin = "0 0"), Y2.forEach(function(t) {
            var e2 = t[0], i2 = t[1];
            i2.transformOrigin ? e2.style.transformOrigin = i2.transformOrigin : v3 && (e2.style.transformOrigin = "0 0");
          });
        }, onAnimationEnd: function(t) {
          delete d2[n4], i(K2) && K2(), A4.style.transform = "", Y2.forEach(function(t2) {
            t2[0].style.transform = "";
          }), E4 && A4 && (A4.style.minHeight = "", A4.style.minWidth = ""), t || (x3.push(n4), x3.length >= M2.length && o3(x3));
        }, delayUntil: O4.delayUntil });
      }).filter(Boolean);
      if (M2.forEach(function(t) {
        return (0, t.initializeFlip)();
      }), S3) return function() {
      };
      var k3 = M2.filter(function(t) {
        return t.delayUntil && (e2 = t.delayUntil, M2.filter(function(t2) {
          return t2.id === e2;
        }).length);
        var e2;
      }), j3 = {}, B2 = {}, N2 = {};
      k3.forEach(function(t) {
        t.stagger ? (N2[t.stagger] = true, B2[t.delayUntil] ? B2[t.delayUntil].push(t.stagger) : B2[t.delayUntil] = [t.stagger]) : j3[t.delayUntil] ? j3[t.delayUntil].push(t) : j3[t.delayUntil] = [t];
      });
      var L2 = M2.filter(function(t) {
        return t.stagger;
      }).reduce(function(t, e2) {
        return t[e2.stagger] ? t[e2.stagger].push(e2) : t[e2.stagger] = [e2], t;
      }, {}), q2 = M2.filter(function(t) {
        return -1 === k3.indexOf(t);
      });
      return q2.forEach(function(t) {
        t.onSpringActivate = function() {
          j3[t.id] && j3[t.id].forEach(U), B2[t.id] && Object.keys(B2[t.id].reduce(function(t2, e2) {
            var i2;
            return a(t2, ((i2 = {})[e2] = true, i2));
          }, {})).forEach(function(t2) {
            V(L2[t2], A3[t2]);
          });
        };
      }), function() {
        return M2.length || o3([]), q2.filter(function(t) {
          return !t.stagger;
        }).forEach(U), Object.keys(L2).forEach(function(t) {
          N2[t] || V(L2[t], A3[t]);
        }), O3;
      };
    })(Z);
    j2 ? j2({ hideEnteringElements: z, animateEnteringElements: G, animateExitingElements: Q, animateFlippedElements: $ }) : (z(), Q().then(G), $());
  }
}, j = function(t) {
  var e2 = t.element, i2 = t.flipCallbacks, n2 = void 0 === i2 ? {} : i2, s2 = t.inProgressAnimations, o2 = void 0 === s2 ? {} : s2, l2 = T(e2, t.portalKey), p2 = r(e2.querySelectorAll("[" + u$1 + "]")), c2 = {}, d2 = [], h2 = {};
  l2.filter(function(t2) {
    return n2 && n2[t2.dataset.flipId] && n2[t2.dataset.flipId].onExit;
  }).forEach(function(t2) {
    var e3 = t2.parentNode;
    if (t2.closest) {
      var i3 = t2.closest("[" + f$1 + "]");
      i3 && (e3 = i3);
    }
    var n3 = d2.findIndex(function(t3) {
      return t3[0] === e3;
    });
    -1 === n3 && (d2.push([e3, e3.getBoundingClientRect()]), n3 = d2.length - 1), c2[t2.dataset.flipId] = d2[n3][1], h2[t2.dataset.flipId] = e3;
  });
  var g2 = M(l2), m2 = g2.map(function(t2) {
    var e3 = t2[0], i3 = t2[1], r2 = {};
    if (n2 && n2[e3.dataset.flipId] && n2[e3.dataset.flipId].onExit) {
      var s3 = c2[e3.dataset.flipId];
      a(r2, { element: e3, parent: h2[e3.dataset.flipId], childPosition: { top: i3.top - s3.top, left: i3.left - s3.left, width: i3.width, height: i3.height } });
    }
    return [e3.dataset.flipId, { rect: i3, opacity: parseFloat(window.getComputedStyle(e3).opacity || "1"), domDataForExitAnimations: r2 }];
  }).reduce(R, {});
  return (function(t2, e3) {
    Object.keys(t2).forEach(function(e4) {
      t2[e4].destroy && t2[e4].destroy(), t2[e4].onAnimationEnd && t2[e4].onAnimationEnd(true), delete t2[e4];
    }), e3.forEach(function(t3) {
      t3.style.transform = "", t3.style.opacity = "";
    });
  })(o2, l2.concat(p2)), { flippedElementPositions: m2, cachedOrderedFlipIds: g2.map(function(t2) {
    return t2[0].dataset.flipId;
  }) };
};
new w();
function c(e2, t) {
  return (c = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e3, t2) {
    return e3.__proto__ = t2, e3;
  })(e2, t);
}
function d(e2, t) {
  if (null == e2) return {};
  var r2, n2, i2 = {}, o2 = Object.keys(e2);
  for (n2 = 0; n2 < o2.length; n2++) t.indexOf(r2 = o2[n2]) >= 0 || (i2[r2] = e2[r2]);
  return i2;
}
var f = reactExports.createContext({}), u = reactExports.createContext("portal"), h = (function(t) {
  var r2, n2;
  function i2() {
    var e2;
    return (e2 = t.apply(this, arguments) || this).inProgressAnimations = {}, e2.flipCallbacks = {}, e2.el = void 0, e2;
  }
  n2 = t, (r2 = i2).prototype = Object.create(n2.prototype), r2.prototype.constructor = r2, c(r2, n2);
  var l2 = i2.prototype;
  return l2.getSnapshotBeforeUpdate = function(e2) {
    return e2.flipKey !== this.props.flipKey && this.el ? j({ element: this.el, flipCallbacks: this.flipCallbacks, inProgressAnimations: this.inProgressAnimations, portalKey: this.props.portalKey }) : null;
  }, l2.componentDidUpdate = function(e2, t2, r3) {
    this.props.flipKey !== e2.flipKey && this.el && k({ flippedElementPositionsBeforeUpdate: r3.flippedElementPositions, cachedOrderedFlipIds: r3.cachedOrderedFlipIds, containerEl: this.el, inProgressAnimations: this.inProgressAnimations, flipCallbacks: this.flipCallbacks, applyTransformOrigin: this.props.applyTransformOrigin, spring: this.props.spring, debug: this.props.debug, portalKey: this.props.portalKey, staggerConfig: this.props.staggerConfig, handleEnterUpdateDelete: this.props.handleEnterUpdateDelete, decisionData: { previous: e2.decisionData, current: this.props.decisionData }, onComplete: this.props.onComplete, onStart: this.props.onStart });
  }, l2.render = function() {
    var t2 = this, r3 = this.props, n3 = r3.portalKey, i3 = React.createElement(f.Provider, { value: this.flipCallbacks }, React.createElement(r3.element, { className: r3.className, ref: function(e2) {
      return t2.el = e2;
    } }, this.props.children));
    return n3 && (i3 = React.createElement(u.Provider, { value: n3 }, i3)), i3;
  }, i2;
})(reactExports.Component);
h.defaultProps = { applyTransformOrigin: true, element: "div" };
var m = function(e2) {
  var t, r2 = e2.children, o2 = e2.flipId, p$1 = e2.inverseFlipId, a2 = e2.portalKey, c2 = d(e2, ["children", "flipId", "inverseFlipId", "portalKey"]), f2 = r2, u2 = /* @__PURE__ */ (function(e3) {
    return "function" == typeof e3;
  })(f2);
  if (!u2) try {
    f2 = reactExports.Children.only(r2);
  } catch (e3) {
    throw new Error("Each Flipped component must wrap a single child");
  }
  c2.scale || c2.translate || c2.opacity || p.assign(c2, { translate: true, scale: true, opacity: true });
  var h2 = ((t = {})[h$1.DATA_FLIP_CONFIG] = JSON.stringify(c2), t);
  return void 0 !== o2 ? h2[h$1.DATA_FLIP_ID] = String(o2) : p$1 && (h2[h$1.DATA_INVERSE_FLIP_ID] = String(p$1)), void 0 !== a2 && (h2[h$1.DATA_PORTAL_KEY] = a2), u2 ? f2(h2) : reactExports.cloneElement(f2, h2);
}, y = function(t) {
  var r2 = t.children, n2 = t.flipId, i2 = t.shouldFlip, o2 = t.shouldInvert, p$1 = t.onAppear, s2 = t.onStart, a2 = t.onStartImmediate, c2 = t.onComplete, h2 = t.onExit, y2 = t.onSpringUpdate, g2 = d(t, ["children", "flipId", "shouldFlip", "shouldInvert", "onAppear", "onStart", "onStartImmediate", "onComplete", "onExit", "onSpringUpdate"]);
  return r2 ? g2.inverseFlipId ? React.createElement(m, Object.assign({}, g2), r2) : React.createElement(u.Consumer, null, function(t2) {
    return React.createElement(f.Consumer, null, function(d2) {
      return p.isObject(d2) && n2 && (d2[n2] = { shouldFlip: i2, shouldInvert: o2, onAppear: p$1, onStart: s2, onStartImmediate: a2, onComplete: c2, onExit: h2, onSpringUpdate: y2 }), React.createElement(m, Object.assign({ flipId: n2 }, g2, { portalKey: t2 }), r2);
    });
  }) : null;
};
y.displayName = "Flipped";
export {
  DndProvider as D,
  FILE as F,
  HTML5Backend as H,
  useDrag as a,
  h,
  useDrop as u,
  y
};
