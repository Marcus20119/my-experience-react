import { Flex, Typography } from 'antd';
import { useMemo } from 'react';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { getRecVertices } from '@/app/features/feature/floor-plan/lib';
import type {
  FloorPlanDeskItemEntity,
  FloorPlanRoomItemEntity,
} from '@/app/features/feature/floor-plan/model';
import { FLOOR_PLAN_EDITOR_SIZE } from '@/app/features/feature/floor-plan/model';

const { Paragraph } = Typography;

interface Props {
  desk?: FloorPlanDeskItemEntity;
  room?: FloorPlanRoomItemEntity;
  zIndex: number;
}

function NameLayer({ desk, room, zIndex }: Props) {
  const { deskSize, stageSize } = useFloorPlanEditorContext();

  const x = room?.shape?.x || desk?.shape?.x || 0;
  const y = room?.shape?.y || desk?.shape?.y || 0;

  const xInPx = (x * stageSize.width) / 100;
  const yInPx = (y * stageSize.height) / 100;
  const widthInPx =
    ((room?.shape?.width || 0) * stageSize.width) / 100 || deskSize || 0;
  const heightInPx =
    ((room?.shape?.height || 0) * stageSize.height) / 100 || deskSize || 0;

  const rotation = room?.shape?.rotation || desk?.shape?.rotation || 0;

  // Change top position of name based on rotation
  const top = useMemo(() => {
    const { a, b, c, d } = getRecVertices({
      height: heightInPx,
      rotation,
      width: widthInPx,
      x: xInPx,
      y: yInPx,
    });

    const minYInPx = Math.min(a.y, b.y, c.y, d.y);
    const minYInPercent = (minYInPx * 100) / stageSize.height;

    if (Math.abs(rotation) > 150) {
      return (
        minYInPercent -
        (FLOOR_PLAN_EDITOR_SIZE.rotateStickHeight / stageSize.height) * 100
      );
    }

    return minYInPercent;
  }, [heightInPx, rotation, stageSize.height, widthInPx, xInPx, yInPx]);

  return (
    <Flex
      className="absolute flex-shrink-0 -translate-x-1/2 -translate-y-[calc(100%_+_0.5rem)]"
      justify="center"
      style={{
        left: `${x}%`,
        top: `${top}%`,
        width: FLOOR_PLAN_EDITOR_SIZE.itemNameWidth,
        zIndex,
      }}
    >
      <Paragraph className="mb-0 text-center font-semibold">
        {room?.name || desk?.name}
      </Paragraph>
    </Flex>
  );
}

export default NameLayer;
