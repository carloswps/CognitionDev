import { r as reactExports, en as jsxDevRuntimeExports, e2 as MenuButton } from "./vendor.MscUbBdQ.js";
import { Q as Ql, h as es, u as useLocalize, i as DropdownPopup, j as TooltipAnchor, e as cn } from "./index.B-EWlhII.js";
import { ag as CrossCircledIcon, a6 as BookmarkFilledIcon, a7 as BookmarkIcon } from "./radix-ui.BjkARwX1.js";
import "./utilities.ezTSFZ8X.js";
import { i as useQuery } from "./tanstack-vendor.BIk3vO8A.js";
import "./validation.BP54sFI2.js";
import "./math-katex.DxbeSjUQ.js";
import "./locales.ChAdG6Fl.js";
import "./i18n._XUZBGeY.js";
import "./avatars.nHKiRWDx.js";
import "./advanced-inputs.CpmuqqOu.js";
import "./virtualization.Y9CzZf6v.js";
import "./headlessui.BIng4ybq.js";
import "./animations.D8hBsh0O.js";
import "./framer-motion.FyKrVjgo.js";
import "./react-interactions.BIWLTCWW.js";
import "./routing.CR6eMUp2.js";
import "./http-client.C9qBXnGL.js";
import "./date-utils.DHbCXbDi.js";
import "./forms.D6YIY1rm.js";
import "./markdown-processing.-CS19htl.js";
import "./markdown_highlight.BkX_n8a8.js";
import "./sandpack.BNUM6M6Z.js";
import "./codemirror-core.DEJX0dSu.js";
import "./codemirror-state.DXuhJhmc.js";
import "./codemirror-view.3hozZ9aj.js";
import "./codemirror-language.CCVy4Qxa.js";
import "./security-ui.CdrLa0pf.js";
import "./heic-converter.BWwAQ4DZ.js";
import "./code-editor.CxNYqEX1.js";
const useGetConversationTags = (config) => {
  return useQuery(
    [es.conversationTags],
    () => Ql.getConversationTags(),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      ...config
    }
  );
};
const BookmarkNav = ({ tags, setTags }) => {
  const localize = useLocalize();
  const menuId = reactExports.useId();
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const { data } = useGetConversationTags();
  const label = reactExports.useMemo(
    () => tags.length > 0 ? tags.join(", ") : localize("com_ui_bookmarks"),
    [tags, localize]
  );
  const buttonAriaLabel = reactExports.useMemo(() => {
    if (tags.length === 0) {
      return localize("com_ui_bookmarks");
    }
    return localize("com_ui_bookmarks_count_selected", { count: tags.length });
  }, [tags.length, localize]);
  const bookmarks = reactExports.useMemo(() => data?.filter((tag) => tag.count > 0) ?? [], [data]);
  const handleTagClick = reactExports.useCallback(
    (tag) => {
      if (tags.includes(tag)) {
        setTags(tags.filter((t) => t !== tag));
      } else {
        setTags([...tags, tag]);
      }
    },
    [tags, setTags]
  );
  const handleClear = reactExports.useCallback(() => {
    setTags([]);
  }, [setTags]);
  const dropdownItems = reactExports.useMemo(() => {
    const items = [
      {
        id: "clear-all",
        label: localize("com_ui_clear_all"),
        icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CrossCircledIcon, { className: "size-4" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
          lineNumber: 56,
          columnNumber: 15
        }, void 0),
        hideOnClick: false,
        onClick: handleClear
      }
    ];
    if (bookmarks.length === 0) {
      items.push({
        id: "no-bookmarks",
        label: localize("com_ui_no_bookmarks"),
        icon: "🤔",
        disabled: true
      });
    } else {
      for (const bookmark of bookmarks) {
        const isSelected = tags.includes(bookmark.tag);
        items.push({
          id: bookmark.tag,
          label: bookmark.tag,
          hideOnClick: false,
          icon: isSelected ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookmarkFilledIcon, { className: "size-4" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
            lineNumber: 77,
            columnNumber: 13
          }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookmarkIcon, { className: "size-4" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, void 0),
          onClick: () => handleTagClick(bookmark.tag),
          ariaChecked: isSelected
        });
      }
    }
    return items;
  }, [bookmarks, tags, localize, handleTagClick, handleClear]);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    DropdownPopup,
    {
      portal: true,
      menuId,
      focusLoop: true,
      isOpen: isMenuOpen,
      unmountOnHide: true,
      setIsOpen: setIsMenuOpen,
      keyPrefix: "bookmark-nav-",
      className: "z-[125]",
      trigger: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        TooltipAnchor,
        {
          description: label,
          render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            MenuButton,
            {
              id: "bookmark-nav-menu-button",
              "aria-label": buttonAriaLabel,
              "aria-pressed": tags.length > 0,
              className: cn(
                "flex items-center justify-center",
                "size-9 border-none text-text-primary hover:bg-accent hover:text-accent-foreground",
                "rounded-lg border-none p-2 hover:bg-surface-active-alt",
                "outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black dark:focus-visible:ring-white",
                isMenuOpen ? "bg-surface-hover" : ""
              ),
              "data-testid": "bookmark-menu",
              children: tags.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookmarkFilledIcon, { "aria-hidden": "true", className: "icon-lg text-text-primary" }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
                lineNumber: 118,
                columnNumber: 17
              }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BookmarkIcon, { "aria-hidden": "true", className: "icon-lg text-text-primary" }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
                lineNumber: 120,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
              lineNumber: 104,
              columnNumber: 13
            },
            void 0
          )
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
          lineNumber: 101,
          columnNumber: 9
        },
        void 0
      ),
      items: dropdownItems
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Bookmarks/BookmarkNav.tsx",
      lineNumber: 91,
      columnNumber: 5
    },
    void 0
  );
};
export {
  BookmarkNav as default
};
