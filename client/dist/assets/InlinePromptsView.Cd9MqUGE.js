import { en as jsxDevRuntimeExports, aB as useNavigate, r as reactExports, eV as FileText, fP as useParams, g$ as Navigate } from "./vendor.MscUbBdQ.js";
import { u as useLocalize, a as usePromptGroupsContext, b as useHasAccess, w as ws, O as Os, m as mi, c as useCreatePrompt, d as OpenSidebar, C as CategorySelector, I as Input, e as cn, V as VariablesDropdown, T as TextareaAutosize, P as PromptVariables, D as Description, f as Command, B as Button, g as PromptForm } from "./index.B-EWlhII.js";
import "./utilities.ezTSFZ8X.js";
import { a as useForm, F as FormProvider, C as Controller } from "./forms.D6YIY1rm.js";
import "./validation.BP54sFI2.js";
import "./math-katex.DxbeSjUQ.js";
import "./locales.ChAdG6Fl.js";
import "./i18n._XUZBGeY.js";
import "./radix-ui.BjkARwX1.js";
import "./avatars.nHKiRWDx.js";
import "./advanced-inputs.CpmuqqOu.js";
import "./tanstack-vendor.BIk3vO8A.js";
import "./virtualization.Y9CzZf6v.js";
import "./headlessui.BIng4ybq.js";
import "./animations.D8hBsh0O.js";
import "./framer-motion.FyKrVjgo.js";
import "./react-interactions.BIWLTCWW.js";
import "./routing.CR6eMUp2.js";
import "./http-client.C9qBXnGL.js";
import "./date-utils.DHbCXbDi.js";
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
function EmptyPromptPreview() {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-full w-full content-center text-center font-bold text-text-secondary", children: localize("com_ui_select_or_create_prompt") }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/display/EmptyPromptPreview.tsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
const defaultPrompt = {
  name: "",
  prompt: "",
  type: "text",
  category: "",
  oneliner: void 0,
  command: void 0
};
const CreatePromptForm = ({
  defaultValues = defaultPrompt,
  onSuccess
}) => {
  const localize = useLocalize();
  const navigate = useNavigate();
  const { hasAccess: hasUseAccess } = usePromptGroupsContext() ?? {};
  const hasCreateAccess = useHasAccess({
    permissionType: ws.PROMPTS,
    permission: Os.CREATE
  });
  const hasAccess = hasUseAccess && hasCreateAccess;
  reactExports.useEffect(() => {
    let timeoutId;
    if (!hasAccess && !onSuccess) {
      timeoutId = setTimeout(() => {
        navigate("/c/new");
      }, 1e3);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasAccess, navigate, onSuccess]);
  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      category: localStorage.getItem(mi.LAST_PROMPT_CATEGORY) ?? ""
    }
  });
  const {
    watch,
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors, isValid }
  } = methods;
  const createPromptMutation = useCreatePrompt({
    onSuccess: (response) => {
      const groupId = response.prompt.groupId;
      if (onSuccess && groupId) {
        onSuccess(groupId);
      } else {
        navigate(`/prompts/${groupId}`, { replace: true });
      }
    }
  });
  const promptText = watch("prompt");
  const onSubmit = (data) => {
    const { name, category, oneliner, command, ...rest } = data;
    const groupData = { name, category };
    if ((oneliner?.length ?? 0) > 0) {
      groupData.oneliner = oneliner;
    }
    if ((command?.length ?? 0) > 0) {
      groupData.command = command;
    }
    createPromptMutation.mutate({
      prompt: rest,
      group: groupData
    });
  };
  if (!hasAccess) {
    return null;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FormProvider, { ...methods, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("form", { onSubmit: handleSubmit(onSubmit), className: "w-full px-4 py-2", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h1", { className: "sr-only", children: localize("com_ui_create_prompt_page") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-2 flex items-center justify-between gap-2 sm:hidden", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(OpenSidebar, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CategorySelector, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 119,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-1 flex flex-col items-center justify-between font-bold sm:text-xl md:mb-0 md:text-2xl", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex w-full flex-col items-center justify-between sm:flex-row", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Controller,
        {
          name: "name",
          control,
          rules: { required: localize("com_ui_prompt_name_required") },
          render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative mb-1 flex w-full flex-col sm:w-auto md:mb-0", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Input,
              {
                ...field,
                id: "prompt-name",
                type: "text",
                className: "peer mr-2 w-full border border-border-medium p-2 text-2xl text-text-primary",
                placeholder: " ",
                tabIndex: 0,
                "aria-label": localize("com_ui_prompt_name"),
                "aria-required": "true"
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
                lineNumber: 129,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "label",
              {
                htmlFor: "prompt-name",
                className: "pointer-events-none absolute -top-1 left-3 origin-[0] translate-y-3 scale-100 rounded bg-presentation px-1 text-base text-text-secondary transition-transform duration-200 peer-placeholder-shown:translate-y-3 peer-placeholder-shown:scale-100 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-75",
                children: [
                  localize("com_ui_prompt_name"),
                  "*"
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
                lineNumber: 139,
                columnNumber: 19
              },
              void 0
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: cn(
                  "mt-1 w-56 text-sm text-red-500",
                  errors.name ? "visible h-auto" : "invisible h-0"
                ),
                children: errors.name ? errors.name.message : " "
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
                lineNumber: 145,
                columnNumber: 19
              },
              void 0
            )
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
            lineNumber: 128,
            columnNumber: 17
          }, void 0)
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
          lineNumber: 123,
          columnNumber: 13
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CategorySelector, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 157,
        columnNumber: 15
      }, void 0) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 156,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
      lineNumber: 122,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
      lineNumber: 121,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex w-full flex-col gap-4 md:mt-[1.075rem]", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("header", { className: "flex items-center justify-between rounded-t-xl border border-border-medium bg-transparent p-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "ml-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "size-4 text-text-secondary", "aria-hidden": "true" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
              lineNumber: 165,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-sm font-semibold text-text-primary", children: [
              localize("com_ui_prompt_text"),
              "*"
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
              lineNumber: 166,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
            lineNumber: 164,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex shrink-0 items-center gap-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VariablesDropdown, { fieldName: "prompt" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
            lineNumber: 171,
            columnNumber: 17
          }, void 0) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
            lineNumber: 170,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "min-h-32 rounded-b-xl border border-t-0 border-border-medium p-3 sm:p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Controller,
          {
            name: "prompt",
            control,
            rules: { required: localize("com_ui_prompt_text_required") },
            render: ({ field }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                TextareaAutosize,
                {
                  ...field,
                  className: "w-full resize-none overflow-y-auto bg-transparent font-mono text-sm leading-relaxed text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring-primary sm:text-base",
                  minRows: 4,
                  maxRows: 16,
                  tabIndex: 0,
                  placeholder: localize("com_ui_prompt_input"),
                  "aria-label": localize("com_ui_prompt_input_field"),
                  "aria-required": "true"
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
                  lineNumber: 181,
                  columnNumber: 21
                },
                void 0
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "div",
                {
                  className: cn(
                    "mt-1 text-sm text-red-500",
                    errors.prompt ? "visible h-auto" : "invisible h-0"
                  ),
                  children: errors.prompt ? errors.prompt.message : " "
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
                  lineNumber: 191,
                  columnNumber: 21
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
              lineNumber: 180,
              columnNumber: 19
            }, void 0)
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
            lineNumber: 175,
            columnNumber: 15
          },
          void 0
        ) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
          lineNumber: 174,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PromptVariables, { promptText }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 204,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Description,
        {
          onValueChange: (value) => methods.setValue("oneliner", value),
          tabIndex: 0
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
          lineNumber: 205,
          columnNumber: 11
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Command, { onValueChange: (value) => methods.setValue("command", value), tabIndex: 0 }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 209,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          "aria-label": localize("com_ui_create_prompt"),
          className: cn(
            "w-full sm:w-auto",
            (!isDirty || isSubmitting || !isValid) && "opacity-50"
          ),
          tabIndex: 0,
          type: "submit",
          "aria-disabled": !isDirty || isSubmitting || !isValid || void 0,
          onClick: (e) => {
            if (!isDirty || isSubmitting || !isValid) {
              e.preventDefault();
            }
          },
          children: localize("com_ui_create_prompt")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
          lineNumber: 211,
          columnNumber: 13
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
        lineNumber: 210,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
      lineNumber: 161,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
    lineNumber: 115,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/forms/CreatePromptForm.tsx",
    lineNumber: 114,
    columnNumber: 5
  }, void 0);
};
function InlinePromptsView() {
  const { promptId } = useParams();
  const navigate = useNavigate();
  const isNew = promptId === void 0;
  const hasAccess = useHasAccess({
    permissionType: ws.PROMPTS,
    permission: Os.USE
  });
  const hasCreateAccess = useHasAccess({
    permissionType: ws.PROMPTS,
    permission: Os.CREATE
  });
  const handleCreateSuccess = reactExports.useCallback(
    (groupId) => {
      navigate(`/prompts/${groupId}`, { replace: true });
    },
    [navigate]
  );
  if (!hasAccess) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Navigate, { to: "/c/new", replace: true }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/layouts/InlinePromptsView.tsx",
      lineNumber: 32,
      columnNumber: 12
    }, this);
  }
  if (isNew && !hasCreateAccess) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EmptyPromptPreview, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/layouts/InlinePromptsView.tsx",
      lineNumber: 36,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-full w-full flex-col overflow-y-auto bg-presentation", children: isNew ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CreatePromptForm, { onSuccess: handleCreateSuccess }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/layouts/InlinePromptsView.tsx",
    lineNumber: 42,
    columnNumber: 9
  }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PromptForm, { promptId }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/layouts/InlinePromptsView.tsx",
    lineNumber: 44,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Prompts/layouts/InlinePromptsView.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
export {
  InlinePromptsView as default
};
