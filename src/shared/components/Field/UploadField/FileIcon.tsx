import { Icon } from '@iconify/react';
import { Image } from 'antd';
import { Eye } from 'iconsax-react';
import { useState } from 'react';

import { IMAGE_TYPES } from '@/shared/constants';
import type { FileType } from '@/shared/types';

import { getFileIconName } from './getFileIconName';

interface Props {
  fileType?: FileType;
  size?: number;
  src?: string;
}

function FileIcon({ fileType, size = 40, src }: Props) {
  const iconName = getFileIconName({ fileType });
  const isImage = fileType && IMAGE_TYPES.includes(fileType);

  const [error, setError] = useState(false);

  if (isImage && src && !error) {
    return (
      <Image
        className="flex-shrink-0 object-cover object-center"
        height={size}
        onError={() => setError(true)}
        preview={{
          mask: <Eye size="16" />,
        }}
        rootClassName="rounded-md overflow-hidden"
        src={src}
        width={size}
      />
    );
  }

  return (
    <Icon
      className="flex-shrink-0"
      height={size}
      icon={iconName}
      width={size}
    />
  );
}

export default FileIcon;
