import type Konva from 'konva';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Rect, Transformer } from 'react-konva';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import {
  checkOverflowedDesk,
  checkOverflowedRoom,
  checkOverlappedRoom,
} from '@/app/features/feature/floor-plan/lib';
import {
  type FloorPlanRoomItemEntity,
  type FloorPlanRoomShapeEntity,
  ROOM_COLOR,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  room: FloorPlanRoomItemEntity;
}

function RoomItem({ room }: Props) {
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const { t } = useTranslation();
  const {
    allowEdit,
    draggingRoomId,
    glowingRoom,
    onUpdateRoomShape,
    pickingDeskId,
    rooms,
    selectingRoom,
    setIsEditing,
    setSelectingDesk,
    setSelectingRoom,
    stageSize,
    toastMessageRef,
  } = useFloorPlanEditorContext();

  // Attach the transformer to the image
  useEffect(() => {
    if (selectingRoom?.id === room.id && trRef.current && rectRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [room.id, selectingRoom?.id]);

  const handleCheckOverlap = useCallback(
    (newShape: FloorPlanRoomShapeEntity) => {
      const otherRooms = rooms?.filter(item => item.id !== room.id) || [];
      const isOverlapped = otherRooms?.some(item =>
        checkOverlappedRoom(
          {
            ...room,
            shape: newShape,
          },
          item,
        ),
      );

      if (isOverlapped) {
        toastMessageRef?.current?.showError({
          description: t('feature.floorPlan.error.overlappedTransformedRoom'),
        });
      }
    },
    [room, rooms, t, toastMessageRef],
  );

  const onToggleSelectingRoom = useCallback(() => {
    if (selectingRoom?.id === room.id) {
      setSelectingRoom(null);
    } else {
      setSelectingRoom(room);
      setSelectingDesk(null);
    }
  }, [room, selectingRoom?.id, setSelectingDesk, setSelectingRoom]);

  const onClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;
      onToggleSelectingRoom();
    },
    [onToggleSelectingRoom],
  );

  const onTap = useCallback(
    (e: Konva.KonvaEventObject<TouchEvent>) => {
      e.cancelBubble = true;
      onToggleSelectingRoom();
    },
    [onToggleSelectingRoom],
  );

  const onMouseEnter = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;

      if (glowingRoom?.id === room.id && pickingDeskId) {
        document.body.style.cursor = 'url("/svgs/pick-cursor.svg") 6 6, auto';
      } else {
        document.body.style.cursor = 'move';
      }
    },
    [glowingRoom?.id, pickingDeskId, room.id],
  );

  const onMouseLeave = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent>) => {
      e.cancelBubble = true;

      if (glowingRoom?.id === room.id && pickingDeskId) {
        document.body.style.cursor = 'not-allowed';
      } else {
        document.body.style.cursor = 'default';
      }
    },
    [glowingRoom?.id, pickingDeskId, room.id],
  );

  const onDragStart = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      document.body.style.cursor = 'move';
      setIsEditing(true);
      setSelectingRoom(room);
      setSelectingDesk(null);
    },
    [room, setIsEditing, setSelectingDesk, setSelectingRoom],
  );

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      const node = rectRef.current;

      if (!node || !room?.shape) return;

      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;

      const newShape: FloorPlanRoomShapeEntity = {
        ...room?.shape,
        x,
        y,
      };

      const isOverflowed = checkOverflowedRoom({
        height: room.shape.height,
        width: room.shape.width,
        x,
        y,
      });

      if (isOverflowed) {
        rectRef.current?.setAttrs({
          height: (room?.shape?.height * stageSize.height) / 100,
          offsetX: (room?.shape?.width * stageSize.width) / 200,
          offsetY: (room?.shape?.height * stageSize.height) / 200,
          width: (room?.shape?.width * stageSize.width) / 100,
          x: (room?.shape?.x * stageSize.width) / 100,
          y: (room?.shape?.y * stageSize.height) / 100,
        });

        toastMessageRef?.current?.showError({
          description: t('feature.floorPlan.error.overflowRoom'),
        });
      } else {
        onUpdateRoomShape({
          roomId: room.id,
          shape: newShape,
        });
      }

      handleCheckOverlap(newShape);
      setIsEditing(false);
    },
    [
      room.shape,
      room.id,
      stageSize.width,
      stageSize.height,
      handleCheckOverlap,
      setIsEditing,
      toastMessageRef,
      t,
      onUpdateRoomShape,
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
      const node = rectRef.current;

      if (!node || !room?.shape) return;

      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;
      const rotation = node.rotation();
      const height = (node.height() * scaleY * 100) / stageSize.height;
      const width = (node.width() * scaleX * 100) / stageSize.width;

      node.scaleX(1);
      node.scaleY(1);

      const newShape = {
        ...room?.shape,
        height,
        rotation,
        width,
        x,
        y,
      };

      const isOverflowed = checkOverflowedRoom({
        height,
        width,
        x,
        y,
      });

      const isDeskOverflowed = room?.desks?.some(
        desk =>
          desk.shape &&
          checkOverflowedDesk({
            deskPosition: { x: desk.shape.x, y: desk.shape.y },
            room: {
              ...room,
              shape: newShape,
            },
          }),
      );

      if (isOverflowed || isDeskOverflowed) {
        rectRef.current?.setAttrs({
          height: (room?.shape?.height * stageSize.height) / 100,
          offsetX: (room?.shape?.width * stageSize.width) / 200,
          offsetY: (room?.shape?.height * stageSize.height) / 200,
          width: (room?.shape?.width * stageSize.width) / 100,
          x: (room?.shape?.x * stageSize.width) / 100,
          y: (room?.shape?.y * stageSize.height) / 100,
        });

        if (isOverflowed) {
          toastMessageRef?.current?.showError({
            description: t('feature.floorPlan.error.overflowRoom'),
          });
        }

        if (isDeskOverflowed) {
          toastMessageRef?.current?.showError({
            description: t('feature.floorPlan.error.overflowDesk'),
          });
        }
      } else {
        onUpdateRoomShape({
          roomId: room.id,
          shape: newShape,
        });
      }

      handleCheckOverlap(newShape);
      setIsEditing(false);
    },
    [
      room,
      stageSize.width,
      stageSize.height,
      handleCheckOverlap,
      setIsEditing,
      toastMessageRef,
      t,
      onUpdateRoomShape,
    ],
  );

  const events = useMemo(() => {
    if (draggingRoomId || !allowEdit) {
      return undefined;
    }

    if (pickingDeskId) {
      if (glowingRoom?.id === room.id) {
        return {
          onMouseEnter,
          onMouseLeave,
        };
      }

      return undefined;
    }

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
    glowingRoom?.id,
    onClick,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
    onTap,
    onTransformEnd,
    onTransformStart,
    pickingDeskId,
    room.id,
    allowEdit,
  ]);

  const fill = useMemo(() => {
    if (room?.shape?.isOverlapped) {
      return ROOM_COLOR.error.bg;
    }

    if (room?.id === glowingRoom?.id) {
      return ROOM_COLOR.glowing.bg;
    }

    return ROOM_COLOR.default.bg;
  }, [glowingRoom?.id, room?.id, room?.shape?.isOverlapped]);

  const stroke = useMemo(() => {
    if (room?.shape?.isOverlapped) {
      return ROOM_COLOR.error.border;
    }

    if (room?.id === glowingRoom?.id) {
      return ROOM_COLOR.glowing.border;
    }

    return ROOM_COLOR.default.border;
  }, [glowingRoom?.id, room?.id, room?.shape?.isOverlapped]);

  if (!room?.shape) return null;

  return (
    <>
      <Rect
        cornerRadius={4}
        draggable={!!events}
        fill={fill}
        height={(room?.shape?.height * stageSize.height) / 100}
        key={room.id}
        offsetX={(room?.shape?.width * stageSize.width) / 200}
        offsetY={(room?.shape?.height * stageSize.height) / 200}
        ref={rectRef}
        stroke={stroke}
        strokeWidth={2}
        width={(room?.shape?.width * stageSize.width) / 100}
        x={(room?.shape?.x * stageSize.width) / 100}
        y={(room?.shape?.y * stageSize.height) / 100}
        {...events}
      />

      {selectingRoom?.id === room.id ? (
        <Transformer
          anchorCornerRadius={2}
          anchorFill="true"
          anchorSize={8}
          anchorStroke={COLOR.neutral['700']}
          anchorStrokeWidth={1}
          borderStroke={COLOR.neutral['700']}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }

            return newBox;
          }}
          flipEnabled={false}
          ref={trRef}
          rotateEnabled={false}
          rotationSnaps={[0, 45, 90, 135, 180, 235, 270]}
        />
      ) : null}
    </>
  );
}

export default RoomItem;
