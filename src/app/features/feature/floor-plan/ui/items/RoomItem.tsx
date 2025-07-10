import { notification } from 'antd';
import type Konva from 'konva';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import {
  checkOverflowedDesk,
  checkOverflowedRoom,
} from '@/app/features/feature/floor-plan/lib';
import type {
  RoomEntity,
  RoomShapeEntity,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';
import { NotiTool } from '@/shared/utils';

const { showError } = NotiTool;

interface Props {
  room: RoomEntity;
}

function RoomItem({ room }: Props) {
  const rectRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const {
    draggingRoomId,
    glowingRoom,
    onUpdateRoomShape,
    pickingDeskId,
    selectingRoom,
    setIsEditing,
    setSelectingDesk,
    setSelectingRoom,
    stageSize,
    workspaceRef,
  } = useFloorPlanEditorContext();

  // Attach the transformer to the image
  useEffect(() => {
    if (selectingRoom?.id === room.id && trRef.current && rectRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([rectRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [room.id, selectingRoom?.id]);

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
        document.body.style.cursor = 'pointer';
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

      const newShape: RoomShapeEntity = {
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

        const { y } = workspaceRef?.current?.getBoundingClientRect() || {
          y: 0,
        };

        notification.config({
          top: y + 16, // FIX_ME
        });

        showError({
          message: 'Lỗi rồi nè',
        });
      } else {
        onUpdateRoomShape({
          roomId: room.id,
          shape: newShape,
        });
      }

      setIsEditing(false);
    },
    [
      room.shape,
      room.id,
      stageSize.width,
      stageSize.height,
      setIsEditing,
      workspaceRef,
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

      // we will reset it back
      node.scaleX(1);
      node.scaleY(1);

      // checkIf outside the stage, Imperatively set back the values

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
      } else {
        onUpdateRoomShape({
          roomId: room.id,
          shape: newShape,
        });
      }

      setIsEditing(false);
    },
    [room, stageSize.width, stageSize.height, setIsEditing, onUpdateRoomShape],
  );

  const events = useMemo(() => {
    if (draggingRoomId) {
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
  ]);

  const fill = useMemo(() => {
    if (room?.shape?.isOverlapped) {
      return '#FF3B3050';
    }

    if (room?.id === glowingRoom?.id) {
      return '#00ff4050';
    }

    return '#34C75950';
  }, [glowingRoom?.id, room?.id, room?.shape?.isOverlapped]);

  const stroke = useMemo(() => {
    if (room?.shape?.isOverlapped) {
      return '#FF3B30';
    }

    if (room?.id === glowingRoom?.id) {
      return '#00ff40';
    }

    return '#34C759';
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
        width={(room?.shape?.width * stageSize.width) / 100}
        x={(room?.shape?.x * stageSize.width) / 100}
        y={(room?.shape?.y * stageSize.height) / 100}
        {...events}
      />
      {selectingRoom?.id === room.id ? (
        <Transformer
          anchorCornerRadius={4}
          anchorFill="true"
          anchorStroke={COLOR.secondary}
          anchorStrokeWidth={2}
          borderStroke={COLOR.primary}
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
