import { Icon } from '@iconify/react/dist/iconify.js';
import { useMutation } from '@tanstack/react-query';
import { Flex, Spin, Typography, Upload } from 'antd';
import type { RcFile } from 'antd/es/upload';
import { useMemo, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { cn } from '@/lib/tailwind';
import { getFileExtension } from '@/shared/components/field/upload-fields';
import type { MimeType } from '@/shared/tanstack/api/storage';
import {
  BucketType,
  FileCategory,
  storageApi,
} from '@/shared/tanstack/api/storage';
import { FileType } from '@/shared/types';
import { NotiTool } from '@/shared/utils';
import { FileTool } from '@/shared/utils/file';

const { Dragger } = Upload;
const { Paragraph } = Typography;
const { getFileTypeFromName } = FileTool;
const { showError } = NotiTool;

interface Props {
  acceptTypes?: FileType[];
  disabled?: boolean;
  maxFileSize?: number;
}

function UploadFloorPlan({
  acceptTypes = [FileType.Png, FileType.Jpeg, FileType.Jpg, FileType.Svg],
  disabled,
  maxFileSize = 10,
}: Props) {
  const { t } = useTranslation();
  const { allowEdit, handleChangeFloorPlanImage } = useFloorPlanEditorContext();

  const { mutateAsync: createPresignUrl } = useMutation({
    mutationFn: storageApi.getPresignedUrl,
  });

  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: RcFile) => {
    const fileName = file.name;
    const fileType = getFileTypeFromName(fileName);
    const fileSize = file.size;
    const blobUrl = URL.createObjectURL(file);

    try {
      setLoading(true);

      if (acceptTypes && fileType && !acceptTypes.includes(fileType)) {
        showError({
          message: t('common.error.invalidFileType', { fileName: file.name }),
        });
        return;
      }

      if (maxFileSize && fileSize > maxFileSize * 1024 * 1024) {
        showError({
          message: t('common.error.maxFileSize', { maxFileSize }),
        });
        return;
      }

      const { key, uploadUrl } = await createPresignUrl({
        bucketType: BucketType.Private,
        category: FileCategory.Image,
        mimeType: fileType as unknown as MimeType,
        name: fileName,
        size: fileSize,
      });

      if (uploadUrl && key) {
        await storageApi.uploadFile({
          file,
          preSignedRequest: uploadUrl,
        });

        const floorPlanImage = `${key}>${blobUrl}`;

        handleChangeFloorPlanImage(floorPlanImage);
      }
    } catch (error) {
      showError({
        message: t('common.error.canNotUploadFile', { fileName }),
      });
    } finally {
      setLoading(false);
    }
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

    return lastType;
  }, [acceptTypes, t]);

  const disabledDragger = disabled || loading;

  return (
    <Dragger
      accept={acceptTypes?.join(',')}
      customRequest={({ file }) => {
        handleUpload(file as RcFile);
      }}
      disabled={disabledDragger || !allowEdit}
      rootClassName={cn(
        'transition-colors [&_.ant-upload]:rounded-xl w-full h-full',
        disabled
          ? '[&_.ant-upload]:bg-neutral-50'
          : '[&_.ant-upload]:bg-neutral-0 [&_.ant-upload]:hover:bg-neutral-50',
      )}
      showUploadList={false}
    >
      <Flex align="center" gap="0.5rem" vertical>
        <Flex
          align="center"
          className="h-10 w-10 rounded-lg border border-solid border-neutral-300 bg-neutral-0"
          justify="center"
        >
          {loading ? (
            <Spin className="mx-[6rem]" />
          ) : (
            <Icon height="24" icon="@local:upload-to-cloud" width="24" />
          )}
        </Flex>
        <Paragraph className="mb-0 text-center">
          <Trans
            components={{
              span: <span className="font-semibold text-system-information" />,
            }}
          >
            {t('common.upload.description')}
          </Trans>
          <Paragraph className="mb-0 mt-1 text-sm">
            {t('common.upload.uploadSingleSpecification', {
              fileTypes: allowedTypesText,
              maxFileSize,
            })}
          </Paragraph>
        </Paragraph>
      </Flex>
    </Dragger>
  );
}

export default UploadFloorPlan;
