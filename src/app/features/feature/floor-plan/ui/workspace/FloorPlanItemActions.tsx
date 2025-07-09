import { Button, Flex } from 'antd';
import { Trash } from 'iconsax-react';
import { useMemo } from 'react';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';

interface Props {
  zIndex: number;
}

function FloorPlanItemActions({ zIndex }: Props) {
  const {
    deskSize,
    isEditing,
    onRemoveDeskShape,
    onRemoveRoomShape,
    selectingDesk,
    selectingRoom,
    stageSize,
  } = useFloorPlanEditorContext();

  const x = selectingRoom?.shape?.x || selectingDesk?.shape?.x || 0;
  const y = selectingRoom?.shape?.y || selectingDesk?.shape?.y || 0;

  const xInPx = (x * stageSize.width) / 100;
  const yInPx = (y * stageSize.height) / 100;
  const widthInPx =
    ((selectingRoom?.shape?.width || 0) * stageSize.width) / 100 ||
    deskSize ||
    0;
  const heightInPx =
    ((selectingRoom?.shape?.height || 0) * stageSize.height) / 100 ||
    deskSize ||
    0;

  const rotation =
    selectingRoom?.shape?.rotation || selectingDesk?.shape?.rotation || 0;

  // Change top position of actions based on rotation
  const top = useMemo(() => {
    const alpha = rotation * (Math.PI / 180);
    // the degree when diagonal line is vertical
    const beta = Math.atan(widthInPx / heightInPx);
    const diagonalLength = Math.sqrt(heightInPx ** 2 + widthInPx ** 2);

    // get 4 points
    const a = {
      x: xInPx - (Math.sin(beta - alpha) * diagonalLength) / 2,
      y: yInPx - (Math.cos(beta - alpha) * diagonalLength) / 2,
    };

    const b = {
      x: xInPx + (Math.sin(beta + alpha) * diagonalLength) / 2,
      y: yInPx - (Math.cos(beta + alpha) * diagonalLength) / 2,
    };

    const c = {
      x: xInPx + (Math.sin(beta - alpha) * diagonalLength) / 2,
      y: yInPx + (Math.cos(beta - alpha) * diagonalLength) / 2,
    };

    const d = {
      x: xInPx - (Math.sin(beta + alpha) * diagonalLength) / 2,
      y: yInPx + (Math.cos(beta + alpha) * diagonalLength) / 2,
    };

    // console.log('a', a, 'b', b, 'c', c, 'd', d);

    const maxYInPx = Math.max(a.y, b.y, c.y, d.y);
    const maxYInPercent = (maxYInPx * 100) / stageSize.height;

    if (Math.abs(rotation) > 150) {
      return maxYInPercent + (48 / stageSize.height) * 100; // 48 is the height of the rotate stick
    }

    return maxYInPercent;
  }, [heightInPx, rotation, stageSize.height, widthInPx, xInPx, yInPx]);

  // If no item is selected or the item is being edited, don't show actions
  if ((!selectingRoom && !selectingDesk) || isEditing) {
    return null;
  }

  return (
    <Flex
      className="absolute -translate-x-1/2 translate-y-1/2"
      style={{ left: `${x}%`, top: `${top}%`, zIndex }}
    >
      <Button
        className="border-neutral-300 bg-neutral-0 hover:border-neutral-600 hover:bg-neutral-100"
        icon={<Trash size="16" variant="Bulk" />}
        onClick={() => {
          if (selectingRoom) {
            onRemoveRoomShape(selectingRoom.id);
          } else if (selectingDesk) {
            onRemoveDeskShape(selectingDesk.id);
          }
        }}
        size="small"
      />
    </Flex>
  );
}

export default FloorPlanItemActions;
