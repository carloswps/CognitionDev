import { bi as index, r as reactExports, R as React } from "./vendor.MscUbBdQ.js";
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function _iterableToArrayLimit(r, l2) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l2) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l2); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o, r, i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
var config$1 = {
  paths: {
    vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.55.1/min/vs"
  }
};
function curry(fn) {
  return function curried() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return args.length >= fn.length ? fn.apply(this, args) : function() {
      for (var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        nextArgs[_key2] = arguments[_key2];
      }
      return curried.apply(_this, [].concat(args, nextArgs));
    };
  };
}
function isObject(value) {
  return {}.toString.call(value).includes("Object");
}
function validateConfig(config2) {
  if (!config2) errorHandler("configIsRequired");
  if (!isObject(config2)) errorHandler("configType");
  if (config2.urls) {
    informAboutDeprecation();
    return {
      paths: {
        vs: config2.urls.monacoBase
      }
    };
  }
  return config2;
}
function informAboutDeprecation() {
  console.warn(errorMessages.deprecation);
}
function throwError(errorMessages2, type) {
  throw new Error(errorMessages2[type] || errorMessages2["default"]);
}
var errorMessages = {
  configIsRequired: "the configuration object is required",
  configType: "the configuration object should be an object",
  "default": "an unknown error accured in `@monaco-editor/loader` package",
  deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var errorHandler = curry(throwError)(errorMessages);
var validators = {
  config: validateConfig
};
var compose = function compose2() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function(x) {
    return fns.reduceRight(function(y, f) {
      return f(y);
    }, x);
  };
};
function merge(target, source) {
  Object.keys(source).forEach(function(key) {
    if (source[key] instanceof Object) {
      if (target[key]) {
        Object.assign(source[key], merge(target[key], source[key]));
      }
    }
  });
  return _objectSpread2(_objectSpread2({}, target), source);
}
var CANCELATION_MESSAGE = {
  type: "cancelation",
  msg: "operation is manually canceled"
};
function makeCancelable(promise) {
  var hasCanceled_ = false;
  var wrappedPromise = new Promise(function(resolve, reject) {
    promise.then(function(val) {
      return hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val);
    });
    promise["catch"](reject);
  });
  return wrappedPromise.cancel = function() {
    return hasCanceled_ = true;
  }, wrappedPromise;
}
var _excluded = ["monaco"];
var _state$create = index.create({
  config: config$1,
  isInitialized: false,
  resolve: null,
  reject: null,
  monaco: null
}), _state$create2 = _slicedToArray(_state$create, 2), getState = _state$create2[0], setState = _state$create2[1];
function config(globalConfig) {
  var _validators$config = validators.config(globalConfig), monaco = _validators$config.monaco, config2 = _objectWithoutProperties(_validators$config, _excluded);
  setState(function(state) {
    return {
      config: merge(state.config, config2),
      monaco
    };
  });
}
function init() {
  var state = getState(function(_ref) {
    var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
    return {
      monaco,
      isInitialized,
      resolve
    };
  });
  if (!state.isInitialized) {
    setState({
      isInitialized: true
    });
    if (state.monaco) {
      state.resolve(state.monaco);
      return makeCancelable(wrapperPromise);
    }
    if (window.monaco && window.monaco.editor) {
      storeMonacoInstance(window.monaco);
      state.resolve(window.monaco);
      return makeCancelable(wrapperPromise);
    }
    compose(injectScripts, getMonacoLoaderScript)(configureLoader);
  }
  return makeCancelable(wrapperPromise);
}
function injectScripts(script) {
  return document.body.appendChild(script);
}
function createScript(src) {
  var script = document.createElement("script");
  return src && (script.src = src), script;
}
function getMonacoLoaderScript(configureLoader2) {
  var state = getState(function(_ref2) {
    var config2 = _ref2.config, reject = _ref2.reject;
    return {
      config: config2,
      reject
    };
  });
  var loaderScript = createScript("".concat(state.config.paths.vs, "/loader.js"));
  loaderScript.onload = function() {
    return configureLoader2();
  };
  loaderScript.onerror = state.reject;
  return loaderScript;
}
function configureLoader() {
  var state = getState(function(_ref3) {
    var config2 = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
    return {
      config: config2,
      resolve,
      reject
    };
  });
  var require2 = window.require;
  require2.config(state.config);
  require2(["vs/editor/editor.main"], function(loaded) {
    var monaco = loaded.m || loaded;
    storeMonacoInstance(monaco);
    state.resolve(monaco);
  }, function(error) {
    state.reject(error);
  });
}
function storeMonacoInstance(monaco) {
  if (!getState().monaco) {
    setState({
      monaco
    });
  }
}
function __getMonacoInstance() {
  return getState(function(_ref4) {
    var monaco = _ref4.monaco;
    return monaco;
  });
}
var wrapperPromise = new Promise(function(resolve, reject) {
  return setState({
    resolve,
    reject
  });
});
var loader = {
  config,
  init,
  __getMonacoInstance
};
var le = { wrapper: { display: "flex", position: "relative", textAlign: "initial" }, fullWidth: { width: "100%" }, hide: { display: "none" } }, v = le;
var ae = { container: { display: "flex", height: "100%", width: "100%", justifyContent: "center", alignItems: "center" } }, Y = ae;
function Me({ children: e }) {
  return React.createElement("div", { style: Y.container }, e);
}
var Z = Me;
var $ = Z;
function Ee({ width: e, height: r, isEditorReady: n, loading: t, _ref: a, className: m, wrapperProps: E }) {
  return React.createElement("section", { style: { ...v.wrapper, width: e, height: r }, ...E }, !n && React.createElement($, null, t), React.createElement("div", { ref: a, style: { ...v.fullWidth, ...!n && v.hide }, className: m }));
}
var ee = Ee;
var H = reactExports.memo(ee);
function Ce(e) {
  reactExports.useEffect(e, []);
}
var k = Ce;
function he(e, r, n = true) {
  let t = reactExports.useRef(true);
  reactExports.useEffect(t.current || !n ? () => {
    t.current = false;
  } : e, r);
}
var l = he;
function D() {
}
function h(e, r, n, t) {
  return De(e, t) || be(e, r, n, t);
}
function De(e, r) {
  return e.editor.getModel(te(e, r));
}
function be(e, r, n, t) {
  return e.editor.createModel(r, n, t ? te(e, t) : void 0);
}
function te(e, r) {
  return e.Uri.parse(r);
}
function Oe({ original: e, modified: r, language: n, originalLanguage: t, modifiedLanguage: a, originalModelPath: m, modifiedModelPath: E, keepCurrentOriginalModel: g = false, keepCurrentModifiedModel: N = false, theme: x = "light", loading: P = "Loading...", options: y = {}, height: V = "100%", width: z = "100%", className: F, wrapperProps: j = {}, beforeMount: A = D, onMount: q = D }) {
  let [M, O] = reactExports.useState(false), [T, s] = reactExports.useState(true), u = reactExports.useRef(null), c = reactExports.useRef(null), w = reactExports.useRef(null), d = reactExports.useRef(q), o = reactExports.useRef(A), b = reactExports.useRef(false);
  k(() => {
    let i = loader.init();
    return i.then((f) => (c.current = f) && s(false)).catch((f) => f?.type !== "cancelation" && console.error("Monaco initialization: error:", f)), () => u.current ? I() : i.cancel();
  }), l(() => {
    if (u.current && c.current) {
      let i = u.current.getOriginalEditor(), f = h(c.current, e || "", t || n || "text", m || "");
      f !== i.getModel() && i.setModel(f);
    }
  }, [m], M), l(() => {
    if (u.current && c.current) {
      let i = u.current.getModifiedEditor(), f = h(c.current, r || "", a || n || "text", E || "");
      f !== i.getModel() && i.setModel(f);
    }
  }, [E], M), l(() => {
    let i = u.current.getModifiedEditor();
    i.getOption(c.current.editor.EditorOption.readOnly) ? i.setValue(r || "") : r !== i.getValue() && (i.executeEdits("", [{ range: i.getModel().getFullModelRange(), text: r || "", forceMoveMarkers: true }]), i.pushUndoStop());
  }, [r], M), l(() => {
    u.current?.getModel()?.original.setValue(e || "");
  }, [e], M), l(() => {
    let { original: i, modified: f } = u.current.getModel();
    c.current.editor.setModelLanguage(i, t || n || "text"), c.current.editor.setModelLanguage(f, a || n || "text");
  }, [n, t, a], M), l(() => {
    c.current?.editor.setTheme(x);
  }, [x], M), l(() => {
    u.current?.updateOptions(y);
  }, [y], M);
  let L = reactExports.useCallback(() => {
    if (!c.current) return;
    o.current(c.current);
    let i = h(c.current, e || "", t || n || "text", m || ""), f = h(c.current, r || "", a || n || "text", E || "");
    u.current?.setModel({ original: i, modified: f });
  }, [n, r, a, e, t, m, E]), U = reactExports.useCallback(() => {
    !b.current && w.current && (u.current = c.current.editor.createDiffEditor(w.current, { automaticLayout: true, ...y }), L(), c.current?.editor.setTheme(x), O(true), b.current = true);
  }, [y, x, L]);
  reactExports.useEffect(() => {
    M && d.current(u.current, c.current);
  }, [M]), reactExports.useEffect(() => {
    !T && !M && U();
  }, [T, M, U]);
  function I() {
    let i = u.current?.getModel();
    g || i?.original?.dispose(), N || i?.modified?.dispose(), u.current?.dispose();
  }
  return React.createElement(H, { width: z, height: V, isEditorReady: M, loading: P, _ref: w, className: F, wrapperProps: j });
}
var ie = Oe;
reactExports.memo(ie);
function He(e) {
  let r = reactExports.useRef();
  return reactExports.useEffect(() => {
    r.current = e;
  }, [e]), r.current;
}
var se = He;
var _ = /* @__PURE__ */ new Map();
function Ve({ defaultValue: e, defaultLanguage: r, defaultPath: n, value: t, language: a, path: m, theme: E = "light", line: g, loading: N = "Loading...", options: x = {}, overrideServices: P = {}, saveViewState: y = true, keepCurrentModel: V = false, width: z = "100%", height: F = "100%", className: j, wrapperProps: A = {}, beforeMount: q = D, onMount: M = D, onChange: O, onValidate: T = D }) {
  let [s, u] = reactExports.useState(false), [c, w] = reactExports.useState(true), d = reactExports.useRef(null), o = reactExports.useRef(null), b = reactExports.useRef(null), L = reactExports.useRef(M), U = reactExports.useRef(q), I = reactExports.useRef(), i = reactExports.useRef(t), f = se(m), Q = reactExports.useRef(false), B = reactExports.useRef(false);
  k(() => {
    let p = loader.init();
    return p.then((R) => (d.current = R) && w(false)).catch((R) => R?.type !== "cancelation" && console.error("Monaco initialization: error:", R)), () => o.current ? pe() : p.cancel();
  }), l(() => {
    let p = h(d.current, e || t || "", r || a || "", m || n || "");
    p !== o.current?.getModel() && (y && _.set(f, o.current?.saveViewState()), o.current?.setModel(p), y && o.current?.restoreViewState(_.get(m)));
  }, [m], s), l(() => {
    o.current?.updateOptions(x);
  }, [x], s), l(() => {
    !o.current || t === void 0 || (o.current.getOption(d.current.editor.EditorOption.readOnly) ? o.current.setValue(t) : t !== o.current.getValue() && (B.current = true, o.current.executeEdits("", [{ range: o.current.getModel().getFullModelRange(), text: t, forceMoveMarkers: true }]), o.current.pushUndoStop(), B.current = false));
  }, [t], s), l(() => {
    let p = o.current?.getModel();
    p && a && d.current?.editor.setModelLanguage(p, a);
  }, [a], s), l(() => {
    g !== void 0 && o.current?.revealLine(g);
  }, [g], s), l(() => {
    d.current?.editor.setTheme(E);
  }, [E], s);
  let X = reactExports.useCallback(() => {
    if (!(!b.current || !d.current) && !Q.current) {
      U.current(d.current);
      let p = m || n, R = h(d.current, t || e || "", r || a || "", p || "");
      o.current = d.current?.editor.create(b.current, { model: R, automaticLayout: true, ...x }, P), y && o.current.restoreViewState(_.get(p)), d.current.editor.setTheme(E), g !== void 0 && o.current.revealLine(g), u(true), Q.current = true;
    }
  }, [e, r, n, t, a, m, x, P, y, E, g]);
  reactExports.useEffect(() => {
    s && L.current(o.current, d.current);
  }, [s]), reactExports.useEffect(() => {
    !c && !s && X();
  }, [c, s, X]), i.current = t, reactExports.useEffect(() => {
    s && O && (I.current?.dispose(), I.current = o.current?.onDidChangeModelContent((p) => {
      B.current || O(o.current.getValue(), p);
    }));
  }, [s, O]), reactExports.useEffect(() => {
    if (s) {
      let p = d.current.editor.onDidChangeMarkers((R) => {
        let G = o.current.getModel()?.uri;
        if (G && R.find((J) => J.path === G.path)) {
          let J = d.current.editor.getModelMarkers({ resource: G });
          T?.(J);
        }
      });
      return () => {
        p?.dispose();
      };
    }
    return () => {
    };
  }, [s, T]);
  function pe() {
    I.current?.dispose(), V ? y && _.set(m, o.current.saveViewState()) : o.current.getModel()?.dispose(), o.current.dispose();
  }
  return React.createElement(H, { width: z, height: F, isEditorReady: s, loading: N, _ref: b, className: j, wrapperProps: A });
}
var fe = Ve;
var de = reactExports.memo(fe);
var Ft = de;
export {
  Ft as F
};
