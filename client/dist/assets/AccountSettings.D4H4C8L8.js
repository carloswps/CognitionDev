import { ew as Recoil_index_24, r as reactExports, en as jsxDevRuntimeExports, gA as FileImage, hm as AvatarEditor, hn as Move, fd as ZoomOut, fe as ZoomIn, gb as RotateCw, eJ as X, gg as Upload, R as React, ho as RefreshCcw, g9 as Qt, g8 as Kt, hp as Lock, fS as Trash, eB as Recoil_index_22, eR as Download, eP as Check, eO as Copy, gc as QrCode, hq as Smartphone, eg as useAtom, hr as Key, eC as ShieldEllipsis, eF as Plus, gy as EyeOff, fR as Eye, fr as CopyCheck, fi as Trash2, hs as Import, ex as Recoil_index_20, fm as ExternalLink, h8 as ArrowUpDown, eT as MessageSquare, ha as ArrowDown, hb as ArrowUp, eS as Lightbulb, ht as Cog, hu as Command, hv as DollarSign, dZ as MenuProvider, e2 as MenuButton, e0 as Menu, e4 as MenuItem, eV as FileText, hw as LogOut } from "./vendor.MscUbBdQ.js";
import { b as useHasAccess, w as ws, O as Os, s as store, k as useGetFileConfig, $ as $o, z as zo, u as useLocalize, l as useToastContext, n as useUploadAvatarMutation, o as formatBytes, p as Dialog, q as DialogTrigger, B as Button, r as DialogContent, t as DialogHeader, v as DialogTitle, e as cn, L as Label, S as Slider, x as Spinner, y as useAuthContext, A as useRegenerateBackupCodesMutation, j as TooltipAnchor, E as InputOTP, F as InputOTPGroup, G as InputOTPSlot, H as InputOTPSeparator, J as useDeleteUserMutation, I as Input, K as InfoHoverCard, M as ESide, N as Switch, R as useConfirmTwoFactorMutation, U as useEnableTwoFactorMutation, W as useVerifyTwoFactorMutation, X as useDisableTwoFactorMutation, Y as Progress, Z as useGetStartupConfig, _ as useGetUserBalance, a0 as PromptsEditorMode, a1 as fontSizeAtom, a2 as Dropdown, a3 as fi, a4 as showThinkingAtom, a5 as ToggleSwitch, a6 as si, a7 as useUpdateRemoteAgentsPermissionsMutation, a8 as AdminSettingsDialog, a9 as li, aa as useCopyToClipboard, ab as DialogClose, ac as ui, ad as useNewConvo, ae as jo, af as OGDialogTemplate, ag as clearAllConversationStorage, ah as useOnClickOutside, ai as NotificationSeverity, aj as logger, ak as useUploadConversationsMutation, al as startupConfigKey, am as Go, an as useMediaQuery, ao as useSharedLinksQuery, ap as useDeleteSharedLinkMutation, aq as formatDate, ar as DataTable, as as useGetUserQuery, at as useUpdateMemoryPreferencesMutation, au as InputNumber, av as optionText, aw as defaultTextProps, ax as useTTSExternal, ay as useTTSBrowser, az as TTSEndpoints, aA as Jo, aB as ci, aC as GearIcon, aD as SpeechIcon, aE as PersonalizationIcon, aF as DataIcon, aG as UserIcon, aH as General, aI as Avatar$1, aJ as DropdownMenuSeparator, aK as LinkIcon, aL as MyFilesModal } from "./index.B-EWlhII.js";
import { d as debounce } from "./utilities.ezTSFZ8X.js";
import { a8 as $69cb30bb0017df05$export$be92b6f5f03c0fe9, F as $69cb30bb0017df05$export$54c2e3dc7acea9f5, G as $69cb30bb0017df05$export$41fb9f06171c75f4, J as $69cb30bb0017df05$export$7c6e2c02157bb7d2 } from "./radix-ui.BjkARwX1.js";
import { a as AnimatePresence, b as motion } from "./framer-motion.FyKrVjgo.js";
import { Q as QRCodeSVG } from "./security-ui.CdrLa0pf.js";
import { d as useQueryClient } from "./tanstack-vendor.BIk3vO8A.js";
import { L as Link } from "./routing.CR6eMUp2.js";
import { T as Trans } from "./i18n._XUZBGeY.js";
import { z as ze, L as Lt, F as Fe, q as qe, b as ze$1 } from "./headlessui.BIng4ybq.js";
import "./validation.BP54sFI2.js";
import "./math-katex.DxbeSjUQ.js";
import "./locales.ChAdG6Fl.js";
import "./avatars.nHKiRWDx.js";
import "./advanced-inputs.CpmuqqOu.js";
import "./virtualization.Y9CzZf6v.js";
import "./animations.D8hBsh0O.js";
import "./react-interactions.BIWLTCWW.js";
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
import "./heic-converter.BWwAQ4DZ.js";
import "./code-editor.CxNYqEX1.js";
function usePersonalizationAccess() {
  const hasMemoryOptOut = useHasAccess({
    permissionType: ws.MEMORIES,
    permission: Os.OPT_OUT
  });
  const hasAnyPersonalizationFeature = hasMemoryOptOut;
  return {
    hasMemoryOptOut,
    hasAnyPersonalizationFeature
  };
}
function Avatar() {
  const setUser = Recoil_index_24(store.user);
  const [scale, setScale] = reactExports.useState(1);
  const [rotation, setRotation] = reactExports.useState(0);
  const [position, setPosition] = reactExports.useState({ x: 0.5, y: 0.5 });
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const editorRef = reactExports.useRef(null);
  const fileInputRef = reactExports.useRef(null);
  const [image, setImage] = reactExports.useState(null);
  const [isDialogOpen, setDialogOpen] = reactExports.useState(false);
  const { data: fileConfig = zo } = useGetFileConfig({
    select: (data) => $o(data)
  });
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { mutate: uploadAvatar, isLoading: isUploading } = useUploadAvatarMutation({
    onSuccess: (data) => {
      showToast({ message: localize("com_ui_upload_success") });
      setUser((prev) => ({ ...prev, avatar: data.url }));
    },
    onError: (error) => {
      console.error("Error:", error);
      showToast({
        message: localize("com_ui_upload_error"),
        status: "error"
      });
    }
  });
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    handleFile(file);
  };
  const handleFile = reactExports.useCallback(
    (file) => {
      if (fileConfig.avatarSizeLimit != null && file && file.size <= fileConfig.avatarSizeLimit) {
        setImage(file);
        setScale(1);
        setRotation(0);
        setPosition({ x: 0.5, y: 0.5 });
      } else {
        const megabytes = fileConfig.avatarSizeLimit != null ? formatBytes(fileConfig.avatarSizeLimit) : 2;
        showToast({
          message: localize("com_ui_upload_invalid_var", { 0: megabytes + "" }),
          status: "error"
        });
      }
    },
    [fileConfig.avatarSizeLimit, localize, showToast]
  );
  const handleScaleChange = (value) => {
    setScale(value[0]);
  };
  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 5));
  };
  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 1));
  };
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };
  const handlePositionChange = (position2) => {
    setPosition(position2);
  };
  const handleUpload = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "avatar.png");
          formData.append("manual", "true");
          uploadAvatar(formData);
        }
      }, "image/png");
    }
  };
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
  }, []);
  const openFileDialog = reactExports.useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleSelectFileClick = (event) => {
    event.stopPropagation();
    openFileDialog();
  };
  const resetImage = reactExports.useCallback(() => {
    setImage(null);
    setScale(1);
    setRotation(0);
    setPosition({ x: 0.5, y: 0.5 });
  }, []);
  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0.5, y: 0.5 });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Dialog,
    {
      open: isDialogOpen,
      onOpenChange: (open) => {
        setDialogOpen(open);
        if (!open) {
          resetImage();
        }
      },
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_nav_profile_picture") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 174,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileImage, { className: "mr-2 flex w-[22px] items-center", "aria-hidden": "true" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
              lineNumber: 177,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_nav_change_picture") }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
              lineNumber: 178,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 176,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 175,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
          lineNumber: 173,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { showCloseButton: false, className: "w-11/12 max-w-md", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { className: "text-lg font-medium leading-6 text-text-primary", children: image != null ? localize("com_ui_preview") : localize("com_ui_upload_image") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 185,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 184,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center justify-center p-2", children: image != null ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              "div",
              {
                className: cn(
                  "relative overflow-hidden rounded-full ring-4 ring-gray-200 transition-all dark:ring-gray-700",
                  isDragging && "cursor-move ring-blue-500 dark:ring-blue-400"
                ),
                onMouseDown: () => setIsDragging(true),
                onMouseUp: () => setIsDragging(false),
                onMouseLeave: () => setIsDragging(false),
                children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    AvatarEditor,
                    {
                      ref: editorRef,
                      image,
                      width: 280,
                      height: 280,
                      border: 0,
                      borderRadius: 140,
                      color: [255, 255, 255, 0.6],
                      scale,
                      rotate: rotation,
                      position,
                      onPositionChange: handlePositionChange,
                      className: "cursor-move"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 201,
                      columnNumber: 17
                    },
                    this
                  ),
                  !isDragging && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-full bg-black/50 p-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Move, { className: "h-6 w-6 text-white", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 218,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 217,
                    columnNumber: 21
                  }, this) }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 216,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                lineNumber: 192,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 w-full space-y-6", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "zoom-slider", className: "text-sm font-medium", children: localize("com_ui_zoom") }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 228,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm text-text-secondary", children: [
                    Math.round(scale * 100),
                    "%"
                  ] }, void 0, true, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 231,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: handleZoomOut,
                      disabled: scale <= 1,
                      "aria-label": localize("com_ui_zoom_out"),
                      className: "shrink-0",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ZoomOut, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 243,
                        columnNumber: 23
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 234,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Slider,
                    {
                      id: "zoom-slider",
                      value: [scale],
                      min: 1,
                      max: 5,
                      step: 0.1,
                      onValueChange: handleScaleChange,
                      className: "flex-1",
                      "aria-label": localize("com_ui_zoom_level")
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 245,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: handleZoomIn,
                      disabled: scale >= 5,
                      "aria-label": localize("com_ui_zoom_in"),
                      className: "shrink-0",
                      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ZoomIn, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 264,
                        columnNumber: 23
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 255,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 233,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                lineNumber: 226,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center space-x-3", children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: handleRotate,
                    className: "flex items-center space-x-2",
                    "aria-label": localize("com_ui_rotate_90"),
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RotateCw, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 277,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm", children: localize("com_ui_rotate") }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 278,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 270,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    onClick: handleReset,
                    className: "flex items-center space-x-2",
                    "aria-label": localize("com_ui_reset_adjustments"),
                    children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(X, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 287,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm", children: localize("com_ui_reset") }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                        lineNumber: 288,
                        columnNumber: 21
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 280,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                lineNumber: 269,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-center text-xs text-gray-500 dark:text-gray-400", children: localize("com_ui_editor_instructions") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                lineNumber: 293,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
              lineNumber: 224,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 flex w-full space-x-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  className: "flex-1",
                  onClick: resetImage,
                  disabled: isUploading,
                  children: localize("com_ui_cancel")
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 300,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  variant: "submit",
                  type: "button",
                  className: cn("w-full", isUploading ? "cursor-not-allowed opacity-90" : ""),
                  onClick: handleUpload,
                  disabled: isUploading,
                  children: [
                    isUploading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "icon-sm mr-2" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 317,
                      columnNumber: 21
                    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Upload, { className: "mr-2 h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                      lineNumber: 319,
                      columnNumber: 21
                    }, this),
                    localize("com_ui_upload")
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 309,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
              lineNumber: 299,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 191,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "flex h-72 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-transparent transition-colors hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500",
              onDrop: handleDrop,
              onDragOver: handleDragOver,
              role: "button",
              tabIndex: 0,
              onClick: openFileDialog,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openFileDialog();
                }
              },
              "aria-label": localize("com_ui_upload_avatar_label"),
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileImage, { className: "mb-4 size-16 text-gray-400" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 341,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-2 text-center text-sm font-medium text-text-primary", children: localize("com_ui_drag_drop") }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 342,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mb-4 text-center text-xs text-text-secondary", children: localize("com_ui_max_file_size", {
                  0: fileConfig.avatarSizeLimit != null ? formatBytes(fileConfig.avatarSizeLimit) : "2MB"
                }) }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 345,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { type: "button", variant: "secondary", onClick: handleSelectFileClick, children: localize("com_ui_select_file") }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                  lineNumber: 353,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    className: "hidden",
                    accept: ".png, .jpg, .jpeg",
                    onChange: handleFileChange,
                    "aria-label": localize("com_ui_file_input_avatar_label")
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
                    lineNumber: 356,
                    columnNumber: 15
                  },
                  this
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
              lineNumber: 326,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
            lineNumber: 189,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
          lineNumber: 183,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Avatar.tsx",
      lineNumber: 164,
      columnNumber: 5
    },
    this
  );
}
const BackupCodesItem = () => {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const { showToast } = useToastContext();
  const setUser = Recoil_index_24(store.user);
  const [isDialogOpen, setDialogOpen] = reactExports.useState(false);
  const [otpToken, setOtpToken] = reactExports.useState("");
  const [useBackup, setUseBackup] = reactExports.useState(false);
  const { mutate: regenerateBackupCodes, isLoading } = useRegenerateBackupCodesMutation();
  const needs2FA = !!user?.twoFactorEnabled;
  const fetchBackupCodes = (auto = false) => {
    let payload;
    if (needs2FA && otpToken.trim()) {
      payload = useBackup ? { backupCode: otpToken.trim() } : { token: otpToken.trim() };
    }
    regenerateBackupCodes(payload, {
      onSuccess: (data) => {
        const newBackupCodes = data.backupCodesHash;
        setUser((prev) => ({ ...prev, backupCodes: newBackupCodes }));
        setOtpToken("");
        showToast({
          message: localize("com_ui_backup_codes_regenerated"),
          status: "success"
        });
        if (!auto && newBackupCodes.length) {
          const codesString = data.backupCodes.join("\n");
          const blob = new Blob([codesString], {
            type: "text/plain;charset=utf-8"
          });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "backup-codes.txt";
          a.click();
          URL.revokeObjectURL(url);
        }
      },
      onError: () => showToast({
        message: localize("com_ui_backup_codes_regenerate_error"),
        status: "error"
      })
    });
  };
  const handleRegenerate = () => {
    fetchBackupCodes(false);
  };
  const otpReady = !needs2FA || otpToken.length === (useBackup ? 8 : 6);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isDialogOpen, onOpenChange: setDialogOpen, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "font-light", children: localize("com_ui_backup_codes") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 92,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { "aria-label": "Manage Backup Codes", variant: "outline", children: localize("com_ui_manage") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 95,
        columnNumber: 11
      }, void 0) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
      lineNumber: 90,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { className: "w-11/12 max-w-lg", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { className: "mb-6 text-2xl font-semibold", children: localize("com_ui_backup_codes") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AnimatePresence, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          className: "mt-4",
          children: [
            Array.isArray(user?.backupCodes) && user?.backupCodes.length > 0 ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-warning-300 bg-warning-50 dark:border-warning-700 dark:bg-warning-900/20 mb-6 rounded-lg border p-4", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-text-secondary", children: localize("com_ui_backup_codes_security_info") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 116,
                columnNumber: 19
              }, void 0) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 115,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-4 text-lg font-medium", children: localize("com_ui_backup_codes_status") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 121,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4", children: user?.backupCodes.map((code, index) => {
                const isUsed = code.used;
                const description = `Backup code number ${index + 1}, ${isUsed ? `used on ${code.usedAt ? new Date(code.usedAt).toLocaleDateString() : "an unknown date"}` : "not used yet"}`;
                return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  motion.div,
                  {
                    role: "listitem",
                    tabIndex: 0,
                    "aria-label": description,
                    initial: { opacity: 0, y: 20 },
                    animate: { opacity: 1, y: 0 },
                    transition: { delay: index * 0.1 },
                    onFocus: () => {
                      const announcement = new CustomEvent("announce", {
                        detail: { message: description }
                      });
                      document.dispatchEvent(announcement);
                    },
                    className: `flex flex-col rounded-xl border p-4 backdrop-blur-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isUsed ? "border-red-200 bg-red-50/80 dark:border-red-800 dark:bg-red-900/20" : "border-green-200 bg-green-50/80 dark:border-green-800 dark:bg-green-900/20"} `,
                    children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", "aria-hidden": "true", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium text-text-secondary", children: localize("com_ui_backup_code_number", {
                        number: index + 1
                      }) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 156,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        TooltipAnchor,
                        {
                          description: code.usedAt ? new Date(code.usedAt).toLocaleDateString() : "",
                          disabled: !isUsed,
                          focusable: false,
                          className: isUsed ? "cursor-pointer" : "cursor-default",
                          render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "span",
                            {
                              className: `rounded-full px-3 py-1 text-sm font-medium ${isUsed ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"}`,
                              children: isUsed ? localize("com_ui_used") : localize("com_ui_not_used")
                            },
                            void 0,
                            false,
                            {
                              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                              lineNumber: 169,
                              columnNumber: 31
                            },
                            void 0
                          )
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                          lineNumber: 161,
                          columnNumber: 27
                        },
                        void 0
                      )
                    ] }, void 0, true, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 155,
                      columnNumber: 25
                    }, void 0)
                  },
                  code.codeHash,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                    lineNumber: 135,
                    columnNumber: 23
                  },
                  void 0
                );
              }) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 125,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  onClick: handleRegenerate,
                  disabled: isLoading || !otpReady,
                  variant: "default",
                  className: "px-8 py-3 transition-all disabled:opacity-50",
                  children: [
                    isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "mr-2" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 193,
                      columnNumber: 23
                    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RefreshCcw, { className: "mr-2 h-4 w-4", "aria-hidden": "true" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 195,
                      columnNumber: 23
                    }, void 0),
                    isLoading ? localize("com_ui_regenerating") : localize("com_ui_regenerate_backup")
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                  lineNumber: 186,
                  columnNumber: 19
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 185,
                columnNumber: 17
              }, void 0)
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center gap-4 p-6 text-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                onClick: handleRegenerate,
                disabled: isLoading || !otpReady,
                variant: "default",
                className: "px-8 py-3 transition-all disabled:opacity-50",
                children: [
                  isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "mr-2" }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                    lineNumber: 211,
                    columnNumber: 33
                  }, void 0),
                  localize("com_ui_regenerate_backup")
                ]
              },
              void 0,
              true,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 205,
                columnNumber: 17
              },
              void 0
            ) }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
              lineNumber: 204,
              columnNumber: 15
            }, void 0),
            needs2FA && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-6 space-y-3", children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-sm font-medium", children: localize("com_ui_2fa_verification_required") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                InputOTP,
                {
                  value: otpToken,
                  onChange: setOtpToken,
                  maxLength: useBackup ? 8 : 6,
                  pattern: useBackup ? Qt : Kt,
                  className: "gap-2",
                  children: useBackup ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 231,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 232,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 233,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 234,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 235,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 236,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 6 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 237,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 7 }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 238,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                    lineNumber: 230,
                    columnNumber: 23
                  }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 243,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 244,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 245,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 242,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSeparator, {}, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 247,
                      columnNumber: 25
                    }, void 0),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 249,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 250,
                        columnNumber: 27
                      }, void 0),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                        lineNumber: 251,
                        columnNumber: 27
                      }, void 0)
                    ] }, void 0, true, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                      lineNumber: 248,
                      columnNumber: 25
                    }, void 0)
                  ] }, void 0, true, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                    lineNumber: 241,
                    columnNumber: 23
                  }, void 0)
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                  lineNumber: 222,
                  columnNumber: 19
                },
                void 0
              ) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                lineNumber: 221,
                columnNumber: 17
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setUseBackup(!useBackup);
                    setOtpToken("");
                  },
                  className: "text-sm text-primary hover:underline",
                  children: useBackup ? localize("com_ui_use_2fa_code") : localize("com_ui_use_backup_code")
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
                  lineNumber: 257,
                  columnNumber: 17
                },
                void 0
              )
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
              lineNumber: 217,
              columnNumber: 15
            }, void 0)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
          lineNumber: 107,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/BackupCodesItem.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, void 0);
};
const BackupCodesItem$1 = React.memo(BackupCodesItem);
const DeleteAccount = ({ disabled = false }) => {
  const localize = useLocalize();
  const { user, logout } = useAuthContext();
  const { mutate: deleteUser, isLoading: isDeleting } = useDeleteUserMutation({
    onSuccess: () => logout()
  });
  const [isDialogOpen, setDialogOpen] = reactExports.useState(false);
  const [isLocked, setIsLocked] = reactExports.useState(true);
  const [otpToken, setOtpToken] = reactExports.useState("");
  const [useBackup, setUseBackup] = reactExports.useState(false);
  const needs2FA = !!user?.twoFactorEnabled;
  const handleDeleteUser = () => {
    if (isLocked) {
      return;
    }
    let payload;
    if (needs2FA && otpToken.trim()) {
      payload = useBackup ? { backupCode: otpToken.trim() } : { token: otpToken.trim() };
    }
    deleteUser(payload);
  };
  const handleInputChange = reactExports.useCallback(
    (newEmailInput) => {
      const isEmailCorrect = newEmailInput.trim().toLowerCase() === user?.email.trim().toLowerCase();
      setIsLocked(!isEmailCorrect);
    },
    [user?.email]
  );
  const otpReady = !needs2FA || otpToken.length === (useBackup ? 8 : 6);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isDialogOpen, onOpenChange: setDialogOpen, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "delete-account-label", children: localize("com_nav_delete_account") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          "aria-labelledby": "delete-account-label",
          variant: "destructive",
          onClick: () => setDialogOpen(true),
          disabled,
          children: localize("com_ui_delete")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
          lineNumber: 71,
          columnNumber: 13
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 70,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 68,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { className: "w-11/12 max-w-md", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { className: "text-lg font-medium leading-6", children: localize("com_nav_delete_account_confirm") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 83,
        columnNumber: 13
      }, void 0) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 82,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-8 text-sm text-black dark:text-white", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("ul", { className: "font-semibold text-amber-600", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: localize("com_nav_delete_warning") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("li", { children: localize("com_nav_delete_data_info") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, void 0) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 87,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: renderInput(
          localize("com_nav_delete_account_email_placeholder"),
          "email-confirm-input",
          user?.email ?? "",
          (e) => handleInputChange(e.target.value)
        ) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
          lineNumber: 94,
          columnNumber: 13
        }, void 0),
        needs2FA && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4 space-y-3", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-sm font-medium", children: localize("com_ui_2fa_verification_required") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
            lineNumber: 104,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            InputOTP,
            {
              value: otpToken,
              onChange: setOtpToken,
              maxLength: useBackup ? 8 : 6,
              pattern: useBackup ? Qt : Kt,
              className: "gap-2",
              children: useBackup ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 117,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 118,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 119,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 120,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 121,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 122,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 6 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 123,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 7 }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 124,
                  columnNumber: 25
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                lineNumber: 116,
                columnNumber: 23
              }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 129,
                    columnNumber: 27
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 130,
                    columnNumber: 27
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 131,
                    columnNumber: 27
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 128,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSeparator, {}, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 133,
                  columnNumber: 25
                }, void 0),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 135,
                    columnNumber: 27
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 136,
                    columnNumber: 27
                  }, void 0),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                    lineNumber: 137,
                    columnNumber: 27
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                  lineNumber: 134,
                  columnNumber: 25
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
                lineNumber: 127,
                columnNumber: 23
              }, void 0)
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
              lineNumber: 108,
              columnNumber: 19
            },
            void 0
          ) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
            lineNumber: 107,
            columnNumber: 17
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => {
                setUseBackup(!useBackup);
                setOtpToken("");
              },
              className: "text-sm text-primary hover:underline",
              children: useBackup ? localize("com_ui_use_2fa_code") : localize("com_ui_use_backup_code")
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
              lineNumber: 143,
              columnNumber: 17
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, void 0),
        renderDeleteButton(handleDeleteUser, isDeleting, isLocked || !otpReady, localize)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 93,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 81,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
    lineNumber: 67,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, void 0);
};
const renderInput = (label, id, value, onChange) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-4", children: [
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("label", { className: "mb-1 block text-sm font-medium text-black dark:text-white", htmlFor: id, children: label }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
    lineNumber: 170,
    columnNumber: 5
  }, void 0),
  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { id, onChange, placeholder: value }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
    lineNumber: 173,
    columnNumber: 5
  }, void 0)
] }, void 0, true, {
  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
  lineNumber: 169,
  columnNumber: 3
}, void 0);
const renderDeleteButton = (handleDeleteUser, isDeleting, isLocked, localize) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
  "button",
  {
    className: cn(
      "mt-4 flex w-full items-center justify-center rounded-lg bg-surface-tertiary px-4 py-2 transition-all duration-200",
      isLocked ? "cursor-not-allowed opacity-30" : "bg-destructive text-destructive-foreground"
    ),
    onClick: handleDeleteUser,
    disabled: isDeleting || isLocked,
    children: isDeleting ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex h-6 justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "icon-sm m-auto" }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 193,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 192,
      columnNumber: 7
    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: isLocked ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lock, { className: "size-5", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 199,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-2", children: localize("com_ui_locked") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 200,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 198,
      columnNumber: 11
    }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash, { className: "size-5", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 204,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "ml-2", children: localize("com_nav_delete_account_button") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
        lineNumber: 205,
        columnNumber: 13
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 203,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
      lineNumber: 196,
      columnNumber: 7
    }, void 0)
  },
  void 0,
  false,
  {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DeleteAccount.tsx",
    lineNumber: 183,
    columnNumber: 3
  },
  void 0
);
function DisplayUsernameMessages() {
  const localize = useLocalize();
  const [UsernameDisplay, setUsernameDisplay] = Recoil_index_22(store.UsernameDisplay);
  const handleCheckedChange = (checked) => {
    setUsernameDisplay(checked);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "user-name-display-label", children: localize("com_nav_user_name_display") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisplayUsernameMessages.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InfoHoverCard, { side: ESide.Bottom, text: localize("com_nav_info_user_name_display") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisplayUsernameMessages.tsx",
        lineNumber: 19,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisplayUsernameMessages.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Switch,
      {
        id: "UsernameDisplay",
        checked: UsernameDisplay,
        onCheckedChange: handleCheckedChange,
        className: "ml-4",
        "data-testid": "UsernameDisplay",
        "aria-labelledby": "user-name-display-label"
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisplayUsernameMessages.tsx",
        lineNumber: 21,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisplayUsernameMessages.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this);
}
const DisableTwoFactorToggle = ({
  enabled,
  onChange,
  disabled,
  buttonRef
}) => {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: [
      " ",
      localize("com_nav_2fa")
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisableTwoFactorToggle.tsx",
      lineNumber: 25,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisableTwoFactorToggle.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        ref: buttonRef,
        variant: enabled ? "destructive" : "outline",
        onClick: onChange,
        disabled,
        "aria-haspopup": "dialog",
        "aria-controls": "two-factor-authentication-dialog",
        children: enabled ? localize("com_ui_2fa_disable") : localize("com_ui_2fa_enable")
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisableTwoFactorToggle.tsx",
        lineNumber: 28,
        columnNumber: 9
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisableTwoFactorToggle.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/DisableTwoFactorToggle.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, void 0);
};
const fadeAnimation$4 = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};
const BackupPhase = ({
  backupCodes,
  onDownload,
  downloaded,
  onNext
}) => {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { ...fadeAnimation$4, className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "break-keep text-sm", children: localize("com_ui_download_backup_tooltip") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid grid-cols-2 gap-4 rounded-xl bg-surface-secondary p-6", children: backupCodes.map((code, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: index * 0.1 },
        className: "rounded-lg bg-surface-tertiary p-3",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "hidden text-sm text-text-secondary sm:inline", children: [
            "#",
            index + 1
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
            lineNumber: 43,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono text-lg", children: code }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
            lineNumber: 44,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
          lineNumber: 42,
          columnNumber: 13
        }, void 0)
      },
      code,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
        lineNumber: 35,
        columnNumber: 11
      },
      void 0
    )) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: onDownload, className: "flex-1 gap-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Download, { className: "h-4 w-4", "aria-hidden": "true" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
          lineNumber: 51,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "hidden sm:inline", children: localize("com_ui_download_backup") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: onNext, disabled: !downloaded, className: "flex-1", children: localize("com_ui_complete_setup") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/BackupPhase.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, void 0);
};
const fadeAnimation$3 = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};
const DisablePhase = ({ onDisable, isDisabling }) => {
  const localize = useLocalize();
  const [token, setToken] = reactExports.useState("");
  const [useBackup, setUseBackup] = reactExports.useState(false);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { ...fadeAnimation$3, className: "space-y-8", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      InputOTP,
      {
        value: token,
        onChange: setToken,
        maxLength: useBackup ? 8 : 6,
        pattern: useBackup ? Qt : Kt,
        className: "gap-2",
        children: useBackup ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 46,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 47,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 50,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 51,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 6 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 52,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 7 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 53,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 0 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 58,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 1 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 59,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 2 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 60,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 57,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSeparator, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 62,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 3 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 64,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 4 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 65,
              columnNumber: 17
            }, void 0),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: 5 }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
              lineNumber: 66,
              columnNumber: 17
            }, void 0)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 63,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
          lineNumber: 56,
          columnNumber: 13
        }, void 0)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
        lineNumber: 37,
        columnNumber: 9
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: "destructive",
        onClick: () => onDisable(token, useBackup),
        disabled: isDisabling || token.length !== (useBackup ? 8 : 6),
        className: "w-full rounded-xl px-6 py-3 transition-all disabled:opacity-50",
        children: [
          isDisabling && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "mr-2" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
            lineNumber: 78,
            columnNumber: 25
          }, void 0),
          isDisabling ? localize("com_ui_disabling") : localize("com_ui_2fa_disable")
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
        lineNumber: 72,
        columnNumber: 7
      },
      void 0
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "button",
      {
        onClick: () => setUseBackup(!useBackup),
        className: "text-sm text-primary hover:underline",
        children: useBackup ? localize("com_ui_use_2fa_code") : localize("com_ui_use_backup_code")
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
        lineNumber: 81,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/DisablePhase.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, void 0);
};
const fadeAnimation$2 = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};
const QRPhase = ({ secret, otpauthUrl, onNext }) => {
  const localize = useLocalize();
  const [isCopying, setIsCopying] = reactExports.useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(secret);
    setIsCopying(true);
    setTimeout(() => setIsCopying(false), 2e3);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { ...fadeAnimation$2, className: "space-y-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col items-center space-y-6", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        motion.div,
        {
          initial: { scale: 0.8, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          className: "rounded-2xl bg-white p-4 shadow-lg",
          children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(QRCodeSVG, { value: otpauthUrl, size: 240 }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
            lineNumber: 43,
            columnNumber: 11
          }, void 0)
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
          lineNumber: 38,
          columnNumber: 9
        },
        void 0
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-full space-y-3", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-sm font-medium text-text-secondary", children: localize("com_ui_secret_key") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Input, { value: secret, readOnly: true, className: "font-mono text-lg tracking-wider" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
            lineNumber: 50,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleCopy,
              className: cn("h-auto shrink-0", isCopying ? "cursor-default" : ""),
              children: isCopying ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Check, { className: "size-4", "aria-hidden": "true" }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
                lineNumber: 58,
                columnNumber: 17
              }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { className: "size-4", "aria-hidden": "true" }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
                lineNumber: 60,
                columnNumber: 17
              }, void 0)
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
              lineNumber: 51,
              columnNumber: 13
            },
            void 0
          )
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: onNext, className: "w-full", children: localize("com_ui_continue") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/QRPhase.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
const fadeAnimation$1 = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};
const SetupPhase = ({ isGenerating, onGenerate }) => {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { ...fadeAnimation$1, className: "space-y-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-xl bg-surface-secondary p-6", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "mb-4 flex justify-center text-lg font-medium", children: localize("com_ui_2fa_account_security") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: "default",
        onClick: onGenerate,
        className: "flex w-full",
        disabled: isGenerating,
        children: [
          isGenerating ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "size-5" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
            lineNumber: 37,
            columnNumber: 13
          }, void 0) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(QrCode, { className: "size-5", "aria-hidden": "true" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
            lineNumber: 39,
            columnNumber: 13
          }, void 0),
          isGenerating ? localize("com_ui_generating") : localize("com_ui_generate_qrcode")
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
        lineNumber: 30,
        columnNumber: 9
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
    lineNumber: 26,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/SetupPhase.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, void 0);
};
const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
};
const VerifyPhase = ({
  token,
  onTokenChange,
  isVerifying,
  onNext
}) => {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(motion.div, { ...fadeAnimation, className: "space-y-8", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      InputOTP,
      {
        value: token,
        onChange: onTokenChange,
        maxLength: 6,
        pattern: Kt,
        className: "gap-2",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: i }, i, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
            lineNumber: 48,
            columnNumber: 15
          }, void 0)) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
            lineNumber: 46,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSeparator, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
            lineNumber: 51,
            columnNumber: 11
          }, void 0),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPGroup, { children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InputOTPSlot, { index: i + 3 }, i + 3, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, void 0)) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
            lineNumber: 52,
            columnNumber: 11
          }, void 0)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
        lineNumber: 39,
        columnNumber: 9
      },
      void 0
    ) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: onNext, disabled: isVerifying || token.length !== 6, className: "w-full", children: localize("com_ui_verify") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorPhases/VerifyPhase.tsx",
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
const phaseVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};
const TwoFactorAuthentication = () => {
  const localize = useLocalize();
  const { user } = useAuthContext();
  const setUser = Recoil_index_24(store.user);
  const { showToast } = useToastContext();
  const buttonRef = reactExports.useRef(null);
  const [secret, setSecret] = reactExports.useState("");
  const [otpauthUrl, setOtpauthUrl] = reactExports.useState("");
  const [downloaded, setDownloaded] = reactExports.useState(false);
  const [backupCodes, setBackupCodes] = reactExports.useState([]);
  const [_disableToken, setDisableToken] = reactExports.useState("");
  const [isDialogOpen, setDialogOpen] = reactExports.useState(false);
  const [verificationToken, setVerificationToken] = reactExports.useState("");
  const [phase, setPhase] = reactExports.useState(user?.twoFactorEnabled ? "disable" : "setup");
  const { mutate: confirm2FAMutate } = useConfirmTwoFactorMutation();
  const { mutate: enable2FAMutate, isLoading: isGenerating } = useEnableTwoFactorMutation();
  const { mutate: verify2FAMutate, isLoading: isVerifying } = useVerifyTwoFactorMutation();
  const { mutate: disable2FAMutate, isLoading: isDisabling } = useDisableTwoFactorMutation();
  const steps = ["Setup", "Scan QR", "Verify", "Backup"];
  const phasesLabel = {
    setup: "Setup",
    qr: "Scan QR",
    verify: "Verify",
    backup: "Backup",
    disable: ""
  };
  const currentStep = steps.indexOf(phasesLabel[phase]);
  const resetState = reactExports.useCallback(() => {
    if (user?.twoFactorEnabled && otpauthUrl) {
      disable2FAMutate(void 0, {
        onError: () => showToast({
          message: localize("com_ui_2fa_disable_error"),
          status: "error"
        })
      });
    }
    setOtpauthUrl("");
    setSecret("");
    setBackupCodes([]);
    setVerificationToken("");
    setDisableToken("");
    setPhase(user?.twoFactorEnabled ? "disable" : "setup");
    setDownloaded(false);
  }, [user, otpauthUrl, disable2FAMutate, localize, showToast]);
  const handleGenerateQRCode = reactExports.useCallback(() => {
    enable2FAMutate(void 0, {
      onSuccess: ({ otpauthUrl: otpauthUrl2, backupCodes: backupCodes2 }) => {
        setOtpauthUrl(otpauthUrl2);
        setSecret(otpauthUrl2.split("secret=")[1].split("&")[0]);
        setBackupCodes(backupCodes2);
        setPhase("qr");
      },
      onError: () => showToast({
        message: localize("com_ui_2fa_generate_error"),
        status: "error"
      })
    });
  }, [enable2FAMutate, localize, showToast]);
  const handleVerify = reactExports.useCallback(() => {
    if (!verificationToken) {
      return;
    }
    verify2FAMutate(
      { token: verificationToken },
      {
        onSuccess: () => {
          showToast({ message: localize("com_ui_2fa_verified") });
          confirm2FAMutate(
            { token: verificationToken },
            {
              onSuccess: () => setPhase("backup"),
              onError: () => showToast({
                message: localize("com_ui_2fa_invalid"),
                status: "error"
              })
            }
          );
        },
        onError: () => showToast({
          message: localize("com_ui_2fa_invalid"),
          status: "error"
        })
      }
    );
  }, [verificationToken, verify2FAMutate, confirm2FAMutate, localize, showToast]);
  const handleDownload = reactExports.useCallback(() => {
    if (!backupCodes.length) {
      return;
    }
    const blob = new Blob([backupCodes.join("\n")], {
      type: "text/plain;charset=utf-8"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }, [backupCodes]);
  const handleConfirm = reactExports.useCallback(() => {
    setDialogOpen(false);
    setPhase("disable");
    showToast({ message: localize("com_ui_2fa_enabled") });
    setUser(
      (prev) => ({
        ...prev,
        backupCodes: backupCodes.map((code) => ({
          code,
          codeHash: code,
          used: false,
          usedAt: null
        })),
        twoFactorEnabled: true
      })
    );
  }, [setUser, localize, showToast, backupCodes]);
  const handleDisableVerify = reactExports.useCallback(
    (token, useBackup) => {
      if (!useBackup && token.trim().length < 6) {
        return;
      }
      if (useBackup && token.trim().length < 8) {
        return;
      }
      const payload = {};
      if (useBackup) {
        payload.backupCode = token.trim();
      } else {
        payload.token = token.trim();
      }
      disable2FAMutate(payload, {
        onSuccess: () => {
          showToast({ message: localize("com_ui_2fa_disabled") });
          setDialogOpen(false);
          setUser(
            (prev) => ({
              ...prev,
              totpSecret: "",
              backupCodes: [],
              twoFactorEnabled: false
            })
          );
          setPhase("setup");
          setOtpauthUrl("");
        },
        onError: () => showToast({
          message: localize("com_ui_2fa_invalid"),
          status: "error"
        })
      });
    },
    [disable2FAMutate, showToast, localize, setUser]
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Dialog,
    {
      open: isDialogOpen,
      onOpenChange: (open) => {
        setDialogOpen(open);
        if (!open) {
          resetState();
        }
      },
      triggerRef: buttonRef,
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          DisableTwoFactorToggle,
          {
            enabled: !!user?.twoFactorEnabled,
            onChange: () => setDialogOpen(true),
            disabled: isVerifying || isDisabling || isGenerating,
            buttonRef
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
            lineNumber: 231,
            columnNumber: 7
          },
          void 0
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { className: "w-11/12 max-w-lg p-6", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          motion.div,
          {
            id: "two-factor-authentication-dialog",
            variants: phaseVariants,
            initial: "initial",
            animate: "animate",
            exit: "exit",
            className: "space-y-6",
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { className: "mb-2 flex items-center gap-3 text-2xl font-bold", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Smartphone, { className: "h-6 w-6 text-primary", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 251,
                    columnNumber: 17
                  }, void 0),
                  user?.twoFactorEnabled ? localize("com_ui_2fa_disable") : localize("com_ui_2fa_setup")
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                  lineNumber: 250,
                  columnNumber: 15
                }, void 0),
                user?.twoFactorEnabled && phase !== "disable" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-4 space-y-3", children: [
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    Progress,
                    {
                      value: steps.indexOf(phasesLabel[phase]) / (steps.length - 1) * 100,
                      className: "h-2 rounded-full"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                      lineNumber: 258,
                      columnNumber: 19
                    },
                    void 0
                  ),
                  /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-between text-sm", children: steps.map((step, index) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                    motion.span,
                    {
                      animate: {
                        color: currentStep >= index ? "var(--text-primary)" : "var(--text-tertiary)"
                      },
                      className: "font-medium",
                      children: step
                    },
                    step,
                    false,
                    {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                      lineNumber: 264,
                      columnNumber: 23
                    },
                    void 0
                  )) }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 262,
                    columnNumber: 19
                  }, void 0)
                ] }, void 0, true, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                  lineNumber: 257,
                  columnNumber: 17
                }, void 0)
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                lineNumber: 249,
                columnNumber: 13
              }, void 0),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AnimatePresence, { mode: "wait", children: [
                phase === "setup" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  SetupPhase,
                  {
                    isGenerating,
                    onGenerate: handleGenerateQRCode,
                    onNext: () => setPhase("qr"),
                    onError: (error) => showToast({ message: error.message, status: "error" })
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 282,
                    columnNumber: 17
                  },
                  void 0
                ),
                phase === "qr" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  QRPhase,
                  {
                    secret,
                    otpauthUrl,
                    onNext: () => setPhase("verify"),
                    onError: (error) => showToast({ message: error.message, status: "error" })
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 291,
                    columnNumber: 17
                  },
                  void 0
                ),
                phase === "verify" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  VerifyPhase,
                  {
                    token: verificationToken,
                    onTokenChange: setVerificationToken,
                    isVerifying,
                    onNext: handleVerify,
                    onError: (error) => showToast({ message: error.message, status: "error" })
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 300,
                    columnNumber: 17
                  },
                  void 0
                ),
                phase === "backup" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  BackupPhase,
                  {
                    backupCodes,
                    onDownload: handleDownload,
                    downloaded,
                    onNext: handleConfirm,
                    onError: (error) => showToast({ message: error.message, status: "error" })
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 310,
                    columnNumber: 17
                  },
                  void 0
                ),
                phase === "disable" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  DisablePhase,
                  {
                    onDisable: handleDisableVerify,
                    isDisabling,
                    onError: (error) => showToast({ message: error.message, status: "error" })
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                    lineNumber: 320,
                    columnNumber: 17
                  },
                  void 0
                )
              ] }, void 0, true, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
                lineNumber: 280,
                columnNumber: 13
              }, void 0)
            ]
          },
          phase,
          true,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
            lineNumber: 240,
            columnNumber: 11
          },
          void 0
        ) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
          lineNumber: 239,
          columnNumber: 9
        }, void 0) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
          lineNumber: 238,
          columnNumber: 7
        }, void 0)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/TwoFactorAuthentication.tsx",
      lineNumber: 221,
      columnNumber: 5
    },
    void 0
  );
};
const EnableTwoFactorItem = React.memo(TwoFactorAuthentication);
function Account() {
  const { user } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 p-1 text-sm text-text-primary", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DisplayUsernameMessages, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 16,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Avatar, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 20,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    user?.provider === "local" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EnableTwoFactorItem, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
        lineNumber: 25,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
        lineNumber: 24,
        columnNumber: 11
      }, this),
      user?.twoFactorEnabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(BackupCodesItem$1, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
        lineNumber: 29,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
        lineNumber: 28,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    startupConfig?.allowAccountDeletion !== false && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DeleteAccount, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 36,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Account/Account.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}
const Account$1 = React.memo(Account);
const addIntervalToDate = (date, value, unit) => {
  const result = new Date(date);
  switch (unit) {
    case "seconds":
      result.setSeconds(result.getSeconds() + value);
      break;
    case "minutes":
      result.setMinutes(result.getMinutes() + value);
      break;
    case "hours":
      result.setHours(result.getHours() + value);
      break;
    case "days":
      result.setDate(result.getDate() + value);
      break;
    case "weeks":
      result.setDate(result.getDate() + value * 7);
      break;
    case "months":
      result.setMonth(result.getMonth() + value);
      break;
  }
  return result;
};
function getNextFutureInterval(baseDate, value, unit) {
  const now = /* @__PURE__ */ new Date();
  if (baseDate > now) {
    return addIntervalToDate(baseDate, value, unit);
  }
  if (unit === "months") {
    let nextRefillDate = new Date(baseDate);
    while (nextRefillDate <= now) {
      nextRefillDate = addIntervalToDate(nextRefillDate, value, unit);
    }
    return nextRefillDate;
  }
  const intervalInMs = {
    seconds: value * 1e3,
    minutes: value * 1e3 * 60,
    hours: value * 1e3 * 60 * 60,
    days: value * 1e3 * 60 * 60 * 24,
    weeks: value * 1e3 * 60 * 60 * 24 * 7
  }[unit];
  if (intervalInMs <= 0) {
    return addIntervalToDate(baseDate, value, unit);
  }
  const timeSinceBase = now.getTime() - baseDate.getTime();
  const intervalsPassed = Math.floor(timeSinceBase / intervalInMs);
  const intervalsToNext = intervalsPassed + 1;
  const nextRefillTime = baseDate.getTime() + intervalsToNext * intervalInMs;
  return new Date(nextRefillTime);
}
const AutoRefillSettings = ({
  lastRefill,
  refillAmount,
  refillIntervalUnit,
  refillIntervalValue
}) => {
  const localize = useLocalize();
  const lastRefillDate = lastRefill ? new Date(lastRefill) : null;
  const nextRefill = lastRefillDate ? getNextFutureInterval(lastRefillDate, refillIntervalValue, refillIntervalUnit) : null;
  const getLocalizedIntervalUnit = (value, unit) => {
    let key;
    switch (unit) {
      case "seconds":
        key = value === 1 ? "com_nav_balance_second" : "com_nav_balance_seconds";
        break;
      case "minutes":
        key = value === 1 ? "com_nav_balance_minute" : "com_nav_balance_minutes";
        break;
      case "hours":
        key = value === 1 ? "com_nav_balance_hour" : "com_nav_balance_hours";
        break;
      case "days":
        key = value === 1 ? "com_nav_balance_day" : "com_nav_balance_days";
        break;
      case "weeks":
        key = value === 1 ? "com_nav_balance_week" : "com_nav_balance_weeks";
        break;
      case "months":
        key = value === 1 ? "com_nav_balance_month" : "com_nav_balance_months";
        break;
      default:
        key = "com_nav_balance_seconds";
    }
    return localize(key);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-medium", children: localize("com_nav_balance_auto_refill_settings") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
      lineNumber: 146,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-1 flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_nav_balance_last_refill") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 148,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: lastRefillDate ? lastRefillDate.toLocaleString() : "-" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 149,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
      lineNumber: 147,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-1 flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_nav_balance_refill_amount") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: refillAmount !== void 0 ? refillAmount : "-" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 153,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mb-1 flex justify-between text-sm", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_nav_balance_interval") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
        localize("com_nav_balance_every"),
        " ",
        refillIntervalValue,
        " ",
        getLocalizedIntervalUnit(refillIntervalValue, refillIntervalUnit)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
      lineNumber: 155,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "font-light", children: localize("com_nav_balance_next_refill") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
          lineNumber: 165,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InfoHoverCard, { side: ESide.Bottom, text: localize("com_nav_balance_next_refill_info") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 164,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium text-gray-800 dark:text-gray-200", role: "note", children: nextRefill ? nextRefill.toLocaleString() : "-" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
      lineNumber: 162,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/AutoRefillSettings.tsx",
    lineNumber: 145,
    columnNumber: 5
  }, void 0);
};
const TokenCreditsItem = ({ tokenCredits }) => {
  const localize = useLocalize();
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "font-light", children: localize("com_nav_balance") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/TokenCreditsItem.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InfoHoverCard, { side: ESide.Bottom, text: localize("com_nav_info_balance") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/TokenCreditsItem.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/TokenCreditsItem.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "text-sm font-medium text-gray-800 dark:text-gray-200", role: "note", children: tokenCredits !== void 0 ? tokenCredits.toFixed(2) : "0.00" }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/TokenCreditsItem.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/TokenCreditsItem.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, void 0);
};
function Balance() {
  const localize = useLocalize();
  const { isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && !!startupConfig?.balance?.enabled
  });
  const balanceData = balanceQuery.data;
  const {
    tokenCredits = 0,
    autoRefillEnabled = false,
    lastRefill,
    refillAmount,
    refillIntervalUnit,
    refillIntervalValue
  } = balanceData ?? {};
  const hasValidRefillSettings = lastRefill !== void 0 && refillAmount !== void 0 && refillIntervalUnit !== void 0 && refillIntervalValue !== void 0;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-4 p-4 text-sm text-text-primary", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TokenCreditsItem, { tokenCredits }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/Balance.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    autoRefillEnabled ? hasValidRefillSettings ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      AutoRefillSettings,
      {
        lastRefill,
        refillAmount,
        refillIntervalUnit,
        refillIntervalValue
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/Balance.tsx",
        lineNumber: 42,
        columnNumber: 11
      },
      this
    ) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-red-600", children: localize("com_nav_balance_auto_refill_error") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/Balance.tsx",
      lineNumber: 49,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-gray-600", children: localize("com_nav_balance_auto_refill_disabled") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/Balance.tsx",
      lineNumber: 54,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Balance/Balance.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}
const Balance$1 = React.memo(Balance);
const { promptsEditorMode, alwaysMakeProd } = store;
function AdvancedPrompts() {
  const localize = useLocalize();
  const [mode, setMode] = Recoil_index_22(promptsEditorMode);
  const setAlwaysMakeProd = Recoil_index_24(alwaysMakeProd);
  const isAdvanced = mode === PromptsEditorMode.ADVANCED;
  const handleChange = reactExports.useCallback(
    (checked) => {
      if (!checked) {
        setAlwaysMakeProd(true);
      }
      setMode(checked ? PromptsEditorMode.ADVANCED : PromptsEditorMode.SIMPLE);
    },
    [setMode, setAlwaysMakeProd]
  );
  const rootId = reactExports.useId();
  const labelId = `${rootId}-label`;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_advanced_prompts") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/AdvancedPrompts.tsx",
        lineNumber: 33,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InfoHoverCard, { side: ESide.Bottom, text: localize("com_nav_advanced_prompts_desc") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/AdvancedPrompts.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/AdvancedPrompts.tsx",
      lineNumber: 32,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Switch,
      {
        id: rootId,
        checked: isAdvanced,
        onCheckedChange: handleChange,
        className: "ml-4",
        "data-testid": "advancedPrompts",
        "aria-labelledby": labelId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/AdvancedPrompts.tsx",
        lineNumber: 36,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/AdvancedPrompts.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
const ChatDirection = () => {
  const [direction, setDirection] = Recoil_index_22(store.chatDirection);
  const localize = useLocalize();
  const toggleChatDirection = () => {
    setDirection((prev) => prev === "LTR" ? "RTL" : "LTR");
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { id: "chat-direction-label", children: localize("com_nav_chat_direction") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ChatDirection.tsx",
      lineNumber: 18,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ChatDirection.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: "outline",
        "aria-label": localize("com_nav_chat_direction_selected", {
          direction: direction === "LTR" ? localize("chat_direction_left_to_right") : localize("chat_direction_right_to_left")
        }),
        onClick: toggleChatDirection,
        "data-testid": "chatDirection",
        children: direction.toLowerCase()
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ChatDirection.tsx",
        lineNumber: 20,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ChatDirection.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, void 0);
};
function FontSizeSelector() {
  const localize = useLocalize();
  const [fontSize, setFontSize] = useAtom(fontSizeAtom);
  const handleChange = (val) => {
    setFontSize(val);
  };
  const options = [
    { value: "text-xs", label: localize("com_nav_font_size_xs") },
    { value: "text-sm", label: localize("com_nav_font_size_sm") },
    { value: "text-base", label: localize("com_nav_font_size_base") },
    { value: "text-lg", label: localize("com_nav_font_size_lg") },
    { value: "text-xl", label: localize("com_nav_font_size_xl") }
  ];
  const labelId = "font-size-selector-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex w-full items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_font_size") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/FontSizeSelector.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: fontSize,
        options,
        onChange: handleChange,
        testId: "font-size-selector",
        sizeClasses: "w-[150px]",
        className: "z-50",
        "aria-labelledby": labelId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/FontSizeSelector.tsx",
        lineNumber: 27,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/FontSizeSelector.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
const ForkSettings = () => {
  const localize = useLocalize();
  const [forkSetting, setForkSetting] = Recoil_index_22(store.forkSetting);
  const [splitAtTarget, setSplitAtTarget] = Recoil_index_22(store.splitAtTarget);
  const [remember, setRemember] = Recoil_index_22(store.rememberDefaultFork);
  const forkOptions = [
    { value: fi.DIRECT_PATH, label: localize("com_ui_fork_visible") },
    {
      value: fi.INCLUDE_BRANCHES,
      label: localize("com_ui_fork_branches")
    },
    {
      value: fi.TARGET_LEVEL,
      label: localize("com_ui_fork_all_target")
    }
  ];
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "remember-default-fork-label", children: [
        " ",
        localize("com_ui_fork_default"),
        " "
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Switch,
        {
          id: "rememberDefaultFork",
          checked: remember,
          onCheckedChange: setRemember,
          className: "ml-4",
          "data-testid": "rememberDefaultFork",
          "aria-labelledby": "remember-default-fork-label"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
          lineNumber: 30,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 28,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 27,
      columnNumber: 7
    }, void 0),
    remember && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "fork-change-default-label", children: localize("com_ui_fork_change_default") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
          lineNumber: 44,
          columnNumber: 15
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          InfoHoverCard,
          {
            side: ESide.Bottom,
            text: localize("com_nav_info_fork_change_default")
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
            lineNumber: 45,
            columnNumber: 15
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
        lineNumber: 43,
        columnNumber: 13
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Dropdown,
        {
          value: forkSetting,
          onChange: setForkSetting,
          options: forkOptions,
          sizeClasses: "w-[200px]",
          testId: "fork-setting-dropdown",
          className: "z-[50]",
          "aria-labelledby": "fork-change-default-label"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
          lineNumber: 50,
          columnNumber: 13
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 42,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 41,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "split-at-target-label", children: localize("com_ui_fork_split_target_setting") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          InfoHoverCard,
          {
            side: ESide.Bottom,
            text: localize("com_nav_info_fork_split_target_setting")
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
            lineNumber: 66,
            columnNumber: 13
          },
          void 0
        )
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Switch,
        {
          id: "splitAtTarget",
          checked: splitAtTarget,
          onCheckedChange: setSplitAtTarget,
          className: "ml-4",
          "data-testid": "splitAtTarget",
          "aria-labelledby": "split-at-target-label"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
          lineNumber: 71,
          columnNumber: 11
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
      lineNumber: 62,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/ForkSettings.tsx",
    lineNumber: 26,
    columnNumber: 5
  }, void 0);
};
const toggleSwitchConfigs = [
  {
    stateAtom: store.alwaysMakeProd,
    localizationKey: "com_nav_always_make_prod",
    switchId: "alwaysMakeProd",
    hoverCardText: void 0,
    key: "alwaysMakeProd"
  },
  {
    stateAtom: store.autoSendPrompts,
    localizationKey: "com_nav_auto_send_prompts",
    switchId: "autoSendPrompts",
    hoverCardText: "com_nav_auto_send_prompts_desc",
    key: "autoSendPrompts"
  },
  {
    stateAtom: store.enterToSend,
    localizationKey: "com_nav_enter_to_send",
    switchId: "enterToSend",
    hoverCardText: "com_nav_info_enter_to_send",
    key: "enterToSend"
  },
  {
    stateAtom: store.maximizeChatSpace,
    localizationKey: "com_nav_maximize_chat_space",
    switchId: "maximizeChatSpace",
    hoverCardText: void 0,
    key: "maximizeChatSpace"
  },
  {
    stateAtom: store.centerFormOnLanding,
    localizationKey: "com_nav_center_chat_input",
    switchId: "centerFormOnLanding",
    hoverCardText: void 0,
    key: "centerFormOnLanding"
  },
  {
    stateAtom: showThinkingAtom,
    localizationKey: "com_nav_show_thinking",
    switchId: "showThinking",
    hoverCardText: void 0,
    key: "showThinking"
  },
  {
    stateAtom: store.autoExpandTools,
    localizationKey: "com_nav_auto_expand_tools",
    switchId: "autoExpandTools",
    hoverCardText: void 0,
    key: "autoExpandTools"
  },
  {
    stateAtom: store.LaTeXParsing,
    localizationKey: "com_nav_latex_parsing",
    switchId: "latexParsing",
    hoverCardText: "com_nav_info_latex_parsing",
    key: "latexParsing"
  },
  {
    stateAtom: store.saveDrafts,
    localizationKey: "com_nav_save_drafts",
    switchId: "saveDrafts",
    hoverCardText: "com_nav_info_save_draft",
    key: "saveDrafts"
  },
  {
    stateAtom: store.showScrollButton,
    localizationKey: "com_nav_scroll_button",
    switchId: "showScrollButton",
    hoverCardText: void 0,
    key: "showScrollButton"
  },
  {
    stateAtom: store.saveBadgesState,
    localizationKey: "com_nav_save_badges_state",
    switchId: "showBadges",
    hoverCardText: "com_nav_info_save_badges_state",
    key: "showBadges"
  },
  {
    stateAtom: store.modularChat,
    localizationKey: "com_nav_modular_chat",
    switchId: "modularChat",
    hoverCardText: void 0,
    key: "modularChat"
  },
  {
    stateAtom: store.defaultTemporaryChat,
    localizationKey: "com_nav_default_temporary_chat",
    switchId: "defaultTemporaryChat",
    hoverCardText: "com_nav_info_default_temporary_chat",
    key: "defaultTemporaryChat"
  }
];
function Chat() {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 p-1 text-sm text-text-primary", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FontSizeSelector, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 108,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 107,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ChatDirection, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 111,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    toggleSwitchConfigs.map((config) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      ToggleSwitch,
      {
        stateAtom: config.stateAtom,
        localizationKey: config.localizationKey,
        hoverCardText: config.hoverCardText,
        switchId: config.switchId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
        lineNumber: 115,
        columnNumber: 11
      },
      this
    ) }, config.key, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this)),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AdvancedPrompts, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 124,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 123,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ForkSettings, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
      lineNumber: 126,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Chat/Chat.tsx",
    lineNumber: 106,
    columnNumber: 5
  }, this);
}
const Chat$1 = reactExports.memo(Chat);
const commandSwitchConfigs = [
  {
    stateAtom: store.atCommand,
    localizationKey: "com_nav_at_command_description",
    switchId: "atCommand",
    key: "atCommand",
    permissionType: void 0
  },
  {
    stateAtom: store.plusCommand,
    localizationKey: "com_nav_plus_command_description",
    switchId: "plusCommand",
    key: "plusCommand",
    permissionType: ws.MULTI_CONVO
  },
  {
    stateAtom: store.slashCommand,
    localizationKey: "com_nav_slash_command_description",
    switchId: "slashCommand",
    key: "slashCommand",
    permissionType: ws.PROMPTS
  }
];
function Commands() {
  const localize = useLocalize();
  const hasAccessToPrompts = useHasAccess({
    permissionType: ws.PROMPTS,
    permission: Os.USE
  });
  const hasAccessToMultiConvo = useHasAccess({
    permissionType: ws.MULTI_CONVO,
    permission: Os.USE
  });
  const getShowSwitch = (permissionType) => {
    if (!permissionType) {
      return true;
    }
    if (permissionType === ws.MULTI_CONVO) {
      return hasAccessToMultiConvo === true;
    }
    if (permissionType === ws.PROMPTS) {
      return hasAccessToPrompts === true;
    }
    return true;
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4 p-1", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h3", { className: "text-lg font-medium text-text-primary", children: localize("com_nav_chat_commands") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(InfoHoverCard, { side: ESide.Bottom, text: localize("com_nav_chat_commands_info") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
        lineNumber: 64,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 text-sm text-text-primary", children: commandSwitchConfigs.map((config) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      ToggleSwitch,
      {
        stateAtom: config.stateAtom,
        localizationKey: config.localizationKey,
        switchId: config.switchId,
        showSwitch: getShowSwitch(config.permissionType)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
        lineNumber: 69,
        columnNumber: 13
      },
      this
    ) }, config.key, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
      lineNumber: 68,
      columnNumber: 11
    }, this)) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Commands/Commands.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
const Commands$1 = reactExports.memo(Commands);
function CreateKeyDialog({ onKeyCreated }) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [open, setOpen] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [newKey, setNewKey] = reactExports.useState(null);
  const [showKey, setShowKey] = reactExports.useState(false);
  const [isCopying, setIsCopying] = reactExports.useState(false);
  const createMutation = li();
  const copyKey = useCopyToClipboard({ text: newKey || "" });
  const handleCreate = async () => {
    if (!name.trim()) {
      showToast({
        message: localize("com_ui_api_key_name_required"),
        status: "error"
      });
      return;
    }
    try {
      const result = await createMutation.mutateAsync({ name: name.trim() });
      setNewKey(result.key);
      showToast({
        message: localize("com_ui_api_key_created"),
        status: "success"
      });
      onKeyCreated?.();
    } catch {
      showToast({
        message: localize("com_ui_api_key_create_error"),
        status: "error"
      });
    }
  };
  const handleClose = () => {
    setName("");
    setNewKey(null);
    setShowKey(false);
    setOpen(false);
  };
  const handleCopy = () => {
    if (isCopying) {
      return;
    }
    copyKey(setIsCopying);
    showToast({
      message: localize("com_ui_api_key_copied"),
      status: "success"
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", className: "gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Plus, { className: "h-4 w-4" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      localize("com_ui_create_api_key")
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 84,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { children: localize("com_ui_create_api_key") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4 py-4", children: !newKey ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "key-name", children: localize("com_ui_api_key_name") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 95,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Input,
            {
              id: "key-name",
              value: name,
              onChange: (e) => setName(e.target.value),
              placeholder: localize("com_ui_api_key_name_placeholder")
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
              lineNumber: 96,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 94,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", onClick: handleClose, children: localize("com_ui_cancel") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 105,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 104,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: handleCreate, disabled: createMutation.isLoading, children: createMutation.isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "h-4 w-4" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 111,
            columnNumber: 21
          }, this) : localize("com_ui_create") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 109,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 103,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 93,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-lg border border-yellow-500/50 bg-yellow-50 p-4 dark:bg-yellow-900/20", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-yellow-800 dark:text-yellow-200", children: localize("com_ui_api_key_warning") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 121,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 120,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { children: localize("com_ui_your_api_key") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 126,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Input,
              {
                value: showKey ? newKey : "•".repeat(newKey.length),
                readOnly: true,
                className: "font-mono text-sm"
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                lineNumber: 128,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: () => setShowKey(!showKey),
                title: showKey ? localize("com_ui_hide") : localize("com_ui_show"),
                children: showKey ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EyeOff, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                  lineNumber: 139,
                  columnNumber: 32
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Eye, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                  lineNumber: 139,
                  columnNumber: 65
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                lineNumber: 133,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Button,
              {
                variant: "outline",
                size: "icon",
                onClick: handleCopy,
                disabled: isCopying,
                title: localize("com_ui_copy"),
                children: isCopying ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CopyCheck, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                  lineNumber: 148,
                  columnNumber: 34
                }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Copy, { className: "h-4 w-4" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                  lineNumber: 148,
                  columnNumber: 70
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                lineNumber: 141,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 127,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 125,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { onClick: handleClose, children: localize("com_ui_done") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 153,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 152,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
    lineNumber: 82,
    columnNumber: 5
  }, this);
}
function KeyItem({
  id,
  name,
  keyPrefix,
  createdAt,
  lastUsedAt
}) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const deleteMutation = ui();
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      showToast({
        message: localize("com_ui_api_key_deleted"),
        status: "success"
      });
    } catch {
      showToast({
        message: localize("com_ui_api_key_delete_error"),
        status: "error"
      });
    }
    setConfirmDelete(false);
  };
  const formatDate2 = (dateStr) => {
    return new Date(dateStr).toLocaleDateString(void 0, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between rounded-lg border border-border-light p-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Key, { className: "h-5 w-5 text-text-secondary" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 208,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "font-medium", children: name }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 210,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-text-secondary", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "font-mono", children: [
            keyPrefix,
            "..."
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 212,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mx-2", children: "•" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 213,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
            localize("com_ui_created"),
            " ",
            formatDate2(createdAt)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 214,
            columnNumber: 13
          }, this),
          lastUsedAt && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "mx-2", children: "•" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
              lineNumber: 219,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: [
              localize("com_ui_last_used"),
              " ",
              formatDate2(lastUsedAt)
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
              lineNumber: 220,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 218,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 211,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 209,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 207,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: confirmDelete ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => setConfirmDelete(false), children: localize("com_ui_cancel") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 231,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          variant: "destructive",
          size: "sm",
          onClick: handleDelete,
          disabled: deleteMutation.isLoading,
          children: deleteMutation.isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "h-4 w-4" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
            lineNumber: 241,
            columnNumber: 17
          }, this) : localize("com_ui_delete")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 234,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 230,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: "ghost",
        size: "icon",
        onClick: () => setConfirmDelete(true),
        title: localize("com_ui_delete"),
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash2, { className: "h-4 w-4 text-text-secondary hover:text-red-500" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 248,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 228,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
    lineNumber: 206,
    columnNumber: 5
  }, this);
}
function ApiKeysContent({ isOpen }) {
  const localize = useLocalize();
  const { data, isLoading, error } = si({
    enabled: isOpen
  });
  if (error) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-sm text-red-500", children: localize("com_ui_api_keys_load_error") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 269,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-end gap-2", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RemoteAgentsAdminSettings, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 275,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CreateKeyDialog, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 276,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 274,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-h-[400px] space-y-2 overflow-y-auto", children: [
      isLoading && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "h-6 w-6" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 282,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 281,
        columnNumber: 11
      }, this),
      !isLoading && data?.keys && data.keys.length > 0 && data.keys.map((key) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        KeyItem,
        {
          id: key.id,
          name: key.name,
          keyPrefix: key.keyPrefix,
          createdAt: key.createdAt,
          lastUsedAt: key.lastUsedAt
        },
        key.id,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 289,
          columnNumber: 13
        },
        this
      )),
      !isLoading && (!data?.keys || data.keys.length === 0) && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "rounded-lg border-2 border-dashed border-border-light p-8 text-center", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Key, { className: "mx-auto h-8 w-8 text-text-secondary" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 300,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "mt-2 text-sm text-text-secondary", children: localize("com_ui_no_api_keys") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 301,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 299,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 279,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
    lineNumber: 273,
    columnNumber: 5
  }, this);
}
const remoteAgentsPermissions = [
  { permission: Os.USE, labelKey: "com_ui_remote_agents_allow_use" },
  {
    permission: Os.CREATE,
    labelKey: "com_ui_remote_agents_allow_create"
  },
  {
    permission: Os.SHARE,
    labelKey: "com_ui_remote_agents_allow_share"
  },
  {
    permission: Os.SHARE_PUBLIC,
    labelKey: "com_ui_remote_agents_allow_share_public"
  }
];
function RemoteAgentsAdminSettings() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const mutation = useUpdateRemoteAgentsPermissionsMutation({
    onSuccess: () => {
      showToast({ status: "success", message: localize("com_ui_saved") });
    },
    onError: () => {
      showToast({
        status: "error",
        message: localize("com_ui_error_save_admin_settings")
      });
    }
  });
  const trigger = /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-8 w-8",
      "aria-label": localize("com_ui_admin_settings"),
      children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ShieldEllipsis, { className: "h-5 w-5", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 348,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 342,
      columnNumber: 5
    },
    this
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    AdminSettingsDialog,
    {
      permissionType: ws.REMOTE_AGENTS,
      sectionKey: "com_ui_remote_agents",
      permissions: remoteAgentsPermissions,
      menuId: "remote-agents-role-dropdown",
      mutation,
      trigger
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 353,
      columnNumber: 5
    },
    this
  );
}
function AgentApiKeys() {
  const localize = useLocalize();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "api-keys-label", children: localize("com_ui_agent_api_keys") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 370,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { "aria-labelledby": "api-keys-label", variant: "outline", children: localize("com_ui_manage") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 374,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
        lineNumber: 373,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        DialogContent,
        {
          title: localize("com_ui_agent_api_keys"),
          className: "w-11/12 max-w-2xl bg-background text-text-primary shadow-2xl",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { children: localize("com_ui_agent_api_keys") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                lineNumber: 384,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("p", { className: "text-sm text-text-secondary", children: localize("com_ui_agent_api_keys_description") }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
                lineNumber: 385,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
              lineNumber: 383,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ApiKeysContent, { isOpen }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
              lineNumber: 389,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
          lineNumber: 379,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
      lineNumber: 372,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/AgentApiKeys.tsx",
    lineNumber: 369,
    columnNumber: 5
  }, this);
}
const ClearChats = () => {
  const localize = useLocalize();
  const [open, setOpen] = reactExports.useState(false);
  const { newConversation } = useNewConvo();
  const clearConvosMutation = jo();
  const clearConvos = () => {
    clearConvosMutation.mutate(
      {},
      {
        onSuccess: () => {
          clearAllConversationStorage();
          newConversation();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "clear-all-chats-label", children: localize("com_nav_clear_all_chats") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          "aria-labelledby": "clear-all-chats-label",
          variant: "destructive",
          onClick: () => setOpen(true),
          children: localize("com_ui_delete")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
          lineNumber: 37,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
        lineNumber: 36,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        OGDialogTemplate,
        {
          showCloseButton: false,
          title: localize("com_nav_confirm_clear"),
          className: "max-w-[450px]",
          main: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "break-words", children: localize("com_nav_clear_conversation_confirm_message") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
            lineNumber: 50,
            columnNumber: 13
          }, void 0),
          selection: {
            selectHandler: clearConvos,
            selectClasses: "bg-destructive text-white transition-all duration-200 hover:bg-destructive/80",
            selectText: clearConvosMutation.isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, {}, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
              lineNumber: 58,
              columnNumber: 57
            }, void 0) : localize("com_ui_delete")
          }
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
          lineNumber: 45,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
      lineNumber: 35,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ClearChats.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, void 0);
};
const DeleteCache = ({ disabled = false }) => {
  const localize = useLocalize();
  const [open, setOpen] = reactExports.useState(false);
  const [isCacheEmpty, setIsCacheEmpty] = reactExports.useState(true);
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const contentRef = reactExports.useRef(null);
  useOnClickOutside(contentRef, () => confirmClear && setConfirmClear(false), []);
  const checkCache = reactExports.useCallback(async () => {
    const cache = await caches.open("tts-responses");
    const keys = await cache.keys();
    setIsCacheEmpty(keys.length === 0);
  }, []);
  reactExports.useEffect(() => {
    checkCache();
  }, [checkCache]);
  const revokeAllUserKeys = reactExports.useCallback(async () => {
    setIsLoading(true);
    const cache = await caches.open("tts-responses");
    await cache.keys().then((keys) => Promise.all(keys.map((key) => cache.delete(key))));
    setIsLoading(false);
  }, []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "delete-cache-label", children: localize("com_nav_delete_cache_storage") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
      lineNumber: 41,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          variant: "destructive",
          onClick: () => setOpen(true),
          disabled: disabled || isCacheEmpty,
          "aria-labelledby": "delete-cache-label",
          children: localize("com_ui_delete")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
          lineNumber: 44,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        OGDialogTemplate,
        {
          showCloseButton: false,
          title: localize("com_nav_confirm_clear"),
          className: "max-w-[450px]",
          main: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-left text-sm font-medium", children: localize("com_nav_clear_cache_confirm_message") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
            lineNumber: 58,
            columnNumber: 13
          }, void 0),
          selection: {
            selectHandler: revokeAllUserKeys,
            selectClasses: "bg-destructive text-white transition-all duration-200 hover:bg-destructive/80",
            selectText: isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, {}, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
              lineNumber: 66,
              columnNumber: 37
            }, void 0) : localize("com_ui_delete")
          }
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
          lineNumber: 53,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/DeleteCache.tsx",
    lineNumber: 40,
    columnNumber: 5
  }, void 0);
};
function ImportConversations() {
  const localize = useLocalize();
  const queryClient = useQueryClient();
  const { showToast } = useToastContext();
  const fileInputRef = reactExports.useRef(null);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const handleSuccess = reactExports.useCallback(() => {
    showToast({
      message: localize("com_ui_import_conversation_success"),
      status: NotificationSeverity.SUCCESS
    });
    setIsUploading(false);
  }, [localize, showToast]);
  const handleError = reactExports.useCallback(
    (error) => {
      logger.error("Import error:", error);
      setIsUploading(false);
      const isUnsupportedType = error?.toString().includes("Unsupported import type");
      showToast({
        message: localize(
          isUnsupportedType ? "com_ui_import_conversation_file_type_error" : "com_ui_import_conversation_error"
        ),
        status: NotificationSeverity.ERROR
      });
    },
    [localize, showToast]
  );
  const uploadFile = useUploadConversationsMutation({
    onSuccess: handleSuccess,
    onError: handleError,
    onMutate: () => setIsUploading(true)
  });
  const handleFileUpload = reactExports.useCallback(
    async (file) => {
      try {
        const startupConfig = queryClient.getQueryData(startupConfigKey(true));
        const maxFileSize = startupConfig?.conversationImportMaxFileSize;
        if (maxFileSize && file.size > maxFileSize) {
          const size = (maxFileSize / (1024 * 1024)).toFixed(2);
          showToast({
            message: localize("com_error_files_upload_too_large", { 0: size }),
            status: NotificationSeverity.ERROR
          });
          setIsUploading(false);
          return;
        }
        const formData = new FormData();
        formData.append("file", file, encodeURIComponent(file.name || "File"));
        uploadFile.mutate(formData);
      } catch (error) {
        logger.error("File processing error:", error);
        setIsUploading(false);
        showToast({
          message: localize("com_ui_import_conversation_upload_error"),
          status: NotificationSeverity.ERROR
        });
      }
    },
    [uploadFile, showToast, localize, queryClient]
  );
  const handleFileChange = reactExports.useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        setIsUploading(true);
        handleFileUpload(file);
      }
      event.target.value = "";
    },
    [handleFileUpload]
  );
  const handleImportClick = reactExports.useCallback(() => {
    fileInputRef.current?.click();
  }, []);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleImportClick();
      }
    },
    [handleImportClick]
  );
  const isImportDisabled = isUploading;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "import-conversation-label", children: localize("com_ui_import_conversation_info") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
      lineNumber: 111,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Button,
      {
        variant: "outline",
        onClick: handleImportClick,
        onKeyDown: handleKeyDown,
        disabled: isImportDisabled,
        "aria-label": localize("com_ui_import"),
        "aria-labelledby": "import-conversation-label",
        children: isUploading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, { className: "mr-1 w-4" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
            lineNumber: 122,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_ui_importing") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
            lineNumber: 123,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this) : /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Import, { className: "mr-1 flex h-4 w-4 items-center stroke-1", "aria-hidden": "true" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
            lineNumber: 127,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { children: localize("com_ui_import") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
            lineNumber: 128,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
          lineNumber: 126,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
        lineNumber: 112,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        className: cn("hidden"),
        accept: ".json",
        onChange: handleFileChange,
        "aria-hidden": "true"
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
        lineNumber: 132,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/ImportConversations.tsx",
    lineNumber: 110,
    columnNumber: 5
  }, this);
}
const RevokeKeys = ({
  disabled = false,
  setDialogOpen
}) => {
  const localize = useLocalize();
  const [open, setOpen] = reactExports.useState(false);
  const revokeKeysMutation = Go();
  const handleSuccess = () => {
    if (!setDialogOpen) {
      return;
    }
    setDialogOpen(false);
  };
  const onClick = () => {
    revokeKeysMutation.mutate({}, { onSuccess: handleSuccess });
  };
  const isLoading = revokeKeysMutation.isLoading;
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "revoke-info-label", children: localize("com_ui_revoke_info") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open, onOpenChange: setOpen, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Button,
        {
          variant: "destructive",
          onClick: () => setOpen(true),
          disabled,
          "aria-labelledby": "revoke-info-label",
          children: localize("com_ui_revoke")
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
          lineNumber: 44,
          columnNumber: 11
        },
        void 0
      ) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
        lineNumber: 43,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        OGDialogTemplate,
        {
          showCloseButton: false,
          title: localize("com_ui_revoke_keys"),
          className: "max-w-[450px]",
          main: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "text-left text-sm font-medium", children: localize("com_ui_revoke_keys_confirm") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
            lineNumber: 58,
            columnNumber: 13
          }, void 0),
          selection: {
            selectHandler: onClick,
            selectClasses: "bg-destructive text-white transition-all duration-200 hover:bg-destructive/80",
            selectText: isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, {}, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
              lineNumber: 66,
              columnNumber: 37
            }, void 0) : localize("com_ui_revoke")
          }
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
          lineNumber: 53,
          columnNumber: 9
        },
        void 0
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
      lineNumber: 42,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/RevokeKeys.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, void 0);
};
const PAGE_SIZE = 25;
const DEFAULT_PARAMS = {
  pageSize: PAGE_SIZE,
  isPublic: true,
  sortBy: "createdAt",
  sortDirection: "desc",
  search: ""
};
function SharedLinks() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const searchStore = Recoil_index_20(store.search);
  const [isDeleteOpen, setIsDeleteOpen] = reactExports.useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const [deleteRow, setDeleteRow] = reactExports.useState(null);
  const [queryParams, setQueryParams] = reactExports.useState(DEFAULT_PARAMS);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isLoading } = useSharedLinksQuery(queryParams, {
    enabled: isOpen,
    staleTime: 0,
    cacheTime: 5 * 60 * 1e3,
    refetchOnWindowFocus: false,
    refetchOnMount: false
  });
  const handleFilterChange = reactExports.useCallback((value) => {
    const encodedValue = encodeURIComponent(value.trim());
    setQueryParams((prev) => ({
      ...prev,
      search: encodedValue
    }));
  }, []);
  const debouncedFilterChange = reactExports.useMemo(
    () => debounce(handleFilterChange, 300),
    [handleFilterChange]
  );
  reactExports.useEffect(() => {
    return () => {
      debouncedFilterChange.cancel();
    };
  }, [debouncedFilterChange]);
  const allLinks = reactExports.useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    return data.pages.flatMap((page) => page.links.filter(Boolean));
  }, [data?.pages]);
  const deleteMutation = useDeleteSharedLinkMutation({
    onSuccess: async () => {
      setIsDeleteOpen(false);
      setDeleteRow(null);
      await refetch();
    }
  });
  const handleDelete = reactExports.useCallback(
    async (selectedRows) => {
      const validRows = selectedRows.filter(
        (row) => typeof row.shareId === "string" && row.shareId.length > 0
      );
      if (validRows.length === 0) {
        showToast({
          message: localize("com_ui_no_valid_items"),
          severity: NotificationSeverity.WARNING
        });
        return;
      }
      try {
        for (const row of validRows) {
          await deleteMutation.mutateAsync({ shareId: row.shareId });
        }
        showToast({
          message: localize(
            validRows.length === 1 ? "com_ui_shared_link_delete_success" : "com_ui_shared_link_bulk_delete_success"
          ),
          severity: NotificationSeverity.SUCCESS
        });
      } catch (error) {
        console.error("Failed to delete shared links:", error);
        showToast({
          message: localize("com_ui_bulk_delete_error"),
          severity: NotificationSeverity.ERROR
        });
      }
    },
    [deleteMutation, showToast, localize]
  );
  const handleFetchNextPage = reactExports.useCallback(async () => {
    if (hasNextPage !== true || isFetchingNextPage) {
      return;
    }
    await fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  const confirmDelete = reactExports.useCallback(() => {
    if (deleteRow) {
      handleDelete([deleteRow]);
    }
    setIsDeleteOpen(false);
  }, [deleteRow, handleDelete]);
  const columns = reactExports.useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => {
          const sortState = column.getIsSorted();
          let SortIcon = ArrowUpDown;
          let ariaSort = "none";
          if (sortState === "desc") {
            SortIcon = ArrowDown;
            ariaSort = "descending";
          } else if (sortState === "asc") {
            SortIcon = ArrowUp;
            ariaSort = "ascending";
          }
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            TooltipAnchor,
            {
              description: localize("com_ui_name_sort"),
              side: "top",
              render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  variant: "ghost",
                  onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                  className: "px-2 py-0 text-xs hover:bg-surface-hover sm:px-2 sm:py-2 sm:text-sm",
                  "aria-sort": ariaSort,
                  "aria-label": localize("com_ui_name_sort"),
                  "aria-current": sortState ? "true" : "false",
                  children: [
                    localize("com_ui_name"),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SortIcon, { className: "ml-2 h-3 w-4 sm:h-4 sm:w-4" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                      lineNumber: 189,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 180,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 176,
              columnNumber: 13
            },
            this
          );
        },
        cell: ({ row }) => {
          const { title, shareId } = row.original;
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            Link,
            {
              to: `/share/${shareId}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "group flex items-center gap-1 truncate rounded-sm text-blue-600 underline decoration-1 underline-offset-2 hover:decoration-2 focus:outline-none focus:ring-2 focus:ring-ring",
              title,
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "truncate", children: title }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 206,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                  ExternalLink,
                  {
                    className: "size-3 flex-shrink-0 opacity-70 group-hover:opacity-100",
                    "aria-hidden": "true"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                    lineNumber: 207,
                    columnNumber: 17
                  },
                  this
                )
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 199,
              columnNumber: 15
            },
            this
          ) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
            lineNumber: 198,
            columnNumber: 13
          }, this);
        },
        meta: {
          size: "32%",
          mobileSize: "50%"
        }
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => {
          const sortState = column.getIsSorted();
          let SortIcon = ArrowUpDown;
          let ariaSort = "none";
          if (sortState === "desc") {
            SortIcon = ArrowDown;
            ariaSort = "descending";
          } else if (sortState === "asc") {
            SortIcon = ArrowUp;
            ariaSort = "ascending";
          }
          return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            TooltipAnchor,
            {
              description: localize("com_ui_date_sort"),
              side: "top",
              render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  variant: "ghost",
                  onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                  className: "px-2 py-0 text-xs hover:bg-surface-hover sm:px-2 sm:py-2 sm:text-sm",
                  "aria-sort": ariaSort,
                  "aria-label": localize("com_ui_date_sort"),
                  "aria-current": sortState ? "true" : "false",
                  children: [
                    localize("com_ui_date"),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SortIcon, { className: "ml-2 h-3 w-4 sm:h-4 sm:w-4" }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                      lineNumber: 247,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 238,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 234,
              columnNumber: 13
            },
            this
          );
        },
        cell: ({ row }) => formatDate(row.original.createdAt?.toString() ?? "", isSmallScreen),
        meta: {
          size: "10%",
          mobileSize: "20%"
        }
      },
      {
        accessorKey: "actions",
        header: () => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { className: "px-2 py-0 text-xs sm:px-2 sm:py-2 sm:text-sm", children: localize("com_assistants_actions") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this),
        meta: {
          size: "7%",
          mobileSize: "25%"
        },
        cell: ({ row }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            TooltipAnchor,
            {
              description: localize("com_ui_open_source_chat_new_tab"),
              render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                "a",
                {
                  href: `/c/${row.original.conversationId}`,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "flex h-8 w-8 items-center justify-center rounded-md p-0 transition-colors hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-ring",
                  "aria-label": localize("com_ui_open_source_chat_new_tab_title", {
                    title: row.original.title || localize("com_ui_untitled")
                  }),
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MessageSquare, { className: "size-4", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                    lineNumber: 284,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 275,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 272,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            TooltipAnchor,
            {
              description: localize("com_ui_delete_shared_link_heading"),
              render: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                Button,
                {
                  variant: "ghost",
                  className: "h-8 w-8 p-0 hover:bg-surface-hover",
                  onClick: () => {
                    setDeleteRow(row.original);
                    setIsDeleteOpen(true);
                  },
                  "aria-label": localize("com_ui_delete_shared_link", {
                    title: row.original.title || localize("com_ui_untitled")
                  }),
                  "aria-haspopup": "dialog",
                  "aria-controls": "delete-shared-link-dialog",
                  children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Trash, { className: "size-4", "aria-hidden": "true" }, void 0, false, {
                    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                    lineNumber: 304,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 291,
                  columnNumber: 17
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 288,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
          lineNumber: 271,
          columnNumber: 11
        }, this)
      }
    ],
    [isSmallScreen, localize]
  );
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { id: "shared-links-label", children: localize("com_nav_shared_links") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
      lineNumber: 317,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTrigger, { asChild: true, onClick: () => setIsOpen(true), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Button, { "aria-labelledby": "shared-links-label", variant: "outline", children: localize("com_ui_manage") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
        lineNumber: 321,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
        lineNumber: 320,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        DialogContent,
        {
          title: localize("com_nav_shared_links"),
          className: "w-11/12 max-w-5xl bg-background text-text-primary shadow-2xl",
          children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogHeader, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DialogTitle, { children: localize("com_nav_shared_links") }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 331,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 330,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              DataTable,
              {
                columns,
                data: allLinks,
                onDelete: handleDelete,
                filterColumn: "title",
                hasNextPage,
                isFetchingNextPage,
                fetchNextPage: handleFetchNextPage,
                showCheckboxes: false,
                onFilterChange: debouncedFilterChange,
                filterValue: queryParams.search,
                isLoading,
                enableSearch: searchStore.enabled === true
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                lineNumber: 333,
                columnNumber: 11
              },
              this
            )
          ]
        },
        void 0,
        true,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
          lineNumber: 326,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
      lineNumber: 319,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Dialog, { open: isDeleteOpen, onOpenChange: setIsDeleteOpen, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      OGDialogTemplate,
      {
        showCloseButton: false,
        title: localize("com_ui_delete_shared_link_heading"),
        className: "max-w-[450px]",
        main: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            id: "delete-shared-link-dialog",
            className: "flex w-full flex-col items-center gap-2",
            children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "grid w-full items-center gap-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Label, { htmlFor: "dialog-confirm-delete", className: "text-left text-sm font-medium", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
              Trans,
              {
                i18nKey: "com_ui_delete_confirm_strong",
                values: { title: deleteRow?.title },
                components: { strong: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("strong", {}, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                  lineNumber: 365,
                  columnNumber: 45
                }, this) }
              },
              void 0,
              false,
              {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
                lineNumber: 362,
                columnNumber: 21
              },
              this
            ) }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 361,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
              lineNumber: 360,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
            lineNumber: 356,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
          lineNumber: 355,
          columnNumber: 13
        }, this),
        selection: {
          selectHandler: confirmDelete,
          selectClasses: `bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-800 text-white ${deleteMutation.isLoading ? "cursor-not-allowed opacity-80" : ""}`,
          selectText: deleteMutation.isLoading ? /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Spinner, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
            lineNumber: 377,
            columnNumber: 52
          }, this) : localize("com_ui_delete")
        }
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
        lineNumber: 350,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
      lineNumber: 349,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/SharedLinks.tsx",
    lineNumber: 316,
    columnNumber: 5
  }, this);
}
function Data() {
  const dataTabRef = reactExports.useRef(null);
  const [confirmClearConvos, setConfirmClearConvos] = reactExports.useState(false);
  useOnClickOutside(dataTabRef, () => confirmClearConvos && setConfirmClearConvos(false), []);
  const hasAccessToApiKeys = useHasAccess({
    permissionType: ws.REMOTE_AGENTS,
    permission: Os.USE
  });
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 p-1 text-sm text-text-primary", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ImportConversations, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 24,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 23,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SharedLinks, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 27,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    hasAccessToApiKeys && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AgentApiKeys, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 31,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 30,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(RevokeKeys, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DeleteCache, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 38,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 37,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ClearChats, {}, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 41,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Data/Data.tsx",
    lineNumber: 22,
    columnNumber: 5
  }, this);
}
const Data$1 = React.memo(Data);
function Personalization({
  hasMemoryOptOut,
  hasAnyPersonalizationFeature
}) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { data: user } = useGetUserQuery();
  const [referenceSavedMemories, setReferenceSavedMemories] = reactExports.useState(true);
  const updateMemoryPreferencesMutation = useUpdateMemoryPreferencesMutation({
    onSuccess: () => {
      showToast({
        message: localize("com_ui_preferences_updated"),
        status: "success"
      });
    },
    onError: () => {
      showToast({
        message: localize("com_ui_error_updating_preferences"),
        status: "error"
      });
      setReferenceSavedMemories((prev) => !prev);
    }
  });
  reactExports.useEffect(() => {
    if (user?.personalization?.memories !== void 0) {
      setReferenceSavedMemories(user.personalization.memories);
    }
  }, [user?.personalization?.memories]);
  const handleMemoryToggle = (checked) => {
    setReferenceSavedMemories(checked);
    updateMemoryPreferencesMutation.mutate({ memories: checked });
  };
  if (!hasAnyPersonalizationFeature) {
    return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 text-sm text-text-primary", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-text-secondary", children: localize("com_ui_no_personalization_available") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
      lineNumber: 52,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
      lineNumber: 51,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 text-sm text-text-primary", children: hasMemoryOptOut && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "border-b border-border-medium pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-base font-semibold", children: localize("com_ui_memory") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
      lineNumber: 63,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
      lineNumber: 62,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "reference-saved-memories-label", className: "flex items-center gap-2", children: localize("com_ui_reference_saved_memories") }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
          lineNumber: 68,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          "div",
          {
            id: "reference-saved-memories-description",
            className: "mt-1 text-xs text-text-secondary",
            children: localize("com_ui_reference_saved_memories_description")
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
            lineNumber: 71,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
        lineNumber: 67,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Switch,
        {
          checked: referenceSavedMemories,
          onCheckedChange: handleMemoryToggle,
          disabled: updateMemoryPreferencesMutation.isLoading,
          "aria-labelledby": "reference-saved-memories-label",
          "aria-describedby": "reference-saved-memories-description"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
          lineNumber: 78,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
      lineNumber: 66,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
    lineNumber: 61,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Personalization.tsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function ConversationModeSwitch({
  onCheckedChange
}) {
  const speechToText = Recoil_index_20(store.speechToText);
  const textToSpeech = Recoil_index_20(store.textToSpeech);
  const [, setAutoSendText] = Recoil_index_22(store.autoSendText);
  const [, setDecibelValue] = Recoil_index_22(store.decibelValue);
  const [, setAutoTranscribeAudio] = Recoil_index_22(store.autoTranscribeAudio);
  const handleCheckedChange = (value) => {
    setAutoTranscribeAudio(value);
    setAutoSendText(3);
    setDecibelValue(-45);
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.conversationMode,
      localizationKey: "com_nav_conversation_mode",
      switchId: "ConversationMode",
      onCheckedChange: handleCheckedChange,
      disabled: !textToSpeech || !speechToText,
      strongLabel: true
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/ConversationModeSwitch.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    this
  );
}
function AutoSendTextSelector() {
  const localize = useLocalize();
  const speechToText = Recoil_index_20(store.speechToText);
  const [autoSendText, setAutoSendText] = Recoil_index_22(store.autoSendText);
  const [isEnabled, setIsEnabled] = reactExports.useState(autoSendText !== -1);
  const [delayValue, setDelayValue] = reactExports.useState(autoSendText === -1 ? 3 : autoSendText);
  reactExports.useEffect(() => {
    setIsEnabled(autoSendText !== -1);
    if (autoSendText !== -1) {
      setDelayValue(autoSendText);
    }
  }, [autoSendText]);
  const handleToggle = (enabled) => {
    setIsEnabled(enabled);
    if (enabled) {
      setAutoSendText(delayValue);
    } else {
      setAutoSendText(-1);
    }
  };
  const handleSliderChange = (value) => {
    const newValue = value[0];
    setDelayValue(newValue);
    if (isEnabled) {
      setAutoSendText(newValue);
    }
  };
  const handleInputChange = (value) => {
    const newValue = value ? value[0] : 3;
    setDelayValue(newValue);
    if (isEnabled) {
      setAutoSendText(newValue);
    }
  };
  const labelId = "auto-send-text-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_auto_send_text") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
        lineNumber: 57,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
        lineNumber: 56,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Switch,
        {
          id: "autoSendTextToggle",
          checked: isEnabled,
          onCheckedChange: handleToggle,
          className: "ml-4",
          "data-testid": "autoSendTextToggle",
          "aria-labelledby": labelId,
          disabled: !speechToText
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
          lineNumber: 59,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    isEnabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "auto-send-delay-label", className: "text-sm text-text-secondary", children: localize("com_nav_setting_delay") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
        lineNumber: 72,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
        lineNumber: 71,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          Slider,
          {
            value: [delayValue],
            onValueChange: handleSliderChange,
            onDoubleClick: () => {
              setDelayValue(3);
              if (isEnabled) {
                setAutoSendText(3);
              }
            },
            min: 0,
            max: 60,
            step: 1,
            className: "ml-4 flex h-4 w-24",
            disabled: !speechToText || !isEnabled,
            "aria-labelledby": "auto-send-delay-label"
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
            lineNumber: 77,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          InputNumber,
          {
            value: `${delayValue} s`,
            disabled: !speechToText || !isEnabled,
            onChange: handleInputChange,
            min: 0,
            max: 60,
            "aria-labelledby": "auto-send-delay-label",
            className: cn(
              defaultTextProps,
              cn(
                optionText,
                "reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200"
              )
            )
          },
          void 0,
          false,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
            lineNumber: 94,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
      lineNumber: 70,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoSendTextSelector.tsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function AutoTranscribeAudioSwitch({
  onCheckedChange
}) {
  const speechToText = Recoil_index_20(store.speechToText);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.autoTranscribeAudio,
      localizationKey: "com_nav_auto_transcribe_audio",
      switchId: "AutoTranscribeAudio",
      onCheckedChange,
      disabled: !speechToText
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/AutoTranscribeAudioSwitch.tsx",
      lineNumber: 13,
      columnNumber: 5
    },
    this
  );
}
function DecibelSelector$1() {
  const localize = useLocalize();
  const speechToText = Recoil_index_20(store.speechToText);
  const [decibelValue, setDecibelValue] = Recoil_index_22(store.decibelValue);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "decibel-selector-label", children: localize("com_nav_db_sensitivity") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("small", { className: "opacity-40", children: [
        "(",
        localize("com_endpoint_default_with_num", { 0: "-45" }),
        ")"
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Slider,
        {
          value: [decibelValue ?? -45],
          onValueChange: (value) => setDecibelValue(value[0]),
          onDoubleClick: () => setDecibelValue(-45),
          min: -100,
          max: -30,
          step: 1,
          className: "ml-4 flex h-4 w-24",
          disabled: !speechToText,
          "aria-labelledby": "decibel-selector-label"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
          lineNumber: 23,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        InputNumber,
        {
          value: decibelValue,
          disabled: !speechToText,
          onChange: (value) => setDecibelValue(value ? value[0] : 0),
          min: -100,
          max: -30,
          "aria-labelledby": "decibel-selector-label",
          className: cn(
            defaultTextProps,
            cn(
              optionText,
              "reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200"
            )
          )
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
          lineNumber: 35,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/DecibelSelector.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
const EngineSTTDropdown = ({ external }) => {
  const localize = useLocalize();
  const [engineSTT, setEngineSTT] = Recoil_index_22(store.engineSTT);
  const endpointOptions = external ? [
    { value: "browser", label: localize("com_nav_browser") },
    { value: "external", label: localize("com_nav_external") }
  ] : [{ value: "browser", label: localize("com_nav_browser") }];
  const handleSelect = (value) => {
    setEngineSTT(value);
  };
  const labelId = "engine-stt-dropdown-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_engine") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/EngineSTTDropdown.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: engineSTT,
        onChange: handleSelect,
        options: endpointOptions,
        sizeClasses: "w-[180px]",
        testId: "EngineSTTDropdown",
        className: "z-50",
        "aria-labelledby": labelId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/EngineSTTDropdown.tsx",
        lineNumber: 31,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/EngineSTTDropdown.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
function LanguageSTTDropdown() {
  const localize = useLocalize();
  const [languageSTT, setLanguageSTT] = Recoil_index_22(store.languageSTT);
  const languageOptions = [
    { value: "af", label: "Afrikaans" },
    { value: "eu", label: "Basque" },
    { value: "bg", label: "Bulgarian" },
    { value: "ca", label: "Catalan" },
    { value: "ar-EG", label: "Arabic (Egypt)" },
    { value: "ar-JO", label: "Arabic (Jordan)" },
    { value: "ar-KW", label: "Arabic (Kuwait)" },
    { value: "ar-LB", label: "Arabic (Lebanon)" },
    { value: "ar-QA", label: "Arabic (Qatar)" },
    { value: "ar-AE", label: "Arabic (UAE)" },
    { value: "ar-MA", label: "Arabic (Morocco)" },
    { value: "ar-IQ", label: "Arabic (Iraq)" },
    { value: "ar-DZ", label: "Arabic (Algeria)" },
    { value: "ar-BH", label: "Arabic (Bahrain)" },
    { value: "ar-LY", label: "Arabic (Libya)" },
    { value: "ar-OM", label: "Arabic (Oman)" },
    { value: "ar-SA", label: "Arabic (Saudi Arabia)" },
    { value: "ar-TN", label: "Arabic (Tunisia)" },
    { value: "ar-YE", label: "Arabic (Yemen)" },
    { value: "cs", label: "Czech" },
    { value: "nl-NL", label: "Dutch" },
    { value: "en-AU", label: "English (Australia)" },
    { value: "en-CA", label: "English (Canada)" },
    { value: "en-IN", label: "English (India)" },
    { value: "en-NZ", label: "English (New Zealand)" },
    { value: "en-ZA", label: "English (South Africa)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "en-US", label: "English (US)" },
    { value: "et-EE", label: "Estonian" },
    { value: "fi", label: "Finnish" },
    { value: "fr-FR", label: "French" },
    { value: "gl", label: "Galician" },
    { value: "de-DE", label: "German" },
    { value: "el-GR", label: "Greek" },
    { value: "he", label: "Hebrew" },
    { value: "hu", label: "Hungarian" },
    { value: "is", label: "Icelandic" },
    { value: "it-IT", label: "Italian" },
    { value: "id", label: "Indonesian" },
    { value: "ja", label: "Japanese" },
    { value: "ko", label: "Korean" },
    { value: "la", label: "Latin" },
    { value: "lv-LV", label: "Latvian" },
    { value: "lt-LT", label: "Lithuanian" },
    { value: "zh-CN", label: "Mandarin Chinese" },
    { value: "zh-TW", label: "Taiwanese" },
    { value: "zh-HK", label: "Cantonese" },
    { value: "ms-MY", label: "Malaysian" },
    { value: "no-NO", label: "Norwegian" },
    { value: "pl", label: "Polish" },
    { value: "xx-piglatin", label: "Pig Latin" },
    { value: "pt-PT", label: "Portuguese" },
    { value: "pt-br", label: "Portuguese (Brasil)" },
    { value: "ro-RO", label: "Romanian" },
    { value: "ru", label: "Russian" },
    { value: "sr-SP", label: "Serbian" },
    { value: "sk", label: "Slovak" },
    { value: "es-AR", label: "Spanish (Argentina)" },
    { value: "es-BO", label: "Spanish (Bolivia)" },
    { value: "es-CL", label: "Spanish (Chile)" },
    { value: "es-CO", label: "Spanish (Colombia)" },
    { value: "es-CR", label: "Spanish (Costa Rica)" },
    { value: "es-DO", label: "Spanish (Dominican Republic)" },
    { value: "es-EC", label: "Spanish (Ecuador)" },
    { value: "es-SV", label: "Spanish (El Salvador)" },
    { value: "es-GT", label: "Spanish (Guatemala)" },
    { value: "es-HN", label: "Spanish (Honduras)" },
    { value: "es-MX", label: "Spanish (Mexico)" },
    { value: "es-NI", label: "Spanish (Nicaragua)" },
    { value: "es-PA", label: "Spanish (Panama)" },
    { value: "es-PY", label: "Spanish (Paraguay)" },
    { value: "es-PE", label: "Spanish (Peru)" },
    { value: "es-PR", label: "Spanish (Puerto Rico)" },
    { value: "es-ES", label: "Spanish (Spain)" },
    { value: "es-US", label: "Spanish (US)" },
    { value: "es-UY", label: "Spanish (Uruguay)" },
    { value: "es-VE", label: "Spanish (Venezuela)" },
    { value: "sv-SE", label: "Swedish" },
    { value: "tr", label: "Turkish" },
    { value: "zu", label: "Zulu" }
  ];
  const handleSelect = (value) => {
    setLanguageSTT(value);
  };
  const labelId = "language-stt-dropdown-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_language") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/LanguageSTTDropdown.tsx",
      lineNumber: 101,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: languageSTT,
        onChange: handleSelect,
        options: languageOptions,
        sizeClasses: "[--anchor-max-height:256px]",
        testId: "LanguageSTTDropdown",
        className: "z-50",
        "aria-labelledby": labelId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/LanguageSTTDropdown.tsx",
        lineNumber: 102,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/LanguageSTTDropdown.tsx",
    lineNumber: 100,
    columnNumber: 5
  }, this);
}
function SpeechToTextSwitch({
  onCheckedChange
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.speechToText,
      localizationKey: "com_nav_speech_to_text",
      switchId: "SpeechToText",
      onCheckedChange,
      strongLabel: true
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/STT/SpeechToTextSwitch.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    this
  );
}
function AutomaticPlaybackSwitch({
  onCheckedChange
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.automaticPlayback,
      localizationKey: "com_nav_automatic_playback",
      switchId: "AutomaticPlayback",
      onCheckedChange
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/AutomaticPlaybackSwitch.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    this
  );
}
function CacheTTSSwitch({
  onCheckedChange
}) {
  const textToSpeech = Recoil_index_20(store.textToSpeech);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.cacheTTS,
      localizationKey: "com_nav_enable_cache_tts",
      switchId: "CacheTTS",
      onCheckedChange,
      disabled: !textToSpeech
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/CacheTTSSwitch.tsx",
      lineNumber: 13,
      columnNumber: 5
    },
    this
  );
}
function CloudBrowserVoicesSwitch({
  onCheckedChange
}) {
  const textToSpeech = Recoil_index_20(store.textToSpeech);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.cloudBrowserVoices,
      localizationKey: "com_nav_enable_cloud_browser_voice",
      switchId: "CloudBrowserVoices",
      onCheckedChange,
      disabled: !textToSpeech
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/CloudBrowserVoicesSwitch.tsx",
      lineNumber: 13,
      columnNumber: 5
    },
    this
  );
}
const EngineTTSDropdown = ({ external }) => {
  const localize = useLocalize();
  const [engineTTS, setEngineTTS] = Recoil_index_22(store.engineTTS);
  const endpointOptions = external ? [
    { value: "browser", label: localize("com_nav_browser") },
    { value: "external", label: localize("com_nav_external") }
  ] : [{ value: "browser", label: localize("com_nav_browser") }];
  const handleSelect = (value) => {
    setEngineTTS(value);
  };
  const labelId = "engine-tts-dropdown-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_engine") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/EngineTTSDropdown.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: engineTTS,
        onChange: handleSelect,
        options: endpointOptions,
        sizeClasses: "w-[180px]",
        testId: "EngineTTSDropdown",
        className: "z-50",
        "aria-labelledby": labelId
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/EngineTTSDropdown.tsx",
        lineNumber: 31,
        columnNumber: 7
      },
      void 0
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/EngineTTSDropdown.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
function DecibelSelector() {
  const localize = useLocalize();
  const textToSpeech = Recoil_index_20(store.textToSpeech);
  const [playbackRate, setPlaybackRate] = Recoil_index_22(store.playbackRate);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: "playback-rate-label", children: localize("com_nav_playback_rate") }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
        lineNumber: 16,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
        lineNumber: 17,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("small", { className: "opacity-40", children: [
        "(",
        localize("com_endpoint_default_with_num", { 0: "1" }),
        ")"
      ] }, void 0, true, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        Slider,
        {
          value: [playbackRate ?? 1],
          onValueChange: (value) => setPlaybackRate(value[0]),
          onDoubleClick: () => setPlaybackRate(null),
          min: 0.1,
          max: 2,
          step: 0.1,
          className: "ml-4 flex h-4 w-24",
          disabled: !textToSpeech,
          "aria-labelledby": "playback-rate-label"
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
          lineNumber: 23,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "w-2" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
        InputNumber,
        {
          value: playbackRate ?? 1,
          disabled: !textToSpeech,
          onChange: (value) => setPlaybackRate(value ? value[0] : 0),
          min: 0.1,
          max: 2,
          "aria-labelledby": "playback-rate-label",
          className: cn(
            defaultTextProps,
            cn(
              optionText,
              "reset-rc-number-input reset-rc-number-input-text-right h-auto w-12 border-0 group-hover/temp:border-gray-200"
            )
          )
        },
        void 0,
        false,
        {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
          lineNumber: 35,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/PlaybackRate.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
function TextToSpeechSwitch({
  onCheckedChange
}) {
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    ToggleSwitch,
    {
      stateAtom: store.textToSpeech,
      localizationKey: "com_nav_text_to_speech",
      switchId: "TextToSpeech",
      onCheckedChange,
      strongLabel: true
    },
    void 0,
    false,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/TextToSpeechSwitch.tsx",
      lineNumber: 10,
      columnNumber: 5
    },
    this
  );
}
function BrowserVoiceDropdown() {
  const localize = useLocalize();
  const { voices = [] } = useTTSBrowser();
  const [voice, setVoice] = Recoil_index_22(store.voice);
  const handleVoiceChange = (newValue) => {
    logger.log("Browser Voice changed:", newValue);
    const newVoice = typeof newValue === "string" ? newValue : newValue?.value;
    if (newVoice != null) {
      return setVoice(newVoice.toString());
    }
  };
  const labelId = "browser-voice-dropdown-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_voice_select") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: voice ?? "",
        options: voices,
        onChange: handleVoiceChange,
        sizeClasses: "min-w-[200px] !max-w-[400px] [--anchor-max-width:400px]",
        testId: "BrowserVoiceDropdown",
        className: "z-50",
        "aria-labelledby": labelId
      },
      `browser-voice-dropdown-${voices.length}`,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
        lineNumber: 27,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}
function ExternalVoiceDropdown() {
  const localize = useLocalize();
  const { voices = [] } = useTTSExternal();
  const [voice, setVoice] = Recoil_index_22(store.voice);
  const handleVoiceChange = (newValue) => {
    logger.log("External Voice changed:", newValue);
    const newVoice = typeof newValue === "string" ? newValue : newValue?.value;
    if (newVoice != null) {
      return setVoice(newVoice.toString());
    }
  };
  const labelId = "external-voice-dropdown-label";
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { id: labelId, children: localize("com_nav_voice_select") }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Dropdown,
      {
        value: voice ?? "",
        options: voices,
        onChange: handleVoiceChange,
        sizeClasses: "min-w-[200px] !max-w-[400px] [--anchor-max-width:400px]",
        testId: "ExternalVoiceDropdown",
        className: "z-50",
        "aria-labelledby": labelId
      },
      `external-voice-dropdown-${voices.length}`,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
        lineNumber: 59,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Audio/Voices.tsx",
    lineNumber: 57,
    columnNumber: 5
  }, this);
}
const voiceDropdownComponentsMap = {
  [TTSEndpoints.browser]: BrowserVoiceDropdown,
  [TTSEndpoints.external]: ExternalVoiceDropdown
};
function VoiceDropdown() {
  const engineTTS = Recoil_index_20(store.engineTTS);
  const VoiceDropdownComponent = voiceDropdownComponentsMap[engineTTS];
  if (!VoiceDropdownComponent) {
    return null;
  }
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VoiceDropdownComponent, {}, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/TTS/VoiceDropdown.tsx",
    lineNumber: 19,
    columnNumber: 10
  }, this);
}
function Speech() {
  const localize = useLocalize();
  const [confirmClear, setConfirmClear] = reactExports.useState(false);
  const { data } = Jo();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [sttExternal, setSttExternal] = reactExports.useState(false);
  const [ttsExternal, setTtsExternal] = reactExports.useState(false);
  const [advancedMode, setAdvancedMode] = Recoil_index_22(store.advancedMode);
  const [autoTranscribeAudio, setAutoTranscribeAudio] = Recoil_index_22(store.autoTranscribeAudio);
  const [conversationMode, setConversationMode] = Recoil_index_22(store.conversationMode);
  const [speechToText, setSpeechToText] = Recoil_index_22(store.speechToText);
  const [textToSpeech, setTextToSpeech] = Recoil_index_22(store.textToSpeech);
  const [cacheTTS, setCacheTTS] = Recoil_index_22(store.cacheTTS);
  const [engineSTT, setEngineSTT] = Recoil_index_22(store.engineSTT);
  const [languageSTT, setLanguageSTT] = Recoil_index_22(store.languageSTT);
  const [decibelValue, setDecibelValue] = Recoil_index_22(store.decibelValue);
  const [autoSendText, setAutoSendText] = Recoil_index_22(store.autoSendText);
  const [engineTTS, setEngineTTS] = Recoil_index_22(store.engineTTS);
  const [voice, setVoice] = Recoil_index_22(store.voice);
  const [cloudBrowserVoices, setCloudBrowserVoices] = Recoil_index_22(
    store.cloudBrowserVoices
  );
  const [languageTTS, setLanguageTTS] = Recoil_index_22(store.languageTTS);
  const [automaticPlayback, setAutomaticPlayback] = Recoil_index_22(store.automaticPlayback);
  const [playbackRate, setPlaybackRate] = Recoil_index_22(store.playbackRate);
  const updateSetting = reactExports.useCallback(
    (key, newValue) => {
      const settings = {
        sttExternal: { value: sttExternal, setFunc: setSttExternal },
        ttsExternal: { value: ttsExternal, setFunc: setTtsExternal },
        conversationMode: {
          value: conversationMode,
          setFunc: setConversationMode
        },
        advancedMode: { value: advancedMode, setFunc: setAdvancedMode },
        speechToText: { value: speechToText, setFunc: setSpeechToText },
        textToSpeech: { value: textToSpeech, setFunc: setTextToSpeech },
        cacheTTS: { value: cacheTTS, setFunc: setCacheTTS },
        engineSTT: { value: engineSTT, setFunc: setEngineSTT },
        languageSTT: { value: languageSTT, setFunc: setLanguageSTT },
        autoTranscribeAudio: {
          value: autoTranscribeAudio,
          setFunc: setAutoTranscribeAudio
        },
        decibelValue: { value: decibelValue, setFunc: setDecibelValue },
        autoSendText: { value: autoSendText, setFunc: setAutoSendText },
        engineTTS: { value: engineTTS, setFunc: setEngineTTS },
        voice: { value: voice, setFunc: setVoice },
        cloudBrowserVoices: {
          value: cloudBrowserVoices,
          setFunc: setCloudBrowserVoices
        },
        languageTTS: { value: languageTTS, setFunc: setLanguageTTS },
        automaticPlayback: {
          value: automaticPlayback,
          setFunc: setAutomaticPlayback
        },
        playbackRate: { value: playbackRate, setFunc: setPlaybackRate }
      };
      const setting = settings[key];
      if (setting) {
        setting.setFunc(newValue);
      }
    },
    [
      sttExternal,
      ttsExternal,
      conversationMode,
      advancedMode,
      speechToText,
      textToSpeech,
      cacheTTS,
      engineSTT,
      languageSTT,
      autoTranscribeAudio,
      decibelValue,
      autoSendText,
      engineTTS,
      voice,
      cloudBrowserVoices,
      languageTTS,
      automaticPlayback,
      playbackRate,
      setSttExternal,
      setTtsExternal,
      setConversationMode,
      setAdvancedMode,
      setSpeechToText,
      setTextToSpeech,
      setCacheTTS,
      setEngineSTT,
      setLanguageSTT,
      setAutoTranscribeAudio,
      setDecibelValue,
      setAutoSendText,
      setEngineTTS,
      setVoice,
      setCloudBrowserVoices,
      setLanguageTTS,
      setAutomaticPlayback,
      setPlaybackRate
    ]
  );
  reactExports.useEffect(() => {
    if (data && data.message !== "not_found") {
      Object.entries(data).forEach(([key, value]) => {
        const existingValue = localStorage.getItem(key);
        if (existingValue === null && key !== "sttExternal" && key !== "ttsExternal") {
          updateSetting(key, value);
        } else if (key === "sttExternal" || key === "ttsExternal") {
          updateSetting(key, value);
        }
      });
    }
  }, [data]);
  reactExports.useEffect(() => {
    const validEngines = ["browser", "external"];
    if (!validEngines.includes(engineTTS)) {
      setEngineTTS("browser");
    }
  }, [engineTTS, setEngineTTS]);
  const contentRef = reactExports.useRef(null);
  useOnClickOutside(contentRef, () => confirmClear && setConfirmClear(false), []);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
    $69cb30bb0017df05$export$be92b6f5f03c0fe9,
    {
      defaultValue: "simple",
      orientation: "horizontal",
      value: advancedMode ? "advanced" : "simple",
      children: [
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "sticky -top-1 z-50 mb-4 bg-white dark:bg-gray-700", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$54c2e3dc7acea9f5, { className: "flex justify-center bg-background", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            $69cb30bb0017df05$export$41fb9f06171c75f4,
            {
              onClick: () => setAdvancedMode(false),
              className: cn(
                "group m-1 flex items-center justify-center gap-2 bg-transparent px-4 py-2 text-sm text-text-secondary transition-all duration-200 ease-in-out radix-state-active:bg-secondary radix-state-active:text-foreground radix-state-active:shadow-lg",
                isSmallScreen ? "flex-row rounded-lg" : "rounded-xl",
                "w-full"
              ),
              value: "simple",
              style: { userSelect: "none" },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lightbulb, { "aria-hidden": "true" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
                  lineNumber: 182,
                  columnNumber: 13
                }, this),
                localize("com_ui_simple")
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
              lineNumber: 172,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            $69cb30bb0017df05$export$41fb9f06171c75f4,
            {
              onClick: () => setAdvancedMode(true),
              className: cn(
                "group m-1 flex items-center justify-center gap-2 bg-transparent px-4 py-2 text-sm text-text-secondary transition-all duration-200 ease-in-out radix-state-active:bg-secondary radix-state-active:text-foreground radix-state-active:shadow-lg",
                isSmallScreen ? "flex-row rounded-lg" : "rounded-xl",
                "w-full"
              ),
              value: "advanced",
              style: { userSelect: "none" },
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Cog, { "aria-hidden": "true" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
                  lineNumber: 195,
                  columnNumber: 13
                }, this),
                localize("com_ui_advanced")
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
              lineNumber: 185,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 171,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 170,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: "simple", tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 text-sm text-text-primary", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SpeechToTextSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 203,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EngineSTTDropdown, { external: sttExternal }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LanguageSTTDropdown, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 205,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-px bg-border-medium", role: "none" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 206,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TextToSpeechSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 207,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EngineTTSDropdown, { external: ttsExternal }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 208,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VoiceDropdown, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 209,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 202,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 201,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: "advanced", tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "flex flex-col gap-3 text-sm text-text-primary", children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ConversationModeSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 215,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "mt-2 h-px bg-border-medium", role: "none" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SpeechToTextSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 217,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EngineSTTDropdown, { external: sttExternal }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 219,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LanguageSTTDropdown, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 221,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AutoTranscribeAudioSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 223,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 222,
            columnNumber: 11
          }, this),
          autoTranscribeAudio && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DecibelSelector$1, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 227,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 226,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AutoSendTextSelector, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 231,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 230,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "h-px bg-border-medium", role: "none" }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 233,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-3", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(TextToSpeechSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 235,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 234,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(AutomaticPlaybackSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 237,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(EngineTTSDropdown, { external: ttsExternal }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 238,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(VoiceDropdown, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 239,
            columnNumber: 11
          }, this),
          engineTTS === "browser" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CloudBrowserVoicesSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 242,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 241,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "pb-2", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DecibelSelector, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 246,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 245,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(CacheTTSSwitch, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
            lineNumber: 248,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 214,
          columnNumber: 9
        }, this) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
          lineNumber: 213,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/SettingsTabs/Speech/Speech.tsx",
      lineNumber: 165,
      columnNumber: 5
    },
    this
  );
}
const Speech$1 = React.memo(Speech);
function Settings({ open, onOpenChange }) {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const { data: startupConfig } = useGetStartupConfig();
  const localize = useLocalize();
  const [activeTab, setActiveTab] = reactExports.useState(ci.GENERAL);
  const tabRefs = reactExports.useRef({});
  const { hasAnyPersonalizationFeature, hasMemoryOptOut } = usePersonalizationAccess();
  const handleKeyDown = (event) => {
    const tabs = [
      ci.GENERAL,
      ci.CHAT,
      ci.COMMANDS,
      ci.SPEECH,
      ...hasAnyPersonalizationFeature ? [ci.PERSONALIZATION] : [],
      ci.DATA,
      ...startupConfig?.balance?.enabled ? [ci.BALANCE] : [],
      ci.ACCOUNT
    ];
    const currentIndex = tabs.indexOf(activeTab);
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveTab(tabs[(currentIndex + 1) % tabs.length]);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveTab(tabs[(currentIndex - 1 + tabs.length) % tabs.length]);
        break;
      case "Home":
        event.preventDefault();
        setActiveTab(tabs[0]);
        break;
      case "End":
        event.preventDefault();
        setActiveTab(tabs[tabs.length - 1]);
        break;
    }
  };
  const settingsTabs = [
    {
      value: ci.GENERAL,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GearIcon, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      label: "com_nav_setting_general"
    },
    {
      value: ci.CHAT,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MessageSquare, { className: "icon-sm", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 84,
        columnNumber: 13
      }, this),
      label: "com_nav_setting_chat"
    },
    {
      value: ci.COMMANDS,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Command, { className: "icon-sm", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 89,
        columnNumber: 13
      }, this),
      label: "com_nav_commands"
    },
    {
      value: ci.SPEECH,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(SpeechIcon, { className: "icon-sm", "aria-hidden": "true" }, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 94,
        columnNumber: 13
      }, this),
      label: "com_nav_setting_speech"
    },
    ...hasAnyPersonalizationFeature ? [
      {
        value: ci.PERSONALIZATION,
        icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(PersonalizationIcon, {}, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
          lineNumber: 101,
          columnNumber: 19
        }, this),
        label: "com_nav_setting_personalization"
      }
    ] : [],
    {
      value: ci.DATA,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DataIcon, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 108,
        columnNumber: 13
      }, this),
      label: "com_nav_setting_data"
    },
    ...startupConfig?.balance?.enabled ? [
      {
        value: ci.BALANCE,
        icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DollarSign, { size: 18 }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
          lineNumber: 115,
          columnNumber: 19
        }, this),
        label: "com_nav_setting_balance"
      }
    ] : [],
    {
      value: ci.ACCOUNT,
      icon: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(UserIcon, {}, void 0, false, {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 126,
        columnNumber: 13
      }, this),
      label: "com_nav_setting_account"
    }
  ];
  const handleTabChange = (value) => {
    setActiveTab(value);
  };
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(ze, { appear: true, show: open, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Lt, { as: "div", className: "relative z-50", onClose: onOpenChange, children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Fe,
      {
        enter: "ease-out duration-200",
        enterFrom: "opacity-0",
        enterTo: "opacity-100",
        leave: "ease-in duration-200",
        leaveFrom: "opacity-100",
        leaveTo: "opacity-0",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "fixed inset-0 bg-black opacity-50 dark:opacity-80", "aria-hidden": "true" }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
          lineNumber: 146,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 138,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Fe,
      {
        enter: "ease-out duration-200",
        enterFrom: "opacity-0 scale-95",
        enterTo: "opacity-100 scale-100",
        leave: "ease-in duration-100",
        leaveFrom: "opacity-100 scale-100",
        leaveTo: "opacity-0 scale-95",
        children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: cn("fixed inset-0 flex w-screen items-center justify-center p-4"), children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
          qe,
          {
            className: cn(
              "max-h-[90vh] overflow-hidden rounded-xl rounded-b-lg bg-background pb-6 shadow-2xl backdrop-blur-2xl animate-in sm:rounded-2xl md:w-[680px]"
            ),
            children: [
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                ze$1,
                {
                  className: "mb-1 flex items-center justify-between p-6 pb-5 text-left",
                  as: "div",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("h2", { className: "text-lg font-medium leading-6 text-text-primary", children: localize("com_nav_settings") }, void 0, false, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                      lineNumber: 167,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      "button",
                      {
                        type: "button",
                        className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-border-xheavy focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-surface-primary dark:focus:ring-offset-surface-primary",
                        onClick: () => onOpenChange(false),
                        children: [
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                            "svg",
                            {
                              xmlns: "http://www.w3.org/2000/svg",
                              width: "24",
                              height: "24",
                              viewBox: "0 0 24 24",
                              fill: "none",
                              stroke: "currentColor",
                              strokeWidth: "2",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              className: "h-5 w-5 text-text-primary",
                              children: [
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "18", x2: "6", y1: "6", y2: "18" }, void 0, false, {
                                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                                  lineNumber: 187,
                                  columnNumber: 21
                                }, this),
                                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("line", { x1: "6", x2: "18", y1: "6", y2: "18" }, void 0, false, {
                                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                                  lineNumber: 188,
                                  columnNumber: 21
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                              lineNumber: 175,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("span", { className: "sr-only", children: localize("com_ui_close_settings") }, void 0, false, {
                            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                            lineNumber: 190,
                            columnNumber: 19
                          }, this)
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 170,
                        columnNumber: 17
                      },
                      this
                    )
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                  lineNumber: 163,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "max-h-[calc(90vh-120px)] overflow-auto px-6 md:w-[680px]", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                $69cb30bb0017df05$export$be92b6f5f03c0fe9,
                {
                  value: activeTab,
                  onValueChange: handleTabChange,
                  className: "flex flex-col gap-10 md:flex-row",
                  orientation: "vertical",
                  children: [
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                      $69cb30bb0017df05$export$54c2e3dc7acea9f5,
                      {
                        "aria-label": "Settings",
                        className: cn(
                          "min-w-auto max-w-auto relative -ml-[8px] flex flex-shrink-0 flex-col flex-nowrap overflow-auto sm:max-w-none",
                          isSmallScreen ? "flex-row rounded-xl bg-surface-secondary" : "sticky top-0 h-full"
                        ),
                        onKeyDown: handleKeyDown,
                        children: settingsTabs.map(({ value, icon, label }) => /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                          $69cb30bb0017df05$export$41fb9f06171c75f4,
                          {
                            className: cn(
                              "group relative z-10 m-1 flex items-center justify-start gap-2 rounded-xl px-2 py-1.5 transition-all duration-200 ease-in-out",
                              isSmallScreen ? "flex-1 justify-center text-nowrap p-1 px-3 text-sm text-text-secondary radix-state-active:bg-surface-hover radix-state-active:text-text-primary" : "bg-transparent text-text-secondary radix-state-active:bg-surface-tertiary radix-state-active:text-text-primary"
                            ),
                            value,
                            ref: (el) => tabRefs.current[value] = el,
                            children: [
                              icon,
                              localize(label)
                            ]
                          },
                          value,
                          true,
                          {
                            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                            lineNumber: 211,
                            columnNumber: 23
                          },
                          this
                        ))
                      },
                      void 0,
                      false,
                      {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 200,
                        columnNumber: 19
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "overflow-auto sm:w-full sm:max-w-none md:pr-0.5 md:pt-0.5", children: [
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.GENERAL, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(General, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 229,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 228,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.CHAT, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Chat$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 232,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 231,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.COMMANDS, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Commands$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 235,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 234,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.SPEECH, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Speech$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 238,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 237,
                        columnNumber: 21
                      }, this),
                      hasAnyPersonalizationFeature && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.PERSONALIZATION, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
                        Personalization,
                        {
                          hasMemoryOptOut,
                          hasAnyPersonalizationFeature
                        },
                        void 0,
                        false,
                        {
                          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                          lineNumber: 242,
                          columnNumber: 25
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 241,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.DATA, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Data$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 249,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 248,
                        columnNumber: 21
                      }, this),
                      startupConfig?.balance?.enabled && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.BALANCE, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Balance$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 253,
                        columnNumber: 25
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 252,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV($69cb30bb0017df05$export$7c6e2c02157bb7d2, { value: ci.ACCOUNT, tabIndex: -1, children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Account$1, {}, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 257,
                        columnNumber: 23
                      }, this) }, void 0, false, {
                        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                        lineNumber: 256,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                      lineNumber: 227,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                  lineNumber: 194,
                  columnNumber: 17
                },
                this
              ) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
                lineNumber: 193,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
            lineNumber: 158,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
          lineNumber: 157,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
        lineNumber: 149,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
    lineNumber: 137,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/Settings.tsx",
    lineNumber: 136,
    columnNumber: 5
  }, this);
}
function AccountSettings({ collapsed = false }) {
  const localize = useLocalize();
  const { user, isAuthenticated, logout } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.balance?.enabled
  });
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [showFiles, setShowFiles] = reactExports.useState(false);
  const accountSettingsButtonRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MenuProvider, { children: [
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      MenuButton,
      {
        ref: accountSettingsButtonRef,
        "aria-label": localize("com_nav_account_settings"),
        "data-testid": "nav-user",
        className: collapsed ? "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-surface-active-alt aria-[expanded=true]:bg-surface-active-alt" : "mt-text-sm flex h-auto w-full items-center gap-2 rounded-xl p-2 text-sm transition-all duration-200 ease-in-out hover:bg-surface-active-alt aria-[expanded=true]:bg-surface-active-alt",
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: collapsed ? "size-7 flex-shrink-0" : "-ml-0.9 -mt-0.8 h-8 w-8 flex-shrink-0",
              children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "relative flex", children: /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Avatar$1, { user, size: collapsed ? 28 : 32 }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
                lineNumber: 38,
                columnNumber: 13
              }, this) }, void 0, false, {
                fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
                lineNumber: 37,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 34,
              columnNumber: 9
            },
            this
          ),
          !collapsed && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            "div",
            {
              className: "mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-text-primary",
              style: { marginTop: "0", marginLeft: "0" },
              children: user?.name ?? user?.username ?? localize("com_nav_user")
            },
            void 0,
            false,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 42,
              columnNumber: 11
            },
            this
          )
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
        lineNumber: 24,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      Menu,
      {
        portal: true,
        className: "account-settings-popover popover-ui z-[125] w-[305px] rounded-lg md:w-[244px]",
        placement: collapsed ? "right-end" : void 0,
        style: {
          transformOrigin: collapsed ? "left bottom" : "bottom",
          translate: collapsed ? "4px 0" : "0 -4px"
        },
        children: [
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-token-text-secondary ml-3 mr-2 py-2 text-sm", role: "note", children: user?.email ?? localize("com_nav_user") }, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 59,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 62,
            columnNumber: 9
          }, this),
          startupConfig?.balance?.enabled === true && balanceQuery.data != null && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(jsxDevRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV("div", { className: "text-token-text-secondary ml-3 mr-2 py-2 text-sm", role: "note", children: [
              localize("com_nav_balance"),
              ":",
              " ",
              new Intl.NumberFormat().format(Math.round(balanceQuery.data.tokenCredits))
            ] }, void 0, true, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 65,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 69,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 64,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MenuItem, { onClick: () => setShowFiles(true), className: "select-item text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(FileText, { className: "icon-md", "aria-hidden": "true" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 73,
              columnNumber: 11
            }, this),
            localize("com_nav_my_files")
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 72,
            columnNumber: 9
          }, this),
          startupConfig?.helpAndFaqURL !== "/" && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
            MenuItem,
            {
              onClick: () => window.open(startupConfig?.helpAndFaqURL, "_blank"),
              className: "select-item text-sm",
              children: [
                /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LinkIcon, { "aria-hidden": "true" }, void 0, false, {
                  fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
                  lineNumber: 81,
                  columnNumber: 13
                }, this),
                localize("com_nav_help_faq")
              ]
            },
            void 0,
            true,
            {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 77,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MenuItem, { onClick: () => setShowSettings(true), className: "select-item text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(GearIcon, { className: "icon-md", "aria-hidden": "true" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 86,
              columnNumber: 11
            }, this),
            localize("com_nav_settings")
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 85,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(DropdownMenuSeparator, {}, void 0, false, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 89,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(MenuItem, { onClick: () => logout(), className: "select-item text-sm", children: [
            /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(LogOut, { className: "icon-md", "aria-hidden": "true" }, void 0, false, {
              fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
              lineNumber: 91,
              columnNumber: 11
            }, this),
            localize("com_nav_log_out")
          ] }, void 0, true, {
            fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
            lineNumber: 90,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
        lineNumber: 50,
        columnNumber: 7
      },
      this
    ),
    showFiles && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(
      MyFilesModal,
      {
        open: showFiles,
        onOpenChange: setShowFiles,
        triggerRef: accountSettingsButtonRef
      },
      void 0,
      false,
      {
        fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
        lineNumber: 96,
        columnNumber: 9
      },
      this
    ),
    showSettings && /* @__PURE__ */ jsxDevRuntimeExports.jsxDEV(Settings, { open: showSettings, onOpenChange: setShowSettings }, void 0, false, {
      fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
      lineNumber: 102,
      columnNumber: 24
    }, this)
  ] }, void 0, true, {
    fileName: "/home/carlos/projects/prodam/LibreChat/client/src/components/Nav/AccountSettings.tsx",
    lineNumber: 23,
    columnNumber: 5
  }, this);
}
const AccountSettings_default = reactExports.memo(AccountSettings);
export {
  AccountSettings_default as default
};
