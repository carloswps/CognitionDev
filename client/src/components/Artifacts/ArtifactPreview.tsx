import type {
  SandpackPreviewRef,
  SandpackProviderProps,
} from '@codesandbox/sandpack-react/unstyled';
import { SandpackPreview, SandpackProvider } from '@codesandbox/sandpack-react/unstyled';
import type { TStartupConfig } from 'librechat-data-provider';
import React, { type MutableRefObject, memo, useMemo } from 'react';
import type { ArtifactFiles } from '~/common';
import { buildSandpackOptions, sharedFiles } from '~/utils/artifacts';

export const ArtifactPreview = memo(
  ({
    files,
    fileKey,
    template,
    sharedProps,
    previewRef,
    currentCode,
    startupConfig,
  }: {
    files: ArtifactFiles;
    fileKey: string;
    template: SandpackProviderProps['template'];
    sharedProps: Partial<SandpackProviderProps>;
    previewRef: MutableRefObject<SandpackPreviewRef>;
    currentCode?: string;
    startupConfig?: TStartupConfig;
  }) => {
    const artifactFiles = useMemo(() => {
      if (Object.keys(files).length === 0) {
        return files;
      }
      const code = currentCode ?? '';
      if (!code) {
        return files;
      }
      return {
        ...files,
        [fileKey]: { code },
      };
    }, [currentCode, files, fileKey]);

    const options: SandpackProviderProps['options'] = useMemo(
      () => buildSandpackOptions(template, startupConfig),
      [startupConfig, template],
    );

    if (Object.keys(artifactFiles).length === 0) {
      return null;
    }

    return (
      <SandpackProvider
        files={{ ...artifactFiles, ...sharedFiles }}
        options={options}
        {...sharedProps}
        template={template}
      >
        <SandpackPreview
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
          tabIndex={0}
          ref={previewRef}
        />
      </SandpackProvider>
    );
  },
);
