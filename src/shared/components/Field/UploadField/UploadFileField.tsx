import { Icon } from '@iconify/react';
import { Flex, Typography, Upload } from 'antd';
import type { DraggerProps } from 'antd/es/upload';
import type { RcFile } from 'antd/lib/upload';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

import type { FileType } from '@/shared/types';
import { NotiTool, TextTool } from '@/shared/utils';
import { FileTool } from '@/shared/utils/file';

import { getFileExtension } from './getFileExtension';
import type { UploadedFileProps } from './UploadedFile';
import UploadedFile from './UploadedFile';

const { Dragger } = Upload;
const { Text } = Typography;

interface SingleFileProps {
  multiple?: false;
  onChange?: (value?: string) => void;
  value?: string;
}

interface MultipleFilesProps {
  multiple: true;
  onChange?: (value?: string[]) => void;
  value?: string[];
}

type FileProps = MultipleFilesProps | SingleFileProps;

interface Props extends Omit<DraggerProps, 'multiple' | 'onChange'> {
  acceptTypes?: FileType[];
  maxFileSize?: number;
}

function UploadFileField({
  acceptTypes,
  disabled,
  maxFileSize,
  multiple,
  onChange,
  value,
  ...props
}: Props & FileProps) {
  const isSetInitialFiles = useRef<boolean>(false);
  const { t } = useTranslation();

  const [files, setFiles] = useState<UploadedFileProps[]>(() => {
    if (!value) {
      return [];
    }

    if (multiple) {
      return value.map(file => {
        const name = file.split('/').pop() as string;
        const type = FileTool.getFileTypeFromName(name);

        return {
          id: uuidv4(),
          loading: false,
          name,
          type,
          url: file,
        };
      });
    }

    const name = value?.split('/').pop() as string;
    const type = FileTool.getFileTypeFromName(name);

    return [
      {
        id: uuidv4(),
        loading: false,
        name,
        type,
        url: value,
      },
    ];
  });

  const handleUpload = async (file: RcFile) => {
    const fileName = TextTool.getSlug(file.name);
    const fileType = FileTool.getFileTypeFromName(fileName);
    const fileSize = file.size;
    const blobUrl = URL.createObjectURL(file);
    const fileId = uuidv4();

    if (acceptTypes && fileType && !acceptTypes.includes(fileType)) {
      NotiTool.showError({
        message: t('common.error.invalidFileType', { fileName: file.name }),
      });
      return;
    }

    if (maxFileSize && fileSize > maxFileSize * 1024 * 1024) {
      NotiTool.showError({
        message: t('common.error.maxFileSize', { maxFileSize }),
      });
      return;
    }

    setFiles(prev => [
      ...(multiple ? prev : []), // Clear files if not multiple
      {
        id: fileId,
        isBlob: true,
        loading: true,
        name: file.name,
        size: fileSize,
        type: fileType,
        url: blobUrl,
      },
    ]);

    // Handle api
    await new Promise(resolve => setTimeout(resolve, 500));

    setFiles(prev => {
      const newFiles = prev.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            loading: false,
          };
        }

        return file;
      });

      return newFiles;
    });
  };

  const allowedTypesText = useMemo(() => {
    const types = acceptTypes?.map(type =>
      getFileExtension({
        fileType: type,
      }).toUpperCase(),
    );

    const lastType = types?.pop();

    if (types?.length) {
      return `${types.join(', ')} ${t('common.conjunction.or')} ${lastType}`;
    }

    return '';
  }, [acceptTypes, t]);

  const maxFileSizeText = useMemo(() => {
    if (maxFileSize) {
      return t('common.placeholder.maxFileSize', { maxFileSize });
    }

    return '';
  }, [maxFileSize, t]);

  const onRemove = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  useEffect(() => {
    if (multiple) {
      onChange?.(files.map(file => file.url).filter(Boolean) as string[]);
    } else {
      onChange?.(files[0]?.url || undefined);
    }
  }, [files]);

  useEffect(() => {
    if (value?.length && !files.length && !isSetInitialFiles?.current) {
      setFiles(
        multiple
          ? value.map(file => {
              const name = file.split('/').pop() as string;
              const type = FileTool.getFileTypeFromName(name);

              return {
                id: uuidv4(),
                loading: false,
                name,
                type,
                url: file,
              };
            })
          : [
              {
                id: uuidv4(),
                loading: false,
                name: value.split('/').pop() as string,
                type: FileTool.getFileTypeFromName(
                  value.split('/').pop() as string,
                ),
                url: value,
              },
            ],
      );

      isSetInitialFiles.current = true;
    }
  }, [value]);

  return (
    <>
      <Dragger
        accept={acceptTypes?.join(',')}
        className="transition-colors [&_.ant-upload-drag]:bg-neutral-50 [&_.ant-upload-drag]:hover:bg-neutral-0"
        customRequest={({ file }) => {
          handleUpload(file as RcFile);
        }}
        disabled={disabled}
        multiple={multiple}
        showUploadList={false}
        {...props}
      >
        <Flex align="center" gap="0.5rem" vertical>
          <Flex
            align="center"
            className="h-10 w-10 rounded-xl border border-solid border-neutral-300 bg-neutral-0"
            justify="center"
          >
            <Icon height="20" icon="lucide:upload-cloud" width="20" />
          </Flex>

          <Flex align="center" gap="0.25rem" vertical>
            <Flex align="center" gap="0.25rem">
              <Text className="cursor-pointer font-semibold text-primary">
                {t('common.button.clickToUpload')}
              </Text>
              <Text className="text-neutral-500">
                {t('common.placeholder.orDragAndDrop')}
              </Text>
            </Flex>

            {allowedTypesText || maxFileSizeText ? (
              <Text className="text-neutral-500">{`${allowedTypesText} ${maxFileSizeText}`}</Text>
            ) : null}
          </Flex>
        </Flex>
      </Dragger>

      <Flex className="pt-2" gap="0.5rem" vertical>
        {files.map(file => (
          <UploadedFile file={file} key={file.id} onRemove={onRemove} />
        ))}
      </Flex>
    </>
  );
}

export default UploadFileField;
