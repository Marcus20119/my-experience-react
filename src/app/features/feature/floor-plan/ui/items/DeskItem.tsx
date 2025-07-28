import type Konva from 'konva';
import { useCallback, useMemo, useRef } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { checkOverflowedDesk } from '@/app/features/feature/floor-plan/lib';
import type {
  FloorPlanDeskItemEntity,
  FloorPlanDeskShapeEntity,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  desk: FloorPlanDeskItemEntity;
}

function DeskItem({ desk }: Props) {
  const imgRef = useRef<Konva.Image>(null);

  const [img] = useImage('/images/desk.png', 'anonymous');
  const {
    deskSize,
    draggingRoomId,
    isEditing,
    onUpdateDeskShape,
    pickingDeskId,
    rooms,
    selectingDesk,
    selectingRoom,
    setIsEditing,
    setSelectingDesk,
    setSelectingRoom,
    stageSize,
  } = useFloorPlanEditorContext();

  const room = rooms?.find(room =>
    room.desks?.some(item => item.id === desk.id),
  );

  const onToggleSelectingDesk = useCallback(() => {
    if (selectingDesk?.id === desk.id) {
      setSelectingDesk(null);
    } else {
      setSelectingDesk(desk);
      setSelectingRoom(null);
    }
  }, [desk, selectingDesk?.id, setSelectingDesk, setSelectingRoom]);

  const onClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      onToggleSelectingDesk();
    },
    [onToggleSelectingDesk],
  );

  const onTap = useCallback(
    (e: Konva.KonvaEventObject<TouchEvent>) => {
      e.cancelBubble = true;
      onToggleSelectingDesk();
    },
    [onToggleSelectingDesk],
  );

  const onMouseEnter = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;

      if (pickingDeskId) {
        document.body.style.cursor = 'pointer';
      } else {
        document.body.style.cursor = 'move';
      }
    },
    [pickingDeskId],
  );

  const onMouseLeave = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'default';
  }, []);

  const onDragStart = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      document.body.style.cursor = 'move';
      setIsEditing(true);
      setSelectingDesk(desk);
      setSelectingRoom(null);
    },
    [desk, setIsEditing, setSelectingDesk, setSelectingRoom],
  );

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      const node = imgRef.current;

      if (!node || !desk?.shape) return;

      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;

      const newShape: FloorPlanDeskShapeEntity = {
        ...desk?.shape,
        x,
        y,
      };

      const isOverflowed = checkOverflowedDesk({
        deskPosition: {
          x,
          y,
        },
        room,
      });

      if (isOverflowed) {
        imgRef.current?.setAttrs({
          height: deskSize,
          offsetX: deskSize / 2,
          offsetY: deskSize / 2,
          width: deskSize,
          x: (desk.shape.x * stageSize.width) / 100,
          y: (desk?.shape.y * stageSize.height) / 100,
        });
      } else {
        onUpdateDeskShape({ deskId: desk.id, shape: newShape });
      }

      setIsEditing(false);
    },
    [
      desk.id,
      desk.shape,
      deskSize,
      onUpdateDeskShape,
      room,
      setIsEditing,
      stageSize.height,
      stageSize.width,
    ],
  );

  const onTransformStart = useCallback(
    (e: Konva.KonvaEventObject<Event>) => {
      e.cancelBubble = true;
      setIsEditing(true);
    },
    [setIsEditing],
  );

  const onTransformEnd = useCallback(
    (e: Konva.KonvaEventObject<Event>) => {
      e.cancelBubble = true;
      const node = imgRef.current;

      if (!node || !desk?.shape) return;

      // we will reset it back
      node.scaleX(1);
      node.scaleY(1);

      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;

      const newShape: FloorPlanDeskShapeEntity = {
        ...desk.shape,
        rotation: node.rotation(),
        x,
        y,
      };

      const isOverflowed = checkOverflowedDesk({
        deskPosition: {
          x,
          y,
        },
        room,
      });

      if (isOverflowed) {
        imgRef.current?.setAttrs({
          height: deskSize,
          offsetX: deskSize / 2,
          offsetY: deskSize / 2,
          width: deskSize,
          x: (desk.shape.x * stageSize.width) / 100,
          y: (desk?.shape.y * stageSize.height) / 100,
        });
      } else {
        onUpdateDeskShape({
          deskId: desk.id,
          shape: newShape,
        });
      }

      setIsEditing(false);
    },
    [
      desk.id,
      desk.shape,
      deskSize,
      onUpdateDeskShape,
      room,
      setIsEditing,
      stageSize.height,
      stageSize.width,
    ],
  );

  const events = useMemo(() => {
    if (draggingRoomId || pickingDeskId)
      return {
        onMouseEnter,
      };

    if (room?.shape?.isOverlapped) return undefined;

    return {
      onClick,
      onDragEnd,
      onDragStart,
      onMouseEnter,
      onMouseLeave,
      onTap,
      onTransformEnd,
      onTransformStart,
    };
  }, [
    draggingRoomId,
    onClick,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
    onTap,
    onTransformEnd,
    onTransformStart,
    pickingDeskId,
    room?.shape?.isOverlapped,
  ]);

  if (!desk?.shape || (room?.id === selectingRoom?.id && isEditing)) {
    return null;
  }

  return (
    <>
      <Image
        cornerRadius={100}
        draggable
        height={deskSize}
        image={img}
        offsetX={deskSize / 2}
        offsetY={deskSize / 2}
        ref={imgRef}
        rotation={desk.shape.rotation}
        stroke={COLOR.neutral['300']}
        strokeWidth={2}
        width={deskSize}
        x={(desk.shape.x * stageSize.width) / 100}
        y={(desk.shape.y * stageSize.height) / 100}
        {...events}
      />
    </>
  );
}

export default DeskItem;
