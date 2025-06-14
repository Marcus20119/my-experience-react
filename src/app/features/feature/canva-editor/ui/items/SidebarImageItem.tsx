import { Flex, Image } from 'antd';
import useImage from 'use-image';

import { useCanvaEditorContext } from '@/app/features/feature/canva-editor/context';
import { useGetContainerSize } from '@/app/features/feature/canva-editor/lib';
import {
  CanvaItemType,
  PAPER_SIZE,
} from '@/app/features/feature/canva-editor/model';

import { StyledCheckered } from './styles';

interface Props {
  frameSize?: number;
  src?: string;
}

function SidebarImageItem({ frameSize, src }: Props) {
  const [image] = useImage(src ?? '', 'anonymous', 'origin');
  const { onAddItem, paperType, stageRef, stageSize } = useCanvaEditorContext();

  const { height, width } = useGetContainerSize({
    frameSize,
    stageSize: {
      height: image?.height,
      width: image?.width,
    },
  });

  const paperSize = PAPER_SIZE[paperType];

  return (
    <Flex className="relative aspect-square w-full">
      <StyledCheckered />

      <Flex align="center" className="absolute inset-0" justify="center">
        <Image
          className="object-contain"
          draggable
          height={height ?? '100%'}
          onDragEnd={e => {
            document.body.style.cursor = 'auto';
            stageRef?.current?.setPointersPositions(e);
            const pointerPositions =
              stageRef?.current?.getPointerPosition() ?? {
                x: 0,
                y: 0,
              };

            const imageWidth = image?.width ?? 0;
            const imageHeight = image?.height ?? 0;

            onAddItem({
              height: (imageHeight / paperSize.height) * 100,
              type: CanvaItemType.Image,
              url: image?.src ?? '',
              width: (imageWidth / paperSize.width) * 100,
              x: (pointerPositions.x / stageSize.width) * 100,
              y: (pointerPositions.y / stageSize.height) * 100,
            });
          }}
          onMouseDown={() => {
            document.body.style.cursor = 'grabbing';
          }}
          onMouseEnter={() => {
            document.body.style.cursor = 'grab';
          }}
          onMouseLeave={() => {
            document.body.style.cursor = 'auto';
          }}
          preview={false}
          src={src}
          width={width ?? '100%'}
        />
      </Flex>
    </Flex>
  );
}

export default SidebarImageItem;
