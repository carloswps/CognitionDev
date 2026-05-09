import { e as codePointAt, a as EditorSelection, i as codePointSize, m as fromCodePoint, l as StateField, b as RangeSet, S as StateEffect, M as MapMode, R as RangeValue, k as CharCategory, T as Transaction, c as Text, A as Annotation, P as Prec, F as Facet, d as combineConfig, g as countColumn, f as findClusterBreak, C as ChangeSet, n as ChangeDesc } from "./codemirror-state.DXuhJhmc.js";
import { E as EditorView, D as Decoration, k as keymap, W as WidgetType, c as Direction } from "./codemirror-view.3hozZ9aj.js";
import { a as syntaxTree, i as indentUnit, I as IndentContext, g as getIndentation, c as indentString, m as matchBrackets, d as getIndentUnit, L as LanguageSupport, e as LRLanguage, f as indentNodeProp, h as continuedIndent, j as foldNodeProp, k as foldInside, l as sublanguageProp, n as flatIndent, o as delimitedIndent, p as defineLanguageFacet, q as bracketMatchingHandle } from "./codemirror-language.CCVy4Qxa.js";
import { bB as NodeProp, bJ as parser, bK as NodeWeakMap, bE as IterMode, bL as parser$1, bM as configureNesting, bN as parser$2 } from "./vendor.MscUbBdQ.js";
function toSet(chars) {
  let flat = Object.keys(chars).join("");
  let words = /\w/.test(flat);
  if (words)
    flat = flat.replace(/\w/g, "");
  return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
}
function prefixMatch(options) {
  let first = /* @__PURE__ */ Object.create(null), rest = /* @__PURE__ */ Object.create(null);
  for (let { label } of options) {
    first[label[0]] = true;
    for (let i = 1; i < label.length; i++)
      rest[label[i]] = true;
  }
  let source = toSet(first) + toSet(rest) + "*$";
  return [new RegExp("^" + source), new RegExp(source)];
}
function completeFromList(list) {
  let options = list.map((o) => typeof o == "string" ? { label: o } : o);
  let [validFor, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
  return (context) => {
    let token = context.matchBefore(match);
    return token || context.explicit ? { from: token ? token.from : context.pos, options, validFor } : null;
  };
}
function ifNotIn(nodes, source) {
  return (context) => {
    for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent) {
      if (nodes.indexOf(pos.name) > -1)
        return null;
      if (pos.type.isTop)
        break;
    }
    return source(context);
  };
}
const pickedCompletion = /* @__PURE__ */ Annotation.define();
const baseTheme = /* @__PURE__ */ EditorView.baseTheme({
  ".cm-tooltip.cm-tooltip-autocomplete": {
    "& > ul": {
      fontFamily: "monospace",
      whiteSpace: "nowrap",
      overflow: "hidden auto",
      maxWidth_fallback: "700px",
      maxWidth: "min(700px, 95vw)",
      minWidth: "250px",
      maxHeight: "10em",
      height: "100%",
      listStyle: "none",
      margin: 0,
      padding: 0,
      "& > li, & > completion-section": {
        padding: "1px 3px",
        lineHeight: 1.2
      },
      "& > li": {
        overflowX: "hidden",
        textOverflow: "ellipsis",
        cursor: "pointer"
      },
      "& > completion-section": {
        display: "list-item",
        borderBottom: "1px solid silver",
        paddingLeft: "0.5em",
        opacity: 0.7
      }
    }
  },
  "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#17c",
    color: "white"
  },
  "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#777"
  },
  "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
    background: "#347",
    color: "white"
  },
  "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
    background: "#444"
  },
  ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
    content: '"···"',
    opacity: 0.5,
    display: "block",
    textAlign: "center"
  },
  ".cm-tooltip.cm-completionInfo": {
    position: "absolute",
    padding: "3px 9px",
    width: "max-content",
    maxWidth: `${400}px`,
    boxSizing: "border-box",
    whiteSpace: "pre-line"
  },
  ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
  ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
  ".cm-completionInfo.cm-completionInfo-left-narrow": { right: `${30}px` },
  ".cm-completionInfo.cm-completionInfo-right-narrow": { left: `${30}px` },
  "&light .cm-snippetField": { backgroundColor: "#00000022" },
  "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
  ".cm-snippetFieldPosition": {
    verticalAlign: "text-top",
    width: 0,
    height: "1.15em",
    display: "inline-block",
    margin: "0 -0.7px -.7em",
    borderLeft: "1.4px dotted #888"
  },
  ".cm-completionMatchedText": {
    textDecoration: "underline"
  },
  ".cm-completionDetail": {
    marginLeft: "0.5em",
    fontStyle: "italic"
  },
  ".cm-completionIcon": {
    fontSize: "90%",
    width: ".8em",
    display: "inline-block",
    textAlign: "center",
    paddingRight: ".6em",
    opacity: "0.6",
    boxSizing: "content-box"
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    "&:after": { content: "'ƒ'" }
  },
  ".cm-completionIcon-class": {
    "&:after": { content: "'○'" }
  },
  ".cm-completionIcon-interface": {
    "&:after": { content: "'◌'" }
  },
  ".cm-completionIcon-variable": {
    "&:after": { content: "'𝑥'" }
  },
  ".cm-completionIcon-constant": {
    "&:after": { content: "'𝐶'" }
  },
  ".cm-completionIcon-type": {
    "&:after": { content: "'𝑡'" }
  },
  ".cm-completionIcon-enum": {
    "&:after": { content: "'∪'" }
  },
  ".cm-completionIcon-property": {
    "&:after": { content: "'□'" }
  },
  ".cm-completionIcon-keyword": {
    "&:after": { content: "'🔑︎'" }
    // Disable emoji rendering
  },
  ".cm-completionIcon-namespace": {
    "&:after": { content: "'▢'" }
  },
  ".cm-completionIcon-text": {
    "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
  }
});
class FieldPos {
  constructor(field, line, from, to) {
    this.field = field;
    this.line = line;
    this.from = from;
    this.to = to;
  }
}
class FieldRange {
  constructor(field, from, to) {
    this.field = field;
    this.from = from;
    this.to = to;
  }
  map(changes) {
    let from = changes.mapPos(this.from, -1, MapMode.TrackDel);
    let to = changes.mapPos(this.to, 1, MapMode.TrackDel);
    return from == null || to == null ? null : new FieldRange(this.field, from, to);
  }
}
class Snippet {
  constructor(lines, fieldPositions) {
    this.lines = lines;
    this.fieldPositions = fieldPositions;
  }
  instantiate(state, pos) {
    let text = [], lineStart = [pos];
    let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
    for (let line of this.lines) {
      if (text.length) {
        let indent = baseIndent, tabs = /^\t*/.exec(line)[0].length;
        for (let i = 0; i < tabs; i++)
          indent += state.facet(indentUnit);
        lineStart.push(pos + indent.length - tabs);
        line = indent + line.slice(tabs);
      }
      text.push(line);
      pos += line.length + 1;
    }
    let ranges = this.fieldPositions.map((pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to));
    return { text, ranges };
  }
  static parse(template) {
    let fields = [];
    let lines = [], positions = [], m;
    for (let line of template.split(/\r\n?|\n/)) {
      while (m = /[#$]\{(?:(\d+)(?::([^}]*))?|((?:\\[{}]|[^}])*))\}/.exec(line)) {
        let seq = m[1] ? +m[1] : null, rawName = m[2] || m[3] || "", found = -1;
        let name = rawName.replace(/\\[{}]/g, (m2) => m2[1]);
        for (let i = 0; i < fields.length; i++) {
          if (seq != null ? fields[i].seq == seq : name ? fields[i].name == name : false)
            found = i;
        }
        if (found < 0) {
          let i = 0;
          while (i < fields.length && (seq == null || fields[i].seq != null && fields[i].seq < seq))
            i++;
          fields.splice(i, 0, { seq, name });
          found = i;
          for (let pos of positions)
            if (pos.field >= found)
              pos.field++;
        }
        positions.push(new FieldPos(found, lines.length, m.index, m.index + name.length));
        line = line.slice(0, m.index) + rawName + line.slice(m.index + m[0].length);
      }
      line = line.replace(/\\([{}])/g, (_, brace, index) => {
        for (let pos of positions)
          if (pos.line == lines.length && pos.from > index) {
            pos.from--;
            pos.to--;
          }
        return brace;
      });
      lines.push(line);
    }
    return new Snippet(lines, positions);
  }
}
let fieldMarker = /* @__PURE__ */ Decoration.widget({ widget: /* @__PURE__ */ new class extends WidgetType {
  toDOM() {
    let span = document.createElement("span");
    span.className = "cm-snippetFieldPosition";
    return span;
  }
  ignoreEvent() {
    return false;
  }
}() });
let fieldRange = /* @__PURE__ */ Decoration.mark({ class: "cm-snippetField" });
class ActiveSnippet {
  constructor(ranges, active) {
    this.ranges = ranges;
    this.active = active;
    this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)));
  }
  map(changes) {
    let ranges = [];
    for (let r of this.ranges) {
      let mapped = r.map(changes);
      if (!mapped)
        return null;
      ranges.push(mapped);
    }
    return new ActiveSnippet(ranges, this.active);
  }
  selectionInsideField(sel) {
    return sel.ranges.every((range) => this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to));
  }
}
const setActive = /* @__PURE__ */ StateEffect.define({
  map(value, changes) {
    return value && value.map(changes);
  }
});
const moveToField = /* @__PURE__ */ StateEffect.define();
const snippetState = /* @__PURE__ */ StateField.define({
  create() {
    return null;
  },
  update(value, tr) {
    for (let effect of tr.effects) {
      if (effect.is(setActive))
        return effect.value;
      if (effect.is(moveToField) && value)
        return new ActiveSnippet(value.ranges, effect.value);
    }
    if (value && tr.docChanged)
      value = value.map(tr.changes);
    if (value && tr.selection && !value.selectionInsideField(tr.selection))
      value = null;
    return value;
  },
  provide: (f) => EditorView.decorations.from(f, (val) => val ? val.deco : Decoration.none)
});
function fieldSelection(ranges, field) {
  return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
}
function snippet(template) {
  let snippet2 = Snippet.parse(template);
  return (editor, completion, from, to) => {
    let { text, ranges } = snippet2.instantiate(editor.state, from);
    let spec = {
      changes: { from, to, insert: Text.of(text) },
      scrollIntoView: true,
      annotations: completion ? [pickedCompletion.of(completion), Transaction.userEvent.of("input.complete")] : void 0
    };
    if (ranges.length)
      spec.selection = fieldSelection(ranges, 0);
    if (ranges.some((r) => r.field > 0)) {
      let active = new ActiveSnippet(ranges, 0);
      let effects = spec.effects = [setActive.of(active)];
      if (editor.state.field(snippetState, false) === void 0)
        effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme]));
    }
    editor.dispatch(editor.state.update(spec));
  };
}
function moveField(dir) {
  return ({ state, dispatch }) => {
    let active = state.field(snippetState, false);
    if (!active || dir < 0 && active.active == 0)
      return false;
    let next = active.active + dir, last = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
    dispatch(state.update({
      selection: fieldSelection(active.ranges, next),
      effects: setActive.of(last ? null : new ActiveSnippet(active.ranges, next)),
      scrollIntoView: true
    }));
    return true;
  };
}
const clearSnippet = ({ state, dispatch }) => {
  let active = state.field(snippetState, false);
  if (!active)
    return false;
  dispatch(state.update({ effects: setActive.of(null) }));
  return true;
};
const nextSnippetField = /* @__PURE__ */ moveField(1);
const prevSnippetField = /* @__PURE__ */ moveField(-1);
const defaultSnippetKeymap = [
  { key: "Tab", run: nextSnippetField, shift: prevSnippetField },
  { key: "Escape", run: clearSnippet }
];
const snippetKeymap = /* @__PURE__ */ Facet.define({
  combine(maps) {
    return maps.length ? maps[0] : defaultSnippetKeymap;
  }
});
const addSnippetKeymap = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
function snippetCompletion(template, completion) {
  return Object.assign(Object.assign({}, completion), { apply: snippet(template) });
}
const snippetPointerHandler = /* @__PURE__ */ EditorView.domEventHandlers({
  mousedown(event, view) {
    let active = view.state.field(snippetState, false), pos;
    if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null)
      return false;
    let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
    if (!match || match.field == active.active)
      return false;
    view.dispatch({
      selection: fieldSelection(active.ranges, match.field),
      effects: setActive.of(active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null),
      scrollIntoView: true
    });
    return true;
  }
});
const defaults = {
  brackets: ["(", "[", "{", "'", '"'],
  before: ")]}:;>",
  stringPrefixes: []
};
const closeBracketEffect = /* @__PURE__ */ StateEffect.define({
  map(value, mapping) {
    let mapped = mapping.mapPos(value, -1, MapMode.TrackAfter);
    return mapped == null ? void 0 : mapped;
  }
});
const closedBracket = /* @__PURE__ */ new class extends RangeValue {
}();
closedBracket.startSide = 1;
closedBracket.endSide = -1;
const bracketState = /* @__PURE__ */ StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(value, tr) {
    value = value.map(tr.changes);
    if (tr.selection) {
      let line = tr.state.doc.lineAt(tr.selection.main.head);
      value = value.update({ filter: (from) => from >= line.from && from <= line.to });
    }
    for (let effect of tr.effects)
      if (effect.is(closeBracketEffect))
        value = value.update({ add: [closedBracket.range(effect.value, effect.value + 1)] });
    return value;
  }
});
function closeBrackets() {
  return [inputHandler, bracketState];
}
const definedClosing = "()[]{}<>";
function closing(ch) {
  for (let i = 0; i < definedClosing.length; i += 2)
    if (definedClosing.charCodeAt(i) == ch)
      return definedClosing.charAt(i + 1);
  return fromCodePoint(ch < 128 ? ch : ch + 1);
}
function config(state, pos) {
  return state.languageDataAt("closeBrackets", pos)[0] || defaults;
}
const android$1 = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
const inputHandler = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, insert) => {
  if ((android$1 ? view.composing : view.compositionStarted) || view.state.readOnly)
    return false;
  let sel = view.state.selection.main;
  if (insert.length > 2 || insert.length == 2 && codePointSize(codePointAt(insert, 0)) == 1 || from != sel.from || to != sel.to)
    return false;
  let tr = insertBracket(view.state, insert);
  if (!tr)
    return false;
  view.dispatch(tr);
  return true;
});
const deleteBracketPair = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let conf = config(state, state.selection.main.head);
  let tokens = conf.brackets || defaults.brackets;
  let dont = null, changes = state.changeByRange((range) => {
    if (range.empty) {
      let before = prevChar(state.doc, range.head);
      for (let token of tokens) {
        if (token == before && nextChar(state.doc, range.head) == closing(codePointAt(token, 0)))
          return {
            changes: { from: range.head - token.length, to: range.head + token.length },
            range: EditorSelection.cursor(range.head - token.length)
          };
      }
    }
    return { range: dont = range };
  });
  if (!dont)
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "delete.backward" }));
  return !dont;
};
const closeBracketsKeymap = [
  { key: "Backspace", run: deleteBracketPair }
];
function insertBracket(state, bracket) {
  let conf = config(state, state.selection.main.head);
  let tokens = conf.brackets || defaults.brackets;
  for (let tok of tokens) {
    let closed = closing(codePointAt(tok, 0));
    if (bracket == tok)
      return closed == tok ? handleSame(state, tok, tokens.indexOf(tok + tok + tok) > -1, conf) : handleOpen(state, tok, closed, conf.before || defaults.before);
    if (bracket == closed && closedBracketAt(state, state.selection.main.from))
      return handleClose(state, tok, closed);
  }
  return null;
}
function closedBracketAt(state, pos) {
  let found = false;
  state.field(bracketState).between(0, state.doc.length, (from) => {
    if (from == pos)
      found = true;
  });
  return found;
}
function nextChar(doc, pos) {
  let next = doc.sliceString(pos, pos + 2);
  return next.slice(0, codePointSize(codePointAt(next, 0)));
}
function prevChar(doc, pos) {
  let prev = doc.sliceString(pos - 2, pos);
  return codePointSize(codePointAt(prev, 0)) == prev.length ? prev : prev.slice(1);
}
function handleOpen(state, open, close, closeBefore) {
  let dont = null, changes = state.changeByRange((range) => {
    if (!range.empty)
      return {
        changes: [{ insert: open, from: range.from }, { insert: close, from: range.to }],
        effects: closeBracketEffect.of(range.to + open.length),
        range: EditorSelection.range(range.anchor + open.length, range.head + open.length)
      };
    let next = nextChar(state.doc, range.head);
    if (!next || /\s/.test(next) || closeBefore.indexOf(next) > -1)
      return {
        changes: { insert: open + close, from: range.head },
        effects: closeBracketEffect.of(range.head + open.length),
        range: EditorSelection.cursor(range.head + open.length)
      };
    return { range: dont = range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function handleClose(state, _open, close) {
  let dont = null, changes = state.changeByRange((range) => {
    if (range.empty && nextChar(state.doc, range.head) == close)
      return {
        changes: { from: range.head, to: range.head + close.length, insert: close },
        range: EditorSelection.cursor(range.head + close.length)
      };
    return dont = { range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function handleSame(state, token, allowTriple, config2) {
  let stringPrefixes = config2.stringPrefixes || defaults.stringPrefixes;
  let dont = null, changes = state.changeByRange((range) => {
    if (!range.empty)
      return {
        changes: [{ insert: token, from: range.from }, { insert: token, from: range.to }],
        effects: closeBracketEffect.of(range.to + token.length),
        range: EditorSelection.range(range.anchor + token.length, range.head + token.length)
      };
    let pos = range.head, next = nextChar(state.doc, pos), start;
    if (next == token) {
      if (nodeStart(state, pos)) {
        return {
          changes: { insert: token + token, from: pos },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
      } else if (closedBracketAt(state, pos)) {
        let isTriple = allowTriple && state.sliceDoc(pos, pos + token.length * 3) == token + token + token;
        let content = isTriple ? token + token + token : token;
        return {
          changes: { from: pos, to: pos + content.length, insert: content },
          range: EditorSelection.cursor(pos + content.length)
        };
      }
    } else if (allowTriple && state.sliceDoc(pos - 2 * token.length, pos) == token + token && (start = canStartStringAt(state, pos - 2 * token.length, stringPrefixes)) > -1 && nodeStart(state, start)) {
      return {
        changes: { insert: token + token + token + token, from: pos },
        effects: closeBracketEffect.of(pos + token.length),
        range: EditorSelection.cursor(pos + token.length)
      };
    } else if (state.charCategorizer(pos)(next) != CharCategory.Word) {
      if (canStartStringAt(state, pos, stringPrefixes) > -1 && !probablyInString(state, pos, token, stringPrefixes))
        return {
          changes: { insert: token + token, from: pos },
          effects: closeBracketEffect.of(pos + token.length),
          range: EditorSelection.cursor(pos + token.length)
        };
    }
    return { range: dont = range };
  });
  return dont ? null : state.update(changes, {
    scrollIntoView: true,
    userEvent: "input.type"
  });
}
function nodeStart(state, pos) {
  let tree = syntaxTree(state).resolveInner(pos + 1);
  return tree.parent && tree.from == pos;
}
function probablyInString(state, pos, quoteToken, prefixes) {
  let node = syntaxTree(state).resolveInner(pos, -1);
  let maxPrefix = prefixes.reduce((m, p) => Math.max(m, p.length), 0);
  for (let i = 0; i < 5; i++) {
    let start = state.sliceDoc(node.from, Math.min(node.to, node.from + quoteToken.length + maxPrefix));
    let quotePos = start.indexOf(quoteToken);
    if (!quotePos || quotePos > -1 && prefixes.indexOf(start.slice(0, quotePos)) > -1) {
      let first = node.firstChild;
      while (first && first.from == node.from && first.to - first.from > quoteToken.length + quotePos) {
        if (state.sliceDoc(first.to - quoteToken.length, first.to) == quoteToken)
          return false;
        first = first.firstChild;
      }
      return true;
    }
    let parent = node.to == pos && node.parent;
    if (!parent)
      break;
    node = parent;
  }
  return false;
}
function canStartStringAt(state, pos, prefixes) {
  let charCat = state.charCategorizer(pos);
  if (charCat(state.sliceDoc(pos - 1, pos)) != CharCategory.Word)
    return pos;
  for (let prefix of prefixes) {
    let start = pos - prefix.length;
    if (state.sliceDoc(start, pos) == prefix && charCat(state.sliceDoc(start - 1, start)) != CharCategory.Word)
      return start;
  }
  return -1;
}
const toggleComment = (target) => {
  let { state } = target, line = state.doc.lineAt(state.selection.main.from), config2 = getConfig(target.state, line.from);
  return config2.line ? toggleLineComment(target) : config2.block ? toggleBlockCommentByLine(target) : false;
};
function command(f, option) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let tr = f(option, state);
    if (!tr)
      return false;
    dispatch(state.update(tr));
    return true;
  };
}
const toggleLineComment = /* @__PURE__ */ command(
  changeLineComment,
  0
  /* CommentOption.Toggle */
);
const toggleBlockComment = /* @__PURE__ */ command(
  changeBlockComment,
  0
  /* CommentOption.Toggle */
);
const toggleBlockCommentByLine = /* @__PURE__ */ command(
  (o, s) => changeBlockComment(o, s, selectedLineRanges(s)),
  0
  /* CommentOption.Toggle */
);
function getConfig(state, pos) {
  let data = state.languageDataAt("commentTokens", pos);
  return data.length ? data[0] : {};
}
const SearchMargin = 50;
function findBlockComment(state, { open, close }, from, to) {
  let textBefore = state.sliceDoc(from - SearchMargin, from);
  let textAfter = state.sliceDoc(to, to + SearchMargin);
  let spaceBefore = /\s*$/.exec(textBefore)[0].length, spaceAfter = /^\s*/.exec(textAfter)[0].length;
  let beforeOff = textBefore.length - spaceBefore;
  if (textBefore.slice(beforeOff - open.length, beforeOff) == open && textAfter.slice(spaceAfter, spaceAfter + close.length) == close) {
    return {
      open: { pos: from - spaceBefore, margin: spaceBefore && 1 },
      close: { pos: to + spaceAfter, margin: spaceAfter && 1 }
    };
  }
  let startText, endText;
  if (to - from <= 2 * SearchMargin) {
    startText = endText = state.sliceDoc(from, to);
  } else {
    startText = state.sliceDoc(from, from + SearchMargin);
    endText = state.sliceDoc(to - SearchMargin, to);
  }
  let startSpace = /^\s*/.exec(startText)[0].length, endSpace = /\s*$/.exec(endText)[0].length;
  let endOff = endText.length - endSpace - close.length;
  if (startText.slice(startSpace, startSpace + open.length) == open && endText.slice(endOff, endOff + close.length) == close) {
    return {
      open: {
        pos: from + startSpace + open.length,
        margin: /\s/.test(startText.charAt(startSpace + open.length)) ? 1 : 0
      },
      close: {
        pos: to - endSpace - close.length,
        margin: /\s/.test(endText.charAt(endOff - 1)) ? 1 : 0
      }
    };
  }
  return null;
}
function selectedLineRanges(state) {
  let ranges = [];
  for (let r of state.selection.ranges) {
    let fromLine = state.doc.lineAt(r.from);
    let toLine = r.to <= fromLine.to ? fromLine : state.doc.lineAt(r.to);
    let last = ranges.length - 1;
    if (last >= 0 && ranges[last].to > fromLine.from)
      ranges[last].to = toLine.to;
    else
      ranges.push({ from: fromLine.from + /^\s*/.exec(fromLine.text)[0].length, to: toLine.to });
  }
  return ranges;
}
function changeBlockComment(option, state, ranges = state.selection.ranges) {
  let tokens = ranges.map((r) => getConfig(state, r.from).block);
  if (!tokens.every((c) => c))
    return null;
  let comments = ranges.map((r, i) => findBlockComment(state, tokens[i], r.from, r.to));
  if (option != 2 && !comments.every((c) => c)) {
    return { changes: state.changes(ranges.map((range, i) => {
      if (comments[i])
        return [];
      return [{ from: range.from, insert: tokens[i].open + " " }, { from: range.to, insert: " " + tokens[i].close }];
    })) };
  } else if (option != 1 && comments.some((c) => c)) {
    let changes = [];
    for (let i = 0, comment; i < comments.length; i++)
      if (comment = comments[i]) {
        let token = tokens[i], { open, close } = comment;
        changes.push({ from: open.pos - token.open.length, to: open.pos + open.margin }, { from: close.pos - close.margin, to: close.pos + token.close.length });
      }
    return { changes };
  }
  return null;
}
function changeLineComment(option, state, ranges = state.selection.ranges) {
  let lines = [];
  let prevLine = -1;
  for (let { from, to } of ranges) {
    let startI = lines.length, minIndent = 1e9;
    let token = getConfig(state, from).line;
    if (!token)
      continue;
    for (let pos = from; pos <= to; ) {
      let line = state.doc.lineAt(pos);
      if (line.from > prevLine && (from == to || to > line.from)) {
        prevLine = line.from;
        let indent = /^\s*/.exec(line.text)[0].length;
        let empty = indent == line.length;
        let comment = line.text.slice(indent, indent + token.length) == token ? indent : -1;
        if (indent < line.text.length && indent < minIndent)
          minIndent = indent;
        lines.push({ line, comment, token, indent, empty, single: false });
      }
      pos = line.to + 1;
    }
    if (minIndent < 1e9) {
      for (let i = startI; i < lines.length; i++)
        if (lines[i].indent < lines[i].line.text.length)
          lines[i].indent = minIndent;
    }
    if (lines.length == startI + 1)
      lines[startI].single = true;
  }
  if (option != 2 && lines.some((l) => l.comment < 0 && (!l.empty || l.single))) {
    let changes = [];
    for (let { line, token, indent, empty, single } of lines)
      if (single || !empty)
        changes.push({ from: line.from + indent, insert: token + " " });
    let changeSet = state.changes(changes);
    return { changes: changeSet, selection: state.selection.map(changeSet, 1) };
  } else if (option != 1 && lines.some((l) => l.comment >= 0)) {
    let changes = [];
    for (let { line, comment, token } of lines)
      if (comment >= 0) {
        let from = line.from + comment, to = from + token.length;
        if (line.text[to - line.from] == " ")
          to++;
        changes.push({ from, to });
      }
    return { changes };
  }
  return null;
}
const fromHistory = /* @__PURE__ */ Annotation.define();
const isolateHistory = /* @__PURE__ */ Annotation.define();
const invertedEffects = /* @__PURE__ */ Facet.define();
const historyConfig = /* @__PURE__ */ Facet.define({
  combine(configs) {
    return combineConfig(configs, {
      minDepth: 100,
      newGroupDelay: 500,
      joinToEvent: (_t, isAdjacent2) => isAdjacent2
    }, {
      minDepth: Math.max,
      newGroupDelay: Math.min,
      joinToEvent: (a, b) => (tr, adj) => a(tr, adj) || b(tr, adj)
    });
  }
});
const historyField_ = /* @__PURE__ */ StateField.define({
  create() {
    return HistoryState.empty;
  },
  update(state, tr) {
    let config2 = tr.state.facet(historyConfig);
    let fromHist = tr.annotation(fromHistory);
    if (fromHist) {
      let item = HistEvent.fromTransaction(tr, fromHist.selection), from = fromHist.side;
      let other = from == 0 ? state.undone : state.done;
      if (item)
        other = updateBranch(other, other.length, config2.minDepth, item);
      else
        other = addSelection(other, tr.startState.selection);
      return new HistoryState(from == 0 ? fromHist.rest : other, from == 0 ? other : fromHist.rest);
    }
    let isolate = tr.annotation(isolateHistory);
    if (isolate == "full" || isolate == "before")
      state = state.isolate();
    if (tr.annotation(Transaction.addToHistory) === false)
      return !tr.changes.empty ? state.addMapping(tr.changes.desc) : state;
    let event = HistEvent.fromTransaction(tr);
    let time = tr.annotation(Transaction.time), userEvent = tr.annotation(Transaction.userEvent);
    if (event)
      state = state.addChanges(event, time, userEvent, config2, tr);
    else if (tr.selection)
      state = state.addSelection(tr.startState.selection, time, userEvent, config2.newGroupDelay);
    if (isolate == "full" || isolate == "after")
      state = state.isolate();
    return state;
  },
  toJSON(value) {
    return { done: value.done.map((e) => e.toJSON()), undone: value.undone.map((e) => e.toJSON()) };
  },
  fromJSON(json) {
    return new HistoryState(json.done.map(HistEvent.fromJSON), json.undone.map(HistEvent.fromJSON));
  }
});
function history(config2 = {}) {
  return [
    historyField_,
    historyConfig.of(config2),
    EditorView.domEventHandlers({
      beforeinput(e, view) {
        let command2 = e.inputType == "historyUndo" ? undo : e.inputType == "historyRedo" ? redo : null;
        if (!command2)
          return false;
        e.preventDefault();
        return command2(view);
      }
    })
  ];
}
function cmd(side, selection) {
  return function({ state, dispatch }) {
    if (!selection && state.readOnly)
      return false;
    let historyState = state.field(historyField_, false);
    if (!historyState)
      return false;
    let tr = historyState.pop(side, state, selection);
    if (!tr)
      return false;
    dispatch(tr);
    return true;
  };
}
const undo = /* @__PURE__ */ cmd(0, false);
const redo = /* @__PURE__ */ cmd(1, false);
const undoSelection = /* @__PURE__ */ cmd(0, true);
const redoSelection = /* @__PURE__ */ cmd(1, true);
class HistEvent {
  constructor(changes, effects, mapped, startSelection, selectionsAfter) {
    this.changes = changes;
    this.effects = effects;
    this.mapped = mapped;
    this.startSelection = startSelection;
    this.selectionsAfter = selectionsAfter;
  }
  setSelAfter(after) {
    return new HistEvent(this.changes, this.effects, this.mapped, this.startSelection, after);
  }
  toJSON() {
    var _a, _b, _c;
    return {
      changes: (_a = this.changes) === null || _a === void 0 ? void 0 : _a.toJSON(),
      mapped: (_b = this.mapped) === null || _b === void 0 ? void 0 : _b.toJSON(),
      startSelection: (_c = this.startSelection) === null || _c === void 0 ? void 0 : _c.toJSON(),
      selectionsAfter: this.selectionsAfter.map((s) => s.toJSON())
    };
  }
  static fromJSON(json) {
    return new HistEvent(json.changes && ChangeSet.fromJSON(json.changes), [], json.mapped && ChangeDesc.fromJSON(json.mapped), json.startSelection && EditorSelection.fromJSON(json.startSelection), json.selectionsAfter.map(EditorSelection.fromJSON));
  }
  // This does not check `addToHistory` and such, it assumes the
  // transaction needs to be converted to an item. Returns null when
  // there are no changes or effects in the transaction.
  static fromTransaction(tr, selection) {
    let effects = none;
    for (let invert of tr.startState.facet(invertedEffects)) {
      let result = invert(tr);
      if (result.length)
        effects = effects.concat(result);
    }
    if (!effects.length && tr.changes.empty)
      return null;
    return new HistEvent(tr.changes.invert(tr.startState.doc), effects, void 0, selection || tr.startState.selection, none);
  }
  static selection(selections) {
    return new HistEvent(void 0, none, void 0, void 0, selections);
  }
}
function updateBranch(branch, to, maxLen, newEvent) {
  let start = to + 1 > maxLen + 20 ? to - maxLen - 1 : 0;
  let newBranch = branch.slice(start, to);
  newBranch.push(newEvent);
  return newBranch;
}
function isAdjacent(a, b) {
  let ranges = [], isAdjacent2 = false;
  a.iterChangedRanges((f, t) => ranges.push(f, t));
  b.iterChangedRanges((_f, _t, f, t) => {
    for (let i = 0; i < ranges.length; ) {
      let from = ranges[i++], to = ranges[i++];
      if (t >= from && f <= to)
        isAdjacent2 = true;
    }
  });
  return isAdjacent2;
}
function eqSelectionShape(a, b) {
  return a.ranges.length == b.ranges.length && a.ranges.filter((r, i) => r.empty != b.ranges[i].empty).length === 0;
}
function conc(a, b) {
  return !a.length ? b : !b.length ? a : a.concat(b);
}
const none = [];
const MaxSelectionsPerEvent = 200;
function addSelection(branch, selection) {
  if (!branch.length) {
    return [HistEvent.selection([selection])];
  } else {
    let lastEvent = branch[branch.length - 1];
    let sels = lastEvent.selectionsAfter.slice(Math.max(0, lastEvent.selectionsAfter.length - MaxSelectionsPerEvent));
    if (sels.length && sels[sels.length - 1].eq(selection))
      return branch;
    sels.push(selection);
    return updateBranch(branch, branch.length - 1, 1e9, lastEvent.setSelAfter(sels));
  }
}
function popSelection(branch) {
  let last = branch[branch.length - 1];
  let newBranch = branch.slice();
  newBranch[branch.length - 1] = last.setSelAfter(last.selectionsAfter.slice(0, last.selectionsAfter.length - 1));
  return newBranch;
}
function addMappingToBranch(branch, mapping) {
  if (!branch.length)
    return branch;
  let length = branch.length, selections = none;
  while (length) {
    let event = mapEvent(branch[length - 1], mapping, selections);
    if (event.changes && !event.changes.empty || event.effects.length) {
      let result = branch.slice(0, length);
      result[length - 1] = event;
      return result;
    } else {
      mapping = event.mapped;
      length--;
      selections = event.selectionsAfter;
    }
  }
  return selections.length ? [HistEvent.selection(selections)] : none;
}
function mapEvent(event, mapping, extraSelections) {
  let selections = conc(event.selectionsAfter.length ? event.selectionsAfter.map((s) => s.map(mapping)) : none, extraSelections);
  if (!event.changes)
    return HistEvent.selection(selections);
  let mappedChanges = event.changes.map(mapping), before = mapping.mapDesc(event.changes, true);
  let fullMapping = event.mapped ? event.mapped.composeDesc(before) : before;
  return new HistEvent(mappedChanges, StateEffect.mapEffects(event.effects, mapping), fullMapping, event.startSelection.map(before), selections);
}
const joinableUserEvent = /^(input\.type|delete)($|\.)/;
class HistoryState {
  constructor(done, undone, prevTime = 0, prevUserEvent = void 0) {
    this.done = done;
    this.undone = undone;
    this.prevTime = prevTime;
    this.prevUserEvent = prevUserEvent;
  }
  isolate() {
    return this.prevTime ? new HistoryState(this.done, this.undone) : this;
  }
  addChanges(event, time, userEvent, config2, tr) {
    let done = this.done, lastEvent = done[done.length - 1];
    if (lastEvent && lastEvent.changes && !lastEvent.changes.empty && event.changes && (!userEvent || joinableUserEvent.test(userEvent)) && (!lastEvent.selectionsAfter.length && time - this.prevTime < config2.newGroupDelay && config2.joinToEvent(tr, isAdjacent(lastEvent.changes, event.changes)) || // For compose (but not compose.start) events, always join with previous event
    userEvent == "input.type.compose")) {
      done = updateBranch(done, done.length - 1, config2.minDepth, new HistEvent(event.changes.compose(lastEvent.changes), conc(event.effects, lastEvent.effects), lastEvent.mapped, lastEvent.startSelection, none));
    } else {
      done = updateBranch(done, done.length, config2.minDepth, event);
    }
    return new HistoryState(done, none, time, userEvent);
  }
  addSelection(selection, time, userEvent, newGroupDelay) {
    let last = this.done.length ? this.done[this.done.length - 1].selectionsAfter : none;
    if (last.length > 0 && time - this.prevTime < newGroupDelay && userEvent == this.prevUserEvent && userEvent && /^select($|\.)/.test(userEvent) && eqSelectionShape(last[last.length - 1], selection))
      return this;
    return new HistoryState(addSelection(this.done, selection), this.undone, time, userEvent);
  }
  addMapping(mapping) {
    return new HistoryState(addMappingToBranch(this.done, mapping), addMappingToBranch(this.undone, mapping), this.prevTime, this.prevUserEvent);
  }
  pop(side, state, onlySelection) {
    let branch = side == 0 ? this.done : this.undone;
    if (branch.length == 0)
      return null;
    let event = branch[branch.length - 1], selection = event.selectionsAfter[0] || state.selection;
    if (onlySelection && event.selectionsAfter.length) {
      return state.update({
        selection: event.selectionsAfter[event.selectionsAfter.length - 1],
        annotations: fromHistory.of({ side, rest: popSelection(branch), selection }),
        userEvent: side == 0 ? "select.undo" : "select.redo",
        scrollIntoView: true
      });
    } else if (!event.changes) {
      return null;
    } else {
      let rest = branch.length == 1 ? none : branch.slice(0, branch.length - 1);
      if (event.mapped)
        rest = addMappingToBranch(rest, event.mapped);
      return state.update({
        changes: event.changes,
        selection: event.startSelection,
        effects: event.effects,
        annotations: fromHistory.of({ side, rest, selection }),
        filter: false,
        userEvent: side == 0 ? "undo" : "redo",
        scrollIntoView: true
      });
    }
  }
}
HistoryState.empty = /* @__PURE__ */ new HistoryState(none, none);
const historyKeymap = [
  { key: "Mod-z", run: undo, preventDefault: true },
  { key: "Mod-y", mac: "Mod-Shift-z", run: redo, preventDefault: true },
  { linux: "Ctrl-Shift-z", run: redo, preventDefault: true },
  { key: "Mod-u", run: undoSelection, preventDefault: true },
  { key: "Alt-u", mac: "Mod-Shift-u", run: redoSelection, preventDefault: true }
];
function updateSel(sel, by) {
  return EditorSelection.create(sel.ranges.map(by), sel.mainIndex);
}
function setSel(state, selection) {
  return state.update({ selection, scrollIntoView: true, userEvent: "select" });
}
function moveSel({ state, dispatch }, how) {
  let selection = updateSel(state.selection, how);
  if (selection.eq(state.selection, true))
    return false;
  dispatch(setSel(state, selection));
  return true;
}
function rangeEnd(range, forward) {
  return EditorSelection.cursor(forward ? range.to : range.from);
}
function cursorByChar(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByChar(range, forward) : rangeEnd(range, forward));
}
function ltrAtCursor(view) {
  return view.textDirectionAt(view.state.selection.main.head) == Direction.LTR;
}
const cursorCharLeft = (view) => cursorByChar(view, !ltrAtCursor(view));
const cursorCharRight = (view) => cursorByChar(view, ltrAtCursor(view));
function cursorByGroup(view, forward) {
  return moveSel(view, (range) => range.empty ? view.moveByGroup(range, forward) : rangeEnd(range, forward));
}
const cursorGroupLeft = (view) => cursorByGroup(view, !ltrAtCursor(view));
const cursorGroupRight = (view) => cursorByGroup(view, ltrAtCursor(view));
function interestingNode(state, node, bracketProp) {
  if (node.type.prop(bracketProp))
    return true;
  let len = node.to - node.from;
  return len && (len > 2 || /[^\s,.;:]/.test(state.sliceDoc(node.from, node.to))) || node.firstChild;
}
function moveBySyntax(state, start, forward) {
  let pos = syntaxTree(state).resolveInner(start.head);
  let bracketProp = forward ? NodeProp.closedBy : NodeProp.openedBy;
  for (let at = start.head; ; ) {
    let next = forward ? pos.childAfter(at) : pos.childBefore(at);
    if (!next)
      break;
    if (interestingNode(state, next, bracketProp))
      pos = next;
    else
      at = forward ? next.to : next.from;
  }
  let bracket = pos.type.prop(bracketProp), match, newPos;
  if (bracket && (match = forward ? matchBrackets(state, pos.from, 1) : matchBrackets(state, pos.to, -1)) && match.matched)
    newPos = forward ? match.end.to : match.end.from;
  else
    newPos = forward ? pos.to : pos.from;
  return EditorSelection.cursor(newPos, forward ? -1 : 1);
}
const cursorSyntaxLeft = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
const cursorSyntaxRight = (view) => moveSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function cursorByLine(view, forward) {
  return moveSel(view, (range) => {
    if (!range.empty)
      return rangeEnd(range, forward);
    let moved = view.moveVertically(range, forward);
    return moved.head != range.head ? moved : view.moveToLineBoundary(range, forward);
  });
}
const cursorLineUp = (view) => cursorByLine(view, false);
const cursorLineDown = (view) => cursorByLine(view, true);
function pageInfo(view) {
  let selfScroll = view.scrollDOM.clientHeight < view.scrollDOM.scrollHeight - 2;
  let marginTop = 0, marginBottom = 0, height;
  if (selfScroll) {
    for (let source of view.state.facet(EditorView.scrollMargins)) {
      let margins = source(view);
      if (margins === null || margins === void 0 ? void 0 : margins.top)
        marginTop = Math.max(margins === null || margins === void 0 ? void 0 : margins.top, marginTop);
      if (margins === null || margins === void 0 ? void 0 : margins.bottom)
        marginBottom = Math.max(margins === null || margins === void 0 ? void 0 : margins.bottom, marginBottom);
    }
    height = view.scrollDOM.clientHeight - marginTop - marginBottom;
  } else {
    height = (view.dom.ownerDocument.defaultView || window).innerHeight;
  }
  return {
    marginTop,
    marginBottom,
    selfScroll,
    height: Math.max(view.defaultLineHeight, height - 5)
  };
}
function cursorByPage(view, forward) {
  let page = pageInfo(view);
  let { state } = view, selection = updateSel(state.selection, (range) => {
    return range.empty ? view.moveVertically(range, forward, page.height) : rangeEnd(range, forward);
  });
  if (selection.eq(state.selection))
    return false;
  let effect;
  if (page.selfScroll) {
    let startPos = view.coordsAtPos(state.selection.main.head);
    let scrollRect = view.scrollDOM.getBoundingClientRect();
    let scrollTop = scrollRect.top + page.marginTop, scrollBottom = scrollRect.bottom - page.marginBottom;
    if (startPos && startPos.top > scrollTop && startPos.bottom < scrollBottom)
      effect = EditorView.scrollIntoView(selection.main.head, { y: "start", yMargin: startPos.top - scrollTop });
  }
  view.dispatch(setSel(state, selection), { effects: effect });
  return true;
}
const cursorPageUp = (view) => cursorByPage(view, false);
const cursorPageDown = (view) => cursorByPage(view, true);
function moveByLineBoundary(view, start, forward) {
  let line = view.lineBlockAt(start.head), moved = view.moveToLineBoundary(start, forward);
  if (moved.head == start.head && moved.head != (forward ? line.to : line.from))
    moved = view.moveToLineBoundary(start, forward, false);
  if (!forward && moved.head == line.from && line.length) {
    let space = /^\s*/.exec(view.state.sliceDoc(line.from, Math.min(line.from + 100, line.to)))[0].length;
    if (space && start.head != line.from + space)
      moved = EditorSelection.cursor(line.from + space);
  }
  return moved;
}
const cursorLineBoundaryForward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, true));
const cursorLineBoundaryBackward = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, false));
const cursorLineBoundaryLeft = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
const cursorLineBoundaryRight = (view) => moveSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
const cursorLineStart = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from, 1));
const cursorLineEnd = (view) => moveSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to, -1));
function toMatchingBracket(state, dispatch, extend) {
  let found = false, selection = updateSel(state.selection, (range) => {
    let matching = matchBrackets(state, range.head, -1) || matchBrackets(state, range.head, 1) || range.head > 0 && matchBrackets(state, range.head - 1, 1) || range.head < state.doc.length && matchBrackets(state, range.head + 1, -1);
    if (!matching || !matching.end)
      return range;
    found = true;
    let head = matching.start.from == range.head ? matching.end.to : matching.end.from;
    return EditorSelection.cursor(head);
  });
  if (!found)
    return false;
  dispatch(setSel(state, selection));
  return true;
}
const cursorMatchingBracket = ({ state, dispatch }) => toMatchingBracket(state, dispatch);
function extendSel(view, how) {
  let selection = updateSel(view.state.selection, (range) => {
    let head = how(range);
    return EditorSelection.range(range.anchor, head.head, head.goalColumn, head.bidiLevel || void 0);
  });
  if (selection.eq(view.state.selection))
    return false;
  view.dispatch(setSel(view.state, selection));
  return true;
}
function selectByChar(view, forward) {
  return extendSel(view, (range) => view.moveByChar(range, forward));
}
const selectCharLeft = (view) => selectByChar(view, !ltrAtCursor(view));
const selectCharRight = (view) => selectByChar(view, ltrAtCursor(view));
function selectByGroup(view, forward) {
  return extendSel(view, (range) => view.moveByGroup(range, forward));
}
const selectGroupLeft = (view) => selectByGroup(view, !ltrAtCursor(view));
const selectGroupRight = (view) => selectByGroup(view, ltrAtCursor(view));
const selectSyntaxLeft = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, !ltrAtCursor(view)));
const selectSyntaxRight = (view) => extendSel(view, (range) => moveBySyntax(view.state, range, ltrAtCursor(view)));
function selectByLine(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward));
}
const selectLineUp = (view) => selectByLine(view, false);
const selectLineDown = (view) => selectByLine(view, true);
function selectByPage(view, forward) {
  return extendSel(view, (range) => view.moveVertically(range, forward, pageInfo(view).height));
}
const selectPageUp = (view) => selectByPage(view, false);
const selectPageDown = (view) => selectByPage(view, true);
const selectLineBoundaryForward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, true));
const selectLineBoundaryBackward = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, false));
const selectLineBoundaryLeft = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, !ltrAtCursor(view)));
const selectLineBoundaryRight = (view) => extendSel(view, (range) => moveByLineBoundary(view, range, ltrAtCursor(view)));
const selectLineStart = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).from));
const selectLineEnd = (view) => extendSel(view, (range) => EditorSelection.cursor(view.lineBlockAt(range.head).to));
const cursorDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: 0 }));
  return true;
};
const cursorDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.doc.length }));
  return true;
};
const selectDocStart = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: 0 }));
  return true;
};
const selectDocEnd = ({ state, dispatch }) => {
  dispatch(setSel(state, { anchor: state.selection.main.anchor, head: state.doc.length }));
  return true;
};
const selectAll = ({ state, dispatch }) => {
  dispatch(state.update({ selection: { anchor: 0, head: state.doc.length }, userEvent: "select" }));
  return true;
};
const selectLine = ({ state, dispatch }) => {
  let ranges = selectedLineBlocks(state).map(({ from, to }) => EditorSelection.range(from, Math.min(to + 1, state.doc.length)));
  dispatch(state.update({ selection: EditorSelection.create(ranges), userEvent: "select" }));
  return true;
};
const selectParentSyntax = ({ state, dispatch }) => {
  let selection = updateSel(state.selection, (range) => {
    var _a;
    let stack = syntaxTree(state).resolveStack(range.from, 1);
    for (let cur = stack; cur; cur = cur.next) {
      let { node } = cur;
      if ((node.from < range.from && node.to >= range.to || node.to > range.to && node.from <= range.from) && ((_a = node.parent) === null || _a === void 0 ? void 0 : _a.parent))
        return EditorSelection.range(node.to, node.from);
    }
    return range;
  });
  dispatch(setSel(state, selection));
  return true;
};
const simplifySelection = ({ state, dispatch }) => {
  let cur = state.selection, selection = null;
  if (cur.ranges.length > 1)
    selection = EditorSelection.create([cur.main]);
  else if (!cur.main.empty)
    selection = EditorSelection.create([EditorSelection.cursor(cur.main.head)]);
  if (!selection)
    return false;
  dispatch(setSel(state, selection));
  return true;
};
function deleteBy(target, by) {
  if (target.state.readOnly)
    return false;
  let event = "delete.selection", { state } = target;
  let changes = state.changeByRange((range) => {
    let { from, to } = range;
    if (from == to) {
      let towards = by(range);
      if (towards < from) {
        event = "delete.backward";
        towards = skipAtomic(target, towards, false);
      } else if (towards > from) {
        event = "delete.forward";
        towards = skipAtomic(target, towards, true);
      }
      from = Math.min(from, towards);
      to = Math.max(to, towards);
    } else {
      from = skipAtomic(target, from, false);
      to = skipAtomic(target, to, true);
    }
    return from == to ? { range } : { changes: { from, to }, range: EditorSelection.cursor(from, from < range.head ? -1 : 1) };
  });
  if (changes.changes.empty)
    return false;
  target.dispatch(state.update(changes, {
    scrollIntoView: true,
    userEvent: event,
    effects: event == "delete.selection" ? EditorView.announce.of(state.phrase("Selection deleted")) : void 0
  }));
  return true;
}
function skipAtomic(target, pos, forward) {
  if (target instanceof EditorView)
    for (let ranges of target.state.facet(EditorView.atomicRanges).map((f) => f(target)))
      ranges.between(pos, pos, (from, to) => {
        if (from < pos && to > pos)
          pos = forward ? to : from;
      });
  return pos;
}
const deleteByChar = (target, forward, byIndentUnit) => deleteBy(target, (range) => {
  let pos = range.from, { state } = target, line = state.doc.lineAt(pos), before, targetPos;
  if (byIndentUnit && !forward && pos > line.from && pos < line.from + 200 && !/[^ \t]/.test(before = line.text.slice(0, pos - line.from))) {
    if (before[before.length - 1] == "	")
      return pos - 1;
    let col = countColumn(before, state.tabSize), drop = col % getIndentUnit(state) || getIndentUnit(state);
    for (let i = 0; i < drop && before[before.length - 1 - i] == " "; i++)
      pos--;
    targetPos = pos;
  } else {
    targetPos = findClusterBreak(line.text, pos - line.from, forward, forward) + line.from;
    if (targetPos == pos && line.number != (forward ? state.doc.lines : 1))
      targetPos += forward ? 1 : -1;
    else if (!forward && /[\ufe00-\ufe0f]/.test(line.text.slice(targetPos - line.from, pos - line.from)))
      targetPos = findClusterBreak(line.text, targetPos - line.from, false, false) + line.from;
  }
  return targetPos;
});
const deleteCharBackward = (view) => deleteByChar(view, false, true);
const deleteCharForward = (view) => deleteByChar(view, true, false);
const deleteByGroup = (target, forward) => deleteBy(target, (range) => {
  let pos = range.head, { state } = target, line = state.doc.lineAt(pos);
  let categorize = state.charCategorizer(pos);
  for (let cat = null; ; ) {
    if (pos == (forward ? line.to : line.from)) {
      if (pos == range.head && line.number != (forward ? state.doc.lines : 1))
        pos += forward ? 1 : -1;
      break;
    }
    let next = findClusterBreak(line.text, pos - line.from, forward) + line.from;
    let nextChar2 = line.text.slice(Math.min(pos, next) - line.from, Math.max(pos, next) - line.from);
    let nextCat = categorize(nextChar2);
    if (cat != null && nextCat != cat)
      break;
    if (nextChar2 != " " || pos != range.head)
      cat = nextCat;
    pos = next;
  }
  return pos;
});
const deleteGroupBackward = (target) => deleteByGroup(target, false);
const deleteGroupForward = (target) => deleteByGroup(target, true);
const deleteToLineEnd = (view) => deleteBy(view, (range) => {
  let lineEnd = view.lineBlockAt(range.head).to;
  return range.head < lineEnd ? lineEnd : Math.min(view.state.doc.length, range.head + 1);
});
const deleteLineBoundaryBackward = (view) => deleteBy(view, (range) => {
  let lineStart = view.moveToLineBoundary(range, false).head;
  return range.head > lineStart ? lineStart : Math.max(0, range.head - 1);
});
const deleteLineBoundaryForward = (view) => deleteBy(view, (range) => {
  let lineStart = view.moveToLineBoundary(range, true).head;
  return range.head < lineStart ? lineStart : Math.min(view.state.doc.length, range.head + 1);
});
const splitLine = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    return {
      changes: { from: range.from, to: range.to, insert: Text.of(["", ""]) },
      range: EditorSelection.cursor(range.from)
    };
  });
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
  return true;
};
const transposeChars = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let changes = state.changeByRange((range) => {
    if (!range.empty || range.from == 0 || range.from == state.doc.length)
      return { range };
    let pos = range.from, line = state.doc.lineAt(pos);
    let from = pos == line.from ? pos - 1 : findClusterBreak(line.text, pos - line.from, false) + line.from;
    let to = pos == line.to ? pos + 1 : findClusterBreak(line.text, pos - line.from, true) + line.from;
    return {
      changes: { from, to, insert: state.doc.slice(pos, to).append(state.doc.slice(from, pos)) },
      range: EditorSelection.cursor(to)
    };
  });
  if (changes.changes.empty)
    return false;
  dispatch(state.update(changes, { scrollIntoView: true, userEvent: "move.character" }));
  return true;
};
function selectedLineBlocks(state) {
  let blocks = [], upto = -1;
  for (let range of state.selection.ranges) {
    let startLine = state.doc.lineAt(range.from), endLine = state.doc.lineAt(range.to);
    if (!range.empty && range.to == endLine.from)
      endLine = state.doc.lineAt(range.to - 1);
    if (upto >= startLine.number) {
      let prev = blocks[blocks.length - 1];
      prev.to = endLine.to;
      prev.ranges.push(range);
    } else {
      blocks.push({ from: startLine.from, to: endLine.to, ranges: [range] });
    }
    upto = endLine.number + 1;
  }
  return blocks;
}
function moveLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [], ranges = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward ? block.to == state.doc.length : block.from == 0)
      continue;
    let nextLine = state.doc.lineAt(forward ? block.to + 1 : block.from - 1);
    let size = nextLine.length + 1;
    if (forward) {
      changes.push({ from: block.to, to: nextLine.to }, { from: block.from, insert: nextLine.text + state.lineBreak });
      for (let r of block.ranges)
        ranges.push(EditorSelection.range(Math.min(state.doc.length, r.anchor + size), Math.min(state.doc.length, r.head + size)));
    } else {
      changes.push({ from: nextLine.from, to: block.from }, { from: block.to, insert: state.lineBreak + nextLine.text });
      for (let r of block.ranges)
        ranges.push(EditorSelection.range(r.anchor - size, r.head - size));
    }
  }
  if (!changes.length)
    return false;
  dispatch(state.update({
    changes,
    scrollIntoView: true,
    selection: EditorSelection.create(ranges, state.selection.mainIndex),
    userEvent: "move.line"
  }));
  return true;
}
const moveLineUp = ({ state, dispatch }) => moveLine(state, dispatch, false);
const moveLineDown = ({ state, dispatch }) => moveLine(state, dispatch, true);
function copyLine(state, dispatch, forward) {
  if (state.readOnly)
    return false;
  let changes = [];
  for (let block of selectedLineBlocks(state)) {
    if (forward)
      changes.push({ from: block.from, insert: state.doc.slice(block.from, block.to) + state.lineBreak });
    else
      changes.push({ from: block.to, insert: state.lineBreak + state.doc.slice(block.from, block.to) });
  }
  dispatch(state.update({ changes, scrollIntoView: true, userEvent: "input.copyline" }));
  return true;
}
const copyLineUp = ({ state, dispatch }) => copyLine(state, dispatch, false);
const copyLineDown = ({ state, dispatch }) => copyLine(state, dispatch, true);
const deleteLine = (view) => {
  if (view.state.readOnly)
    return false;
  let { state } = view, changes = state.changes(selectedLineBlocks(state).map(({ from, to }) => {
    if (from > 0)
      from--;
    else if (to < state.doc.length)
      to++;
    return { from, to };
  }));
  let selection = updateSel(state.selection, (range) => {
    let dist = void 0;
    if (view.lineWrapping) {
      let block = view.lineBlockAt(range.head), pos = view.coordsAtPos(range.head, range.assoc || 1);
      if (pos)
        dist = block.bottom + view.documentTop - pos.bottom + view.defaultLineHeight / 2;
    }
    return view.moveVertically(range, true, dist);
  }).map(changes);
  view.dispatch({ changes, selection, scrollIntoView: true, userEvent: "delete.line" });
  return true;
};
function isBetweenBrackets(state, pos) {
  if (/\(\)|\[\]|\{\}/.test(state.sliceDoc(pos - 1, pos + 1)))
    return { from: pos, to: pos };
  let context = syntaxTree(state).resolveInner(pos);
  let before = context.childBefore(pos), after = context.childAfter(pos), closedBy;
  if (before && after && before.to <= pos && after.from >= pos && (closedBy = before.type.prop(NodeProp.closedBy)) && closedBy.indexOf(after.name) > -1 && state.doc.lineAt(before.to).from == state.doc.lineAt(after.from).from && !/\S/.test(state.sliceDoc(before.to, after.from)))
    return { from: before.to, to: after.from };
  return null;
}
const insertNewlineAndIndent = /* @__PURE__ */ newlineAndIndent(false);
const insertBlankLine = /* @__PURE__ */ newlineAndIndent(true);
function newlineAndIndent(atEof) {
  return ({ state, dispatch }) => {
    if (state.readOnly)
      return false;
    let changes = state.changeByRange((range) => {
      let { from, to } = range, line = state.doc.lineAt(from);
      let explode = !atEof && from == to && isBetweenBrackets(state, from);
      if (atEof)
        from = to = (to <= line.to ? line : state.doc.lineAt(to)).to;
      let cx = new IndentContext(state, { simulateBreak: from, simulateDoubleBreak: !!explode });
      let indent = getIndentation(cx, from);
      if (indent == null)
        indent = countColumn(/^\s*/.exec(state.doc.lineAt(from).text)[0], state.tabSize);
      while (to < line.to && /\s/.test(line.text[to - line.from]))
        to++;
      if (explode)
        ({ from, to } = explode);
      else if (from > line.from && from < line.from + 100 && !/\S/.test(line.text.slice(0, from)))
        from = line.from;
      let insert = ["", indentString(state, indent)];
      if (explode)
        insert.push(indentString(state, cx.lineIndent(line.from, -1)));
      return {
        changes: { from, to, insert: Text.of(insert) },
        range: EditorSelection.cursor(from + 1 + insert[1].length)
      };
    });
    dispatch(state.update(changes, { scrollIntoView: true, userEvent: "input" }));
    return true;
  };
}
function changeBySelectedLine(state, f) {
  let atLine = -1;
  return state.changeByRange((range) => {
    let changes = [];
    for (let pos = range.from; pos <= range.to; ) {
      let line = state.doc.lineAt(pos);
      if (line.number > atLine && (range.empty || range.to > line.from)) {
        f(line, changes, range);
        atLine = line.number;
      }
      pos = line.to + 1;
    }
    let changeSet = state.changes(changes);
    return {
      changes,
      range: EditorSelection.range(changeSet.mapPos(range.anchor, 1), changeSet.mapPos(range.head, 1))
    };
  });
}
const indentSelection = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  let updated = /* @__PURE__ */ Object.create(null);
  let context = new IndentContext(state, { overrideIndentation: (start) => {
    let found = updated[start];
    return found == null ? -1 : found;
  } });
  let changes = changeBySelectedLine(state, (line, changes2, range) => {
    let indent = getIndentation(context, line.from);
    if (indent == null)
      return;
    if (!/\S/.test(line.text))
      indent = 0;
    let cur = /^\s*/.exec(line.text)[0];
    let norm = indentString(state, indent);
    if (cur != norm || range.from < line.from + cur.length) {
      updated[line.from] = indent;
      changes2.push({ from: line.from, to: line.from + cur.length, insert: norm });
    }
  });
  if (!changes.changes.empty)
    dispatch(state.update(changes, { userEvent: "indent" }));
  return true;
};
const indentMore = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    changes.push({ from: line.from, insert: state.facet(indentUnit) });
  }), { userEvent: "input.indent" }));
  return true;
};
const indentLess = ({ state, dispatch }) => {
  if (state.readOnly)
    return false;
  dispatch(state.update(changeBySelectedLine(state, (line, changes) => {
    let space = /^\s*/.exec(line.text)[0];
    if (!space)
      return;
    let col = countColumn(space, state.tabSize), keep = 0;
    let insert = indentString(state, Math.max(0, col - getIndentUnit(state)));
    while (keep < space.length && keep < insert.length && space.charCodeAt(keep) == insert.charCodeAt(keep))
      keep++;
    changes.push({ from: line.from + keep, to: line.from + space.length, insert: insert.slice(keep) });
  }), { userEvent: "delete.dedent" }));
  return true;
};
const toggleTabFocusMode = (view) => {
  view.setTabFocusMode();
  return true;
};
const emacsStyleKeymap = [
  { key: "Ctrl-b", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Ctrl-f", run: cursorCharRight, shift: selectCharRight },
  { key: "Ctrl-p", run: cursorLineUp, shift: selectLineUp },
  { key: "Ctrl-n", run: cursorLineDown, shift: selectLineDown },
  { key: "Ctrl-a", run: cursorLineStart, shift: selectLineStart },
  { key: "Ctrl-e", run: cursorLineEnd, shift: selectLineEnd },
  { key: "Ctrl-d", run: deleteCharForward },
  { key: "Ctrl-h", run: deleteCharBackward },
  { key: "Ctrl-k", run: deleteToLineEnd },
  { key: "Ctrl-Alt-h", run: deleteGroupBackward },
  { key: "Ctrl-o", run: splitLine },
  { key: "Ctrl-t", run: transposeChars },
  { key: "Ctrl-v", run: cursorPageDown }
];
const standardKeymap = /* @__PURE__ */ [
  { key: "ArrowLeft", run: cursorCharLeft, shift: selectCharLeft, preventDefault: true },
  { key: "Mod-ArrowLeft", mac: "Alt-ArrowLeft", run: cursorGroupLeft, shift: selectGroupLeft, preventDefault: true },
  { mac: "Cmd-ArrowLeft", run: cursorLineBoundaryLeft, shift: selectLineBoundaryLeft, preventDefault: true },
  { key: "ArrowRight", run: cursorCharRight, shift: selectCharRight, preventDefault: true },
  { key: "Mod-ArrowRight", mac: "Alt-ArrowRight", run: cursorGroupRight, shift: selectGroupRight, preventDefault: true },
  { mac: "Cmd-ArrowRight", run: cursorLineBoundaryRight, shift: selectLineBoundaryRight, preventDefault: true },
  { key: "ArrowUp", run: cursorLineUp, shift: selectLineUp, preventDefault: true },
  { mac: "Cmd-ArrowUp", run: cursorDocStart, shift: selectDocStart },
  { mac: "Ctrl-ArrowUp", run: cursorPageUp, shift: selectPageUp },
  { key: "ArrowDown", run: cursorLineDown, shift: selectLineDown, preventDefault: true },
  { mac: "Cmd-ArrowDown", run: cursorDocEnd, shift: selectDocEnd },
  { mac: "Ctrl-ArrowDown", run: cursorPageDown, shift: selectPageDown },
  { key: "PageUp", run: cursorPageUp, shift: selectPageUp },
  { key: "PageDown", run: cursorPageDown, shift: selectPageDown },
  { key: "Home", run: cursorLineBoundaryBackward, shift: selectLineBoundaryBackward, preventDefault: true },
  { key: "Mod-Home", run: cursorDocStart, shift: selectDocStart },
  { key: "End", run: cursorLineBoundaryForward, shift: selectLineBoundaryForward, preventDefault: true },
  { key: "Mod-End", run: cursorDocEnd, shift: selectDocEnd },
  { key: "Enter", run: insertNewlineAndIndent },
  { key: "Mod-a", run: selectAll },
  { key: "Backspace", run: deleteCharBackward, shift: deleteCharBackward },
  { key: "Delete", run: deleteCharForward },
  { key: "Mod-Backspace", mac: "Alt-Backspace", run: deleteGroupBackward },
  { key: "Mod-Delete", mac: "Alt-Delete", run: deleteGroupForward },
  { mac: "Mod-Backspace", run: deleteLineBoundaryBackward },
  { mac: "Mod-Delete", run: deleteLineBoundaryForward }
].concat(/* @__PURE__ */ emacsStyleKeymap.map((b) => ({ mac: b.key, run: b.run, shift: b.shift })));
const defaultKeymap = /* @__PURE__ */ [
  { key: "Alt-ArrowLeft", mac: "Ctrl-ArrowLeft", run: cursorSyntaxLeft, shift: selectSyntaxLeft },
  { key: "Alt-ArrowRight", mac: "Ctrl-ArrowRight", run: cursorSyntaxRight, shift: selectSyntaxRight },
  { key: "Alt-ArrowUp", run: moveLineUp },
  { key: "Shift-Alt-ArrowUp", run: copyLineUp },
  { key: "Alt-ArrowDown", run: moveLineDown },
  { key: "Shift-Alt-ArrowDown", run: copyLineDown },
  { key: "Escape", run: simplifySelection },
  { key: "Mod-Enter", run: insertBlankLine },
  { key: "Alt-l", mac: "Ctrl-l", run: selectLine },
  { key: "Mod-i", run: selectParentSyntax, preventDefault: true },
  { key: "Mod-[", run: indentLess },
  { key: "Mod-]", run: indentMore },
  { key: "Mod-Alt-\\", run: indentSelection },
  { key: "Shift-Mod-k", run: deleteLine },
  { key: "Shift-Mod-\\", run: cursorMatchingBracket },
  { key: "Mod-/", run: toggleComment },
  { key: "Alt-A", run: toggleBlockComment },
  { key: "Ctrl-m", mac: "Shift-Alt-m", run: toggleTabFocusMode }
].concat(standardKeymap);
let _properties = null;
function properties() {
  if (!_properties && typeof document == "object" && document.body) {
    let { style } = document.body, names = [], seen = /* @__PURE__ */ new Set();
    for (let prop in style)
      if (prop != "cssText" && prop != "cssFloat") {
        if (typeof style[prop] == "string") {
          if (/[A-Z]/.test(prop))
            prop = prop.replace(/[A-Z]/g, (ch) => "-" + ch.toLowerCase());
          if (!seen.has(prop)) {
            names.push(prop);
            seen.add(prop);
          }
        }
      }
    _properties = names.sort().map((name) => ({ type: "property", label: name }));
  }
  return _properties || [];
}
const pseudoClasses = /* @__PURE__ */ [
  "active",
  "after",
  "any-link",
  "autofill",
  "backdrop",
  "before",
  "checked",
  "cue",
  "default",
  "defined",
  "disabled",
  "empty",
  "enabled",
  "file-selector-button",
  "first",
  "first-child",
  "first-letter",
  "first-line",
  "first-of-type",
  "focus",
  "focus-visible",
  "focus-within",
  "fullscreen",
  "has",
  "host",
  "host-context",
  "hover",
  "in-range",
  "indeterminate",
  "invalid",
  "is",
  "lang",
  "last-child",
  "last-of-type",
  "left",
  "link",
  "marker",
  "modal",
  "not",
  "nth-child",
  "nth-last-child",
  "nth-last-of-type",
  "nth-of-type",
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "part",
  "placeholder",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "selection",
  "slotted",
  "target",
  "target-text",
  "valid",
  "visited",
  "where"
].map((name) => ({ type: "class", label: name }));
const values = /* @__PURE__ */ [
  "above",
  "absolute",
  "activeborder",
  "additive",
  "activecaption",
  "after-white-space",
  "ahead",
  "alias",
  "all",
  "all-scroll",
  "alphabetic",
  "alternate",
  "always",
  "antialiased",
  "appworkspace",
  "asterisks",
  "attr",
  "auto",
  "auto-flow",
  "avoid",
  "avoid-column",
  "avoid-page",
  "avoid-region",
  "axis-pan",
  "background",
  "backwards",
  "baseline",
  "below",
  "bidi-override",
  "blink",
  "block",
  "block-axis",
  "bold",
  "bolder",
  "border",
  "border-box",
  "both",
  "bottom",
  "break",
  "break-all",
  "break-word",
  "bullets",
  "button",
  "button-bevel",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "calc",
  "capitalize",
  "caps-lock-indicator",
  "caption",
  "captiontext",
  "caret",
  "cell",
  "center",
  "checkbox",
  "circle",
  "cjk-decimal",
  "clear",
  "clip",
  "close-quote",
  "col-resize",
  "collapse",
  "color",
  "color-burn",
  "color-dodge",
  "column",
  "column-reverse",
  "compact",
  "condensed",
  "contain",
  "content",
  "contents",
  "content-box",
  "context-menu",
  "continuous",
  "copy",
  "counter",
  "counters",
  "cover",
  "crop",
  "cross",
  "crosshair",
  "currentcolor",
  "cursive",
  "cyclic",
  "darken",
  "dashed",
  "decimal",
  "decimal-leading-zero",
  "default",
  "default-button",
  "dense",
  "destination-atop",
  "destination-in",
  "destination-out",
  "destination-over",
  "difference",
  "disc",
  "discard",
  "disclosure-closed",
  "disclosure-open",
  "document",
  "dot-dash",
  "dot-dot-dash",
  "dotted",
  "double",
  "down",
  "e-resize",
  "ease",
  "ease-in",
  "ease-in-out",
  "ease-out",
  "element",
  "ellipse",
  "ellipsis",
  "embed",
  "end",
  "ethiopic-abegede-gez",
  "ethiopic-halehame-aa-er",
  "ethiopic-halehame-gez",
  "ew-resize",
  "exclusion",
  "expanded",
  "extends",
  "extra-condensed",
  "extra-expanded",
  "fantasy",
  "fast",
  "fill",
  "fill-box",
  "fixed",
  "flat",
  "flex",
  "flex-end",
  "flex-start",
  "footnotes",
  "forwards",
  "from",
  "geometricPrecision",
  "graytext",
  "grid",
  "groove",
  "hand",
  "hard-light",
  "help",
  "hidden",
  "hide",
  "higher",
  "highlight",
  "highlighttext",
  "horizontal",
  "hsl",
  "hsla",
  "hue",
  "icon",
  "ignore",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infinite",
  "infobackground",
  "infotext",
  "inherit",
  "initial",
  "inline",
  "inline-axis",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "inline-table",
  "inset",
  "inside",
  "intrinsic",
  "invert",
  "italic",
  "justify",
  "keep-all",
  "landscape",
  "large",
  "larger",
  "left",
  "level",
  "lighter",
  "lighten",
  "line-through",
  "linear",
  "linear-gradient",
  "lines",
  "list-item",
  "listbox",
  "listitem",
  "local",
  "logical",
  "loud",
  "lower",
  "lower-hexadecimal",
  "lower-latin",
  "lower-norwegian",
  "lowercase",
  "ltr",
  "luminosity",
  "manipulation",
  "match",
  "matrix",
  "matrix3d",
  "medium",
  "menu",
  "menutext",
  "message-box",
  "middle",
  "min-intrinsic",
  "mix",
  "monospace",
  "move",
  "multiple",
  "multiple_mask_images",
  "multiply",
  "n-resize",
  "narrower",
  "ne-resize",
  "nesw-resize",
  "no-close-quote",
  "no-drop",
  "no-open-quote",
  "no-repeat",
  "none",
  "normal",
  "not-allowed",
  "nowrap",
  "ns-resize",
  "numbers",
  "numeric",
  "nw-resize",
  "nwse-resize",
  "oblique",
  "opacity",
  "open-quote",
  "optimizeLegibility",
  "optimizeSpeed",
  "outset",
  "outside",
  "outside-shape",
  "overlay",
  "overline",
  "padding",
  "padding-box",
  "painted",
  "page",
  "paused",
  "perspective",
  "pinch-zoom",
  "plus-darker",
  "plus-lighter",
  "pointer",
  "polygon",
  "portrait",
  "pre",
  "pre-line",
  "pre-wrap",
  "preserve-3d",
  "progress",
  "push-button",
  "radial-gradient",
  "radio",
  "read-only",
  "read-write",
  "read-write-plaintext-only",
  "rectangle",
  "region",
  "relative",
  "repeat",
  "repeating-linear-gradient",
  "repeating-radial-gradient",
  "repeat-x",
  "repeat-y",
  "reset",
  "reverse",
  "rgb",
  "rgba",
  "ridge",
  "right",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
  "round",
  "row",
  "row-resize",
  "row-reverse",
  "rtl",
  "run-in",
  "running",
  "s-resize",
  "sans-serif",
  "saturation",
  "scale",
  "scale3d",
  "scaleX",
  "scaleY",
  "scaleZ",
  "screen",
  "scroll",
  "scrollbar",
  "scroll-position",
  "se-resize",
  "self-start",
  "self-end",
  "semi-condensed",
  "semi-expanded",
  "separate",
  "serif",
  "show",
  "single",
  "skew",
  "skewX",
  "skewY",
  "skip-white-space",
  "slide",
  "slider-horizontal",
  "slider-vertical",
  "sliderthumb-horizontal",
  "sliderthumb-vertical",
  "slow",
  "small",
  "small-caps",
  "small-caption",
  "smaller",
  "soft-light",
  "solid",
  "source-atop",
  "source-in",
  "source-out",
  "source-over",
  "space",
  "space-around",
  "space-between",
  "space-evenly",
  "spell-out",
  "square",
  "start",
  "static",
  "status-bar",
  "stretch",
  "stroke",
  "stroke-box",
  "sub",
  "subpixel-antialiased",
  "svg_masks",
  "super",
  "sw-resize",
  "symbolic",
  "symbols",
  "system-ui",
  "table",
  "table-caption",
  "table-cell",
  "table-column",
  "table-column-group",
  "table-footer-group",
  "table-header-group",
  "table-row",
  "table-row-group",
  "text",
  "text-bottom",
  "text-top",
  "textarea",
  "textfield",
  "thick",
  "thin",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "to",
  "top",
  "transform",
  "translate",
  "translate3d",
  "translateX",
  "translateY",
  "translateZ",
  "transparent",
  "ultra-condensed",
  "ultra-expanded",
  "underline",
  "unidirectional-pan",
  "unset",
  "up",
  "upper-latin",
  "uppercase",
  "url",
  "var",
  "vertical",
  "vertical-text",
  "view-box",
  "visible",
  "visibleFill",
  "visiblePainted",
  "visibleStroke",
  "visual",
  "w-resize",
  "wait",
  "wave",
  "wider",
  "window",
  "windowframe",
  "windowtext",
  "words",
  "wrap",
  "wrap-reverse",
  "x-large",
  "x-small",
  "xor",
  "xx-large",
  "xx-small"
].map((name) => ({ type: "keyword", label: name })).concat(/* @__PURE__ */ [
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "grey",
  "green",
  "greenyellow",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
].map((name) => ({ type: "constant", label: name })));
const tags = /* @__PURE__ */ [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "header",
  "hgroup",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "meter",
  "nav",
  "ol",
  "output",
  "p",
  "pre",
  "ruby",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
].map((name) => ({ type: "type", label: name }));
const identifier$1 = /^(\w[\w-]*|-\w[\w-]*|)$/, variable = /^-(-[\w-]*)?$/;
function isVarArg(node, doc) {
  var _a;
  if (node.name == "(" || node.type.isError)
    node = node.parent || node;
  if (node.name != "ArgList")
    return false;
  let callee = (_a = node.parent) === null || _a === void 0 ? void 0 : _a.firstChild;
  if ((callee === null || callee === void 0 ? void 0 : callee.name) != "Callee")
    return false;
  return doc.sliceString(callee.from, callee.to) == "var";
}
const VariablesByNode = /* @__PURE__ */ new NodeWeakMap();
const declSelector = ["Declaration"];
function astTop(node) {
  for (let cur = node; ; ) {
    if (cur.type.isTop)
      return cur;
    if (!(cur = cur.parent))
      return node;
  }
}
function variableNames(doc, node, isVariable) {
  if (node.to - node.from > 4096) {
    let known = VariablesByNode.get(node);
    if (known)
      return known;
    let result = [], seen = /* @__PURE__ */ new Set(), cursor = node.cursor(IterMode.IncludeAnonymous);
    if (cursor.firstChild())
      do {
        for (let option of variableNames(doc, cursor.node, isVariable))
          if (!seen.has(option.label)) {
            seen.add(option.label);
            result.push(option);
          }
      } while (cursor.nextSibling());
    VariablesByNode.set(node, result);
    return result;
  } else {
    let result = [], seen = /* @__PURE__ */ new Set();
    node.cursor().iterate((node2) => {
      var _a;
      if (isVariable(node2) && node2.matchContext(declSelector) && ((_a = node2.node.nextSibling) === null || _a === void 0 ? void 0 : _a.name) == ":") {
        let name = doc.sliceString(node2.from, node2.to);
        if (!seen.has(name)) {
          seen.add(name);
          result.push({ label: name, type: "variable" });
        }
      }
    });
    return result;
  }
}
const defineCSSCompletionSource = (isVariable) => (context) => {
  let { state, pos } = context, node = syntaxTree(state).resolveInner(pos, -1);
  let isDash = node.type.isError && node.from == node.to - 1 && state.doc.sliceString(node.from, node.to) == "-";
  if (node.name == "PropertyName" || (isDash || node.name == "TagName") && /^(Block|Styles)$/.test(node.resolve(node.to).name))
    return { from: node.from, options: properties(), validFor: identifier$1 };
  if (node.name == "ValueName")
    return { from: node.from, options: values, validFor: identifier$1 };
  if (node.name == "PseudoClassName")
    return { from: node.from, options: pseudoClasses, validFor: identifier$1 };
  if (isVariable(node) || (context.explicit || isDash) && isVarArg(node, state.doc))
    return {
      from: isVariable(node) || isDash ? node.from : pos,
      options: variableNames(state.doc, astTop(node), isVariable),
      validFor: variable
    };
  if (node.name == "TagName") {
    for (let { parent } = node; parent; parent = parent.parent)
      if (parent.name == "Block")
        return { from: node.from, options: properties(), validFor: identifier$1 };
    return { from: node.from, options: tags, validFor: identifier$1 };
  }
  if (!context.explicit)
    return null;
  let above = node.resolve(pos), before = above.childBefore(pos);
  if (before && before.name == ":" && above.name == "PseudoClassSelector")
    return { from: pos, options: pseudoClasses, validFor: identifier$1 };
  if (before && before.name == ":" && above.name == "Declaration" || above.name == "ArgList")
    return { from: pos, options: values, validFor: identifier$1 };
  if (above.name == "Block" || above.name == "Styles")
    return { from: pos, options: properties(), validFor: identifier$1 };
  return null;
};
const cssCompletionSource = /* @__PURE__ */ defineCSSCompletionSource((n) => n.name == "VariableName");
const cssLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "css",
  parser: /* @__PURE__ */ parser.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Declaration: /* @__PURE__ */ continuedIndent()
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "Block KeyframeList": foldInside
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*\}$/,
    wordChars: "-"
  }
});
function css() {
  return new LanguageSupport(cssLanguage, cssLanguage.data.of({ autocomplete: cssCompletionSource }));
}
const snippets = [
  /* @__PURE__ */ snippetCompletion("function ${name}(${params}) {\n	${}\n}", {
    label: "function",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
    label: "for",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("for (let ${name} of ${collection}) {\n	${}\n}", {
    label: "for",
    detail: "of loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("do {\n	${}\n} while (${})", {
    label: "do",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("while (${}) {\n	${}\n}", {
    label: "while",
    detail: "loop",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
    label: "try",
    detail: "/ catch block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if (${}) {\n	${}\n}", {
    label: "if",
    detail: "block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("if (${}) {\n	${}\n} else {\n	${}\n}", {
    label: "if",
    detail: "/ else block",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
    label: "class",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion('import {${names}} from "${module}"\n${}', {
    label: "import",
    detail: "named",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion('import ${name} from "${module}"\n${}', {
    label: "import",
    detail: "default",
    type: "keyword"
  })
];
const typescriptSnippets = /* @__PURE__ */ snippets.concat([
  /* @__PURE__ */ snippetCompletion("interface ${name} {\n	${}\n}", {
    label: "interface",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("type ${name} = ${type}", {
    label: "type",
    detail: "definition",
    type: "keyword"
  }),
  /* @__PURE__ */ snippetCompletion("enum ${name} {\n	${}\n}", {
    label: "enum",
    detail: "definition",
    type: "keyword"
  })
]);
const cache = /* @__PURE__ */ new NodeWeakMap();
const ScopeNodes = /* @__PURE__ */ new Set([
  "Script",
  "Block",
  "FunctionExpression",
  "FunctionDeclaration",
  "ArrowFunction",
  "MethodDeclaration",
  "ForStatement"
]);
function defID(type) {
  return (node, def) => {
    let id = node.node.getChild("VariableDefinition");
    if (id)
      def(id, type);
    return true;
  };
}
const functionContext = ["FunctionDeclaration"];
const gatherCompletions = {
  FunctionDeclaration: /* @__PURE__ */ defID("function"),
  ClassDeclaration: /* @__PURE__ */ defID("class"),
  ClassExpression: () => true,
  EnumDeclaration: /* @__PURE__ */ defID("constant"),
  TypeAliasDeclaration: /* @__PURE__ */ defID("type"),
  NamespaceDeclaration: /* @__PURE__ */ defID("namespace"),
  VariableDefinition(node, def) {
    if (!node.matchContext(functionContext))
      def(node, "variable");
  },
  TypeDefinition(node, def) {
    def(node, "type");
  },
  __proto__: null
};
function getScope(doc, node) {
  let cached = cache.get(node);
  if (cached)
    return cached;
  let completions = [], top = true;
  function def(node2, type) {
    let name = doc.sliceString(node2.from, node2.to);
    completions.push({ label: name, type });
  }
  node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
    if (top) {
      top = false;
    } else if (node2.name) {
      let gather = gatherCompletions[node2.name];
      if (gather && gather(node2, def) || ScopeNodes.has(node2.name))
        return false;
    } else if (node2.to - node2.from > 8192) {
      for (let c of getScope(doc, node2.node))
        completions.push(c);
      return false;
    }
  });
  cache.set(node, completions);
  return completions;
}
const Identifier = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/;
const dontComplete = [
  "TemplateString",
  "String",
  "RegExp",
  "LineComment",
  "BlockComment",
  "VariableDefinition",
  "TypeDefinition",
  "Label",
  "PropertyDefinition",
  "PropertyName",
  "PrivatePropertyDefinition",
  "PrivatePropertyName",
  ".",
  "?."
];
function localCompletionSource(context) {
  let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
  if (dontComplete.indexOf(inner.name) > -1)
    return null;
  let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
  if (!isWord && !context.explicit)
    return null;
  let options = [];
  for (let pos = inner; pos; pos = pos.parent) {
    if (ScopeNodes.has(pos.name))
      options = options.concat(getScope(context.state.doc, pos));
  }
  return {
    options,
    from: isWord ? inner.from : context.pos,
    validFor: Identifier
  };
}
const javascriptLanguage = /* @__PURE__ */ LRLanguage.define({
  name: "javascript",
  parser: /* @__PURE__ */ parser$1.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/ }),
        TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch\b|finally\b)/ }),
        LabeledStatement: flatIndent,
        SwitchBody: (context) => {
          let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
          return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
        },
        Block: /* @__PURE__ */ delimitedIndent({ closing: "}" }),
        ArrowFunction: (cx) => cx.baseIndent + cx.unit,
        "TemplateString BlockComment": () => null,
        "Statement Property": /* @__PURE__ */ continuedIndent({ except: /^{/ }),
        JSXElement(context) {
          let closed = /^\s*<\//.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        JSXEscape(context) {
          let closed = /\s*\}/.test(context.textAfter);
          return context.lineIndent(context.node.from) + (closed ? 0 : context.unit);
        },
        "JSXOpenTag JSXSelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        "Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": foldInside,
        BlockComment(tree) {
          return { from: tree.from + 2, to: tree.to - 2 };
        }
      })
    ]
  }),
  languageData: {
    closeBrackets: { brackets: ["(", "[", "{", "'", '"', "`"] },
    commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
    indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
    wordChars: "$"
  }
});
const jsxSublanguage = {
  test: (node) => /^JSX/.test(node.name),
  facet: /* @__PURE__ */ defineLanguageFacet({ commentTokens: { block: { open: "{/*", close: "*/}" } } })
};
const typescriptLanguage = /* @__PURE__ */ javascriptLanguage.configure({ dialect: "ts" }, "typescript");
const jsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: "jsx",
  props: [/* @__PURE__ */ sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
});
const tsxLanguage = /* @__PURE__ */ javascriptLanguage.configure({
  dialect: "jsx ts",
  props: [/* @__PURE__ */ sublanguageProp.add((n) => n.isTop ? [jsxSublanguage] : void 0)]
}, "typescript");
let kwCompletion = (name) => ({ label: name, type: "keyword" });
const keywords = /* @__PURE__ */ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(kwCompletion);
const typescriptKeywords = /* @__PURE__ */ keywords.concat(/* @__PURE__ */ ["declare", "implements", "private", "protected", "public"].map(kwCompletion));
function javascript(config2 = {}) {
  let lang = config2.jsx ? config2.typescript ? tsxLanguage : jsxLanguage : config2.typescript ? typescriptLanguage : javascriptLanguage;
  let completions = config2.typescript ? typescriptSnippets.concat(typescriptKeywords) : snippets.concat(keywords);
  return new LanguageSupport(lang, [
    javascriptLanguage.data.of({
      autocomplete: ifNotIn(dontComplete, completeFromList(completions))
    }),
    javascriptLanguage.data.of({
      autocomplete: localCompletionSource
    }),
    config2.jsx ? autoCloseTags$1 : []
  ]);
}
function findOpenTag(node) {
  for (; ; ) {
    if (node.name == "JSXOpenTag" || node.name == "JSXSelfClosingTag" || node.name == "JSXFragmentTag")
      return node;
    if (node.name == "JSXEscape" || !node.parent)
      return null;
    node = node.parent;
  }
}
function elementName$1(doc, tree, max = doc.length) {
  for (let ch = tree === null || tree === void 0 ? void 0 : tree.firstChild; ch; ch = ch.nextSibling) {
    if (ch.name == "JSXIdentifier" || ch.name == "JSXBuiltin" || ch.name == "JSXNamespacedName" || ch.name == "JSXMemberExpression")
      return doc.sliceString(ch.from, Math.min(ch.to, max));
  }
  return "";
}
const android = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
const autoCloseTags$1 = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text, defaultInsert) => {
  if ((android ? view.composing : view.compositionStarted) || view.state.readOnly || from != to || text != ">" && text != "/" || !javascriptLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = defaultInsert(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a;
    let { head } = range, around = syntaxTree(state).resolveInner(head - 1, -1), name;
    if (around.name == "JSXStartTag")
      around = around.parent;
    if (state.doc.sliceString(head - 1, head) != text || around.name == "JSXAttributeValue" && around.to > head) ;
    else if (text == ">" && around.name == "JSXFragmentTag") {
      return { range, changes: { from: head, insert: `</>` } };
    } else if (text == "/" && around.name == "JSXStartCloseTag") {
      let empty = around.parent, base2 = empty.parent;
      if (base2 && empty.from == head - 2 && ((name = elementName$1(state.doc, base2.firstChild, head)) || ((_a = base2.firstChild) === null || _a === void 0 ? void 0 : _a.name) == "JSXFragmentTag")) {
        let insert = `${name}>`;
        return { range: EditorSelection.cursor(head + insert.length, -1), changes: { from: head, insert } };
      }
    } else if (text == ">") {
      let openTag = findOpenTag(around);
      if (openTag && openTag.name == "JSXOpenTag" && !/^\/?>|^<\//.test(state.doc.sliceString(head, head + 2)) && (name = elementName$1(state.doc, openTag, head)))
        return { range, changes: { from: head, insert: `</${name}>` } };
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, { userEvent: "input.complete", scrollIntoView: true })
  ]);
  return true;
});
const Targets = ["_blank", "_self", "_top", "_parent"];
const Charsets = ["ascii", "utf-8", "utf-16", "latin1", "latin1"];
const Methods = ["get", "post", "put", "delete"];
const Encs = ["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"];
const Bool = ["true", "false"];
const S = {};
const Tags = {
  a: {
    attrs: {
      href: null,
      ping: null,
      type: null,
      media: null,
      target: Targets,
      hreflang: null
    }
  },
  abbr: S,
  address: S,
  area: {
    attrs: {
      alt: null,
      coords: null,
      href: null,
      target: null,
      ping: null,
      media: null,
      hreflang: null,
      type: null,
      shape: ["default", "rect", "circle", "poly"]
    }
  },
  article: S,
  aside: S,
  audio: {
    attrs: {
      src: null,
      mediagroup: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["none", "metadata", "auto"],
      autoplay: ["autoplay"],
      loop: ["loop"],
      controls: ["controls"]
    }
  },
  b: S,
  base: { attrs: { href: null, target: Targets } },
  bdi: S,
  bdo: S,
  blockquote: { attrs: { cite: null } },
  body: S,
  br: S,
  button: {
    attrs: {
      form: null,
      formaction: null,
      name: null,
      value: null,
      autofocus: ["autofocus"],
      disabled: ["autofocus"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      type: ["submit", "reset", "button"]
    }
  },
  canvas: { attrs: { width: null, height: null } },
  caption: S,
  center: S,
  cite: S,
  code: S,
  col: { attrs: { span: null } },
  colgroup: { attrs: { span: null } },
  command: {
    attrs: {
      type: ["command", "checkbox", "radio"],
      label: null,
      icon: null,
      radiogroup: null,
      command: null,
      title: null,
      disabled: ["disabled"],
      checked: ["checked"]
    }
  },
  data: { attrs: { value: null } },
  datagrid: { attrs: { disabled: ["disabled"], multiple: ["multiple"] } },
  datalist: { attrs: { data: null } },
  dd: S,
  del: { attrs: { cite: null, datetime: null } },
  details: { attrs: { open: ["open"] } },
  dfn: S,
  div: S,
  dl: S,
  dt: S,
  em: S,
  embed: { attrs: { src: null, type: null, width: null, height: null } },
  eventsource: { attrs: { src: null } },
  fieldset: { attrs: { disabled: ["disabled"], form: null, name: null } },
  figcaption: S,
  figure: S,
  footer: S,
  form: {
    attrs: {
      action: null,
      name: null,
      "accept-charset": Charsets,
      autocomplete: ["on", "off"],
      enctype: Encs,
      method: Methods,
      novalidate: ["novalidate"],
      target: Targets
    }
  },
  h1: S,
  h2: S,
  h3: S,
  h4: S,
  h5: S,
  h6: S,
  head: {
    children: ["title", "base", "link", "style", "meta", "script", "noscript", "command"]
  },
  header: S,
  hgroup: S,
  hr: S,
  html: {
    attrs: { manifest: null }
  },
  i: S,
  iframe: {
    attrs: {
      src: null,
      srcdoc: null,
      name: null,
      width: null,
      height: null,
      sandbox: ["allow-top-navigation", "allow-same-origin", "allow-forms", "allow-scripts"],
      seamless: ["seamless"]
    }
  },
  img: {
    attrs: {
      alt: null,
      src: null,
      ismap: null,
      usemap: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"]
    }
  },
  input: {
    attrs: {
      alt: null,
      dirname: null,
      form: null,
      formaction: null,
      height: null,
      list: null,
      max: null,
      maxlength: null,
      min: null,
      name: null,
      pattern: null,
      placeholder: null,
      size: null,
      src: null,
      step: null,
      value: null,
      width: null,
      accept: ["audio/*", "video/*", "image/*"],
      autocomplete: ["on", "off"],
      autofocus: ["autofocus"],
      checked: ["checked"],
      disabled: ["disabled"],
      formenctype: Encs,
      formmethod: Methods,
      formnovalidate: ["novalidate"],
      formtarget: Targets,
      multiple: ["multiple"],
      readonly: ["readonly"],
      required: ["required"],
      type: [
        "hidden",
        "text",
        "search",
        "tel",
        "url",
        "email",
        "password",
        "datetime",
        "date",
        "month",
        "week",
        "time",
        "datetime-local",
        "number",
        "range",
        "color",
        "checkbox",
        "radio",
        "file",
        "submit",
        "image",
        "reset",
        "button"
      ]
    }
  },
  ins: { attrs: { cite: null, datetime: null } },
  kbd: S,
  keygen: {
    attrs: {
      challenge: null,
      form: null,
      name: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      keytype: ["RSA"]
    }
  },
  label: { attrs: { for: null, form: null } },
  legend: S,
  li: { attrs: { value: null } },
  link: {
    attrs: {
      href: null,
      type: null,
      hreflang: null,
      media: null,
      sizes: ["all", "16x16", "16x16 32x32", "16x16 32x32 64x64"]
    }
  },
  map: { attrs: { name: null } },
  mark: S,
  menu: { attrs: { label: null, type: ["list", "context", "toolbar"] } },
  meta: {
    attrs: {
      content: null,
      charset: Charsets,
      name: ["viewport", "application-name", "author", "description", "generator", "keywords"],
      "http-equiv": ["content-language", "content-type", "default-style", "refresh"]
    }
  },
  meter: { attrs: { value: null, min: null, low: null, high: null, max: null, optimum: null } },
  nav: S,
  noscript: S,
  object: {
    attrs: {
      data: null,
      type: null,
      name: null,
      usemap: null,
      form: null,
      width: null,
      height: null,
      typemustmatch: ["typemustmatch"]
    }
  },
  ol: {
    attrs: { reversed: ["reversed"], start: null, type: ["1", "a", "A", "i", "I"] },
    children: ["li", "script", "template", "ul", "ol"]
  },
  optgroup: { attrs: { disabled: ["disabled"], label: null } },
  option: { attrs: { disabled: ["disabled"], label: null, selected: ["selected"], value: null } },
  output: { attrs: { for: null, form: null, name: null } },
  p: S,
  param: { attrs: { name: null, value: null } },
  pre: S,
  progress: { attrs: { value: null, max: null } },
  q: { attrs: { cite: null } },
  rp: S,
  rt: S,
  ruby: S,
  samp: S,
  script: {
    attrs: {
      type: ["text/javascript"],
      src: null,
      async: ["async"],
      defer: ["defer"],
      charset: Charsets
    }
  },
  section: S,
  select: {
    attrs: {
      form: null,
      name: null,
      size: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      multiple: ["multiple"]
    }
  },
  slot: { attrs: { name: null } },
  small: S,
  source: { attrs: { src: null, type: null, media: null } },
  span: S,
  strong: S,
  style: {
    attrs: {
      type: ["text/css"],
      media: null,
      scoped: null
    }
  },
  sub: S,
  summary: S,
  sup: S,
  table: S,
  tbody: S,
  td: { attrs: { colspan: null, rowspan: null, headers: null } },
  template: S,
  textarea: {
    attrs: {
      dirname: null,
      form: null,
      maxlength: null,
      name: null,
      placeholder: null,
      rows: null,
      cols: null,
      autofocus: ["autofocus"],
      disabled: ["disabled"],
      readonly: ["readonly"],
      required: ["required"],
      wrap: ["soft", "hard"]
    }
  },
  tfoot: S,
  th: { attrs: { colspan: null, rowspan: null, headers: null, scope: ["row", "col", "rowgroup", "colgroup"] } },
  thead: S,
  time: { attrs: { datetime: null } },
  title: S,
  tr: S,
  track: {
    attrs: {
      src: null,
      label: null,
      default: null,
      kind: ["subtitles", "captions", "descriptions", "chapters", "metadata"],
      srclang: null
    }
  },
  ul: { children: ["li", "script", "template", "ul", "ol"] },
  var: S,
  video: {
    attrs: {
      src: null,
      poster: null,
      width: null,
      height: null,
      crossorigin: ["anonymous", "use-credentials"],
      preload: ["auto", "metadata", "none"],
      autoplay: ["autoplay"],
      mediagroup: ["movie"],
      muted: ["muted"],
      controls: ["controls"]
    }
  },
  wbr: S
};
const GlobalAttrs = {
  accesskey: null,
  class: null,
  contenteditable: Bool,
  contextmenu: null,
  dir: ["ltr", "rtl", "auto"],
  draggable: ["true", "false", "auto"],
  dropzone: ["copy", "move", "link", "string:", "file:"],
  hidden: ["hidden"],
  id: null,
  inert: ["inert"],
  itemid: null,
  itemprop: null,
  itemref: null,
  itemscope: ["itemscope"],
  itemtype: null,
  lang: ["ar", "bn", "de", "en-GB", "en-US", "es", "fr", "hi", "id", "ja", "pa", "pt", "ru", "tr", "zh"],
  spellcheck: Bool,
  autocorrect: Bool,
  autocapitalize: Bool,
  style: null,
  tabindex: null,
  title: null,
  translate: ["yes", "no"],
  rel: ["stylesheet", "alternate", "author", "bookmark", "help", "license", "next", "nofollow", "noreferrer", "prefetch", "prev", "search", "tag"],
  role: /* @__PURE__ */ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
  "aria-activedescendant": null,
  "aria-atomic": Bool,
  "aria-autocomplete": ["inline", "list", "both", "none"],
  "aria-busy": Bool,
  "aria-checked": ["true", "false", "mixed", "undefined"],
  "aria-controls": null,
  "aria-describedby": null,
  "aria-disabled": Bool,
  "aria-dropeffect": null,
  "aria-expanded": ["true", "false", "undefined"],
  "aria-flowto": null,
  "aria-grabbed": ["true", "false", "undefined"],
  "aria-haspopup": Bool,
  "aria-hidden": Bool,
  "aria-invalid": ["true", "false", "grammar", "spelling"],
  "aria-label": null,
  "aria-labelledby": null,
  "aria-level": null,
  "aria-live": ["off", "polite", "assertive"],
  "aria-multiline": Bool,
  "aria-multiselectable": Bool,
  "aria-owns": null,
  "aria-posinset": null,
  "aria-pressed": ["true", "false", "mixed", "undefined"],
  "aria-readonly": Bool,
  "aria-relevant": null,
  "aria-required": Bool,
  "aria-selected": ["true", "false", "undefined"],
  "aria-setsize": null,
  "aria-sort": ["ascending", "descending", "none", "other"],
  "aria-valuemax": null,
  "aria-valuemin": null,
  "aria-valuenow": null,
  "aria-valuetext": null
};
const eventAttributes = /* @__PURE__ */ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((n) => "on" + n);
for (let a of eventAttributes)
  GlobalAttrs[a] = null;
class Schema {
  constructor(extraTags, extraAttrs) {
    this.tags = Object.assign(Object.assign({}, Tags), extraTags);
    this.globalAttrs = Object.assign(Object.assign({}, GlobalAttrs), extraAttrs);
    this.allTags = Object.keys(this.tags);
    this.globalAttrNames = Object.keys(this.globalAttrs);
  }
}
Schema.default = /* @__PURE__ */ new Schema();
function elementName(doc, tree, max = doc.length) {
  if (!tree)
    return "";
  let tag = tree.firstChild;
  let name = tag && tag.getChild("TagName");
  return name ? doc.sliceString(name.from, Math.min(name.to, max)) : "";
}
function findParentElement(tree, skip = false) {
  for (; tree; tree = tree.parent)
    if (tree.name == "Element") {
      if (skip)
        skip = false;
      else
        return tree;
    }
  return null;
}
function allowedChildren(doc, tree, schema) {
  let parentInfo = schema.tags[elementName(doc, findParentElement(tree))];
  return (parentInfo === null || parentInfo === void 0 ? void 0 : parentInfo.children) || schema.allTags;
}
function openTags(doc, tree) {
  let open = [];
  for (let parent = findParentElement(tree); parent && !parent.type.isTop; parent = findParentElement(parent.parent)) {
    let tagName = elementName(doc, parent);
    if (tagName && parent.lastChild.name == "CloseTag")
      break;
    if (tagName && open.indexOf(tagName) < 0 && (tree.name == "EndTag" || tree.from >= parent.firstChild.to))
      open.push(tagName);
  }
  return open;
}
const identifier = /^[:\-\.\w\u00b7-\uffff]*$/;
function completeTag(state, schema, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  let parent = findParentElement(tree, true);
  return {
    from,
    to,
    options: allowedChildren(state.doc, parent, schema).map((tagName) => ({ label: tagName, type: "type" })).concat(openTags(state.doc, tree).map((tag, i) => ({
      label: "/" + tag,
      apply: "/" + tag + end,
      type: "type",
      boost: 99 - i
    }))),
    validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
  };
}
function completeCloseTag(state, tree, from, to) {
  let end = /\s*>/.test(state.sliceDoc(to, to + 5)) ? "" : ">";
  return {
    from,
    to,
    options: openTags(state.doc, tree).map((tag, i) => ({ label: tag, apply: tag + end, type: "type", boost: 99 - i })),
    validFor: identifier
  };
}
function completeStartTag(state, schema, tree, pos) {
  let options = [], level = 0;
  for (let tagName of allowedChildren(state.doc, tree, schema))
    options.push({ label: "<" + tagName, type: "type" });
  for (let open of openTags(state.doc, tree))
    options.push({ label: "</" + open + ">", type: "type", boost: 99 - level++ });
  return { from: pos, to: pos, options, validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/ };
}
function completeAttrName(state, schema, tree, from, to) {
  let elt = findParentElement(tree), info = elt ? schema.tags[elementName(state.doc, elt)] : null;
  let localAttrs = info && info.attrs ? Object.keys(info.attrs) : [];
  let names = info && info.globalAttrs === false ? localAttrs : localAttrs.length ? localAttrs.concat(schema.globalAttrNames) : schema.globalAttrNames;
  return {
    from,
    to,
    options: names.map((attrName) => ({ label: attrName, type: "property" })),
    validFor: identifier
  };
}
function completeAttrValue(state, schema, tree, from, to) {
  var _a;
  let nameNode = (_a = tree.parent) === null || _a === void 0 ? void 0 : _a.getChild("AttributeName");
  let options = [], token = void 0;
  if (nameNode) {
    let attrName = state.sliceDoc(nameNode.from, nameNode.to);
    let attrs = schema.globalAttrs[attrName];
    if (!attrs) {
      let elt = findParentElement(tree), info = elt ? schema.tags[elementName(state.doc, elt)] : null;
      attrs = (info === null || info === void 0 ? void 0 : info.attrs) && info.attrs[attrName];
    }
    if (attrs) {
      let base = state.sliceDoc(from, to).toLowerCase(), quoteStart = '"', quoteEnd = '"';
      if (/^['"]/.test(base)) {
        token = base[0] == '"' ? /^[^"]*$/ : /^[^']*$/;
        quoteStart = "";
        quoteEnd = state.sliceDoc(to, to + 1) == base[0] ? "" : base[0];
        base = base.slice(1);
        from++;
      } else {
        token = /^[^\s<>='"]*$/;
      }
      for (let value of attrs)
        options.push({ label: value, apply: quoteStart + value + quoteEnd, type: "constant" });
    }
  }
  return { from, to, options, validFor: token };
}
function htmlCompletionFor(schema, context) {
  let { state, pos } = context, tree = syntaxTree(state).resolveInner(pos, -1), around = tree.resolve(pos);
  for (let scan = pos, before; around == tree && (before = tree.childBefore(scan)); ) {
    let last = before.lastChild;
    if (!last || !last.type.isError || last.from < last.to)
      break;
    around = tree = before;
    scan = last.from;
  }
  if (tree.name == "TagName") {
    return tree.parent && /CloseTag$/.test(tree.parent.name) ? completeCloseTag(state, tree, tree.from, pos) : completeTag(state, schema, tree, tree.from, pos);
  } else if (tree.name == "StartTag") {
    return completeTag(state, schema, tree, pos, pos);
  } else if (tree.name == "StartCloseTag" || tree.name == "IncompleteCloseTag") {
    return completeCloseTag(state, tree, pos, pos);
  } else if (tree.name == "OpenTag" || tree.name == "SelfClosingTag" || tree.name == "AttributeName") {
    return completeAttrName(state, schema, tree, tree.name == "AttributeName" ? tree.from : pos, pos);
  } else if (tree.name == "Is" || tree.name == "AttributeValue" || tree.name == "UnquotedAttributeValue") {
    return completeAttrValue(state, schema, tree, tree.name == "Is" ? pos : tree.from, pos);
  } else if (context.explicit && (around.name == "Element" || around.name == "Text" || around.name == "Document")) {
    return completeStartTag(state, schema, tree, pos);
  } else {
    return null;
  }
}
function htmlCompletionSourceWith(config2) {
  let { extraTags, extraGlobalAttributes: extraAttrs } = config2;
  let schema = extraAttrs || extraTags ? new Schema(extraTags, extraAttrs) : Schema.default;
  return (context) => htmlCompletionFor(schema, context);
}
const jsonParser = /* @__PURE__ */ javascriptLanguage.parser.configure({ top: "SingleExpression" });
const defaultNesting = [
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript" || attrs.lang == "ts",
    parser: typescriptLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/babel" || attrs.type == "text/jsx",
    parser: jsxLanguage.parser
  },
  {
    tag: "script",
    attrs: (attrs) => attrs.type == "text/typescript-jsx",
    parser: tsxLanguage.parser
  },
  {
    tag: "script",
    attrs(attrs) {
      return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(attrs.type);
    },
    parser: jsonParser
  },
  {
    tag: "script",
    attrs(attrs) {
      return !attrs.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(attrs.type);
    },
    parser: javascriptLanguage.parser
  },
  {
    tag: "style",
    attrs(attrs) {
      return (!attrs.lang || attrs.lang == "css") && (!attrs.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(attrs.type));
    },
    parser: cssLanguage.parser
  }
];
const defaultAttrs = /* @__PURE__ */ [
  {
    name: "style",
    parser: /* @__PURE__ */ cssLanguage.parser.configure({ top: "Styles" })
  }
].concat(/* @__PURE__ */ eventAttributes.map((name) => ({ name, parser: javascriptLanguage.parser })));
const htmlPlain = /* @__PURE__ */ LRLanguage.define({
  name: "html",
  parser: /* @__PURE__ */ parser$2.configure({
    props: [
      /* @__PURE__ */ indentNodeProp.add({
        Element(context) {
          let after = /^(\s*)(<\/)?/.exec(context.textAfter);
          if (context.node.to <= context.pos + after[0].length)
            return context.continue();
          return context.lineIndent(context.node.from) + (after[2] ? 0 : context.unit);
        },
        "OpenTag CloseTag SelfClosingTag"(context) {
          return context.column(context.node.from) + context.unit;
        },
        Document(context) {
          if (context.pos + /\s*/.exec(context.textAfter)[0].length < context.node.to)
            return context.continue();
          let endElt = null, close;
          for (let cur = context.node; ; ) {
            let last = cur.lastChild;
            if (!last || last.name != "Element" || last.to != cur.to)
              break;
            endElt = cur = last;
          }
          if (endElt && !((close = endElt.lastChild) && (close.name == "CloseTag" || close.name == "SelfClosingTag")))
            return context.lineIndent(endElt.from) + context.unit;
          return null;
        }
      }),
      /* @__PURE__ */ foldNodeProp.add({
        Element(node) {
          let first = node.firstChild, last = node.lastChild;
          if (!first || first.name != "OpenTag")
            return null;
          return { from: first.to, to: last.name == "CloseTag" ? last.from : node.to };
        }
      }),
      /* @__PURE__ */ bracketMatchingHandle.add({
        "OpenTag CloseTag": (node) => node.getChild("TagName")
      })
    ]
  }),
  languageData: {
    commentTokens: { block: { open: "<!--", close: "-->" } },
    indentOnInput: /^\s*<\/\w+\W$/,
    wordChars: "-._"
  }
});
const htmlLanguage = /* @__PURE__ */ htmlPlain.configure({
  wrap: /* @__PURE__ */ configureNesting(defaultNesting, defaultAttrs)
});
function html(config2 = {}) {
  let dialect = "", wrap;
  if (config2.matchClosingTags === false)
    dialect = "noMatch";
  if (config2.selfClosingTags === true)
    dialect = (dialect ? dialect + " " : "") + "selfClosing";
  if (config2.nestedLanguages && config2.nestedLanguages.length || config2.nestedAttributes && config2.nestedAttributes.length)
    wrap = configureNesting((config2.nestedLanguages || []).concat(defaultNesting), (config2.nestedAttributes || []).concat(defaultAttrs));
  let lang = wrap ? htmlPlain.configure({ wrap, dialect }) : dialect ? htmlLanguage.configure({ dialect }) : htmlLanguage;
  return new LanguageSupport(lang, [
    htmlLanguage.data.of({ autocomplete: htmlCompletionSourceWith(config2) }),
    config2.autoCloseTags !== false ? autoCloseTags : [],
    javascript().support,
    css().support
  ]);
}
const selfClosers = /* @__PURE__ */ new Set(/* @__PURE__ */ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
const autoCloseTags = /* @__PURE__ */ EditorView.inputHandler.of((view, from, to, text, insertTransaction) => {
  if (view.composing || view.state.readOnly || from != to || text != ">" && text != "/" || !htmlLanguage.isActiveAt(view.state, from, -1))
    return false;
  let base = insertTransaction(), { state } = base;
  let closeTags = state.changeByRange((range) => {
    var _a, _b, _c;
    let didType = state.doc.sliceString(range.from - 1, range.to) == text;
    let { head } = range, after = syntaxTree(state).resolveInner(head, -1), name;
    if (didType && text == ">" && after.name == "EndTag") {
      let tag = after.parent;
      if (((_b = (_a = tag.parent) === null || _a === void 0 ? void 0 : _a.lastChild) === null || _b === void 0 ? void 0 : _b.name) != "CloseTag" && (name = elementName(state.doc, tag.parent, head)) && !selfClosers.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `</${name}>`;
        return { range, changes: { from: head, to: to2, insert } };
      }
    } else if (didType && text == "/" && after.name == "IncompleteCloseTag") {
      let tag = after.parent;
      if (after.from == head - 2 && ((_c = tag.lastChild) === null || _c === void 0 ? void 0 : _c.name) != "CloseTag" && (name = elementName(state.doc, tag, head)) && !selfClosers.has(name)) {
        let to2 = head + (state.doc.sliceString(head, head + 1) === ">" ? 1 : 0);
        let insert = `${name}>`;
        return {
          range: EditorSelection.cursor(head + insert.length, -1),
          changes: { from: head, to: to2, insert }
        };
      }
    }
    return { range };
  });
  if (closeTags.changes.empty)
    return false;
  view.dispatch([
    base,
    state.update(closeTags, {
      userEvent: "input.complete",
      scrollIntoView: true
    })
  ]);
  return true;
});
export {
  deleteGroupBackward as a,
  history as b,
  closeBracketsKeymap as c,
  defaultKeymap as d,
  closeBrackets as e,
  css as f,
  html as g,
  historyKeymap as h,
  indentMore as i,
  javascript as j,
  indentLess as k
};
