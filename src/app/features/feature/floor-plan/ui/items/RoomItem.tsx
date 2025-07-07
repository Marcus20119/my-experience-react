import type Konva from 'konva';
import { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import type {
  RectShapePropEntity,
  RoomEntity,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  room: RoomEntity;
}

function RoomItem({ room }: Props) {
  const shapeRef = useRef<Konva.Rect>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const {
    draggingRoomId,
    onUpdateRoomShape,
    selectingRoom,
    setIsEditing,
    setSelectingRoom,
    stageSize,
  } = useFloorPlanEditorContext();

  // Attach the transformer to the image
  useEffect(() => {
    if (selectingRoom?.id === room.id && trRef.current && shapeRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [room.id, selectingRoom?.id]);

  if (!room?.shape) return null;

  const onToggleSelectingRoom = () => {
    if (selectingRoom?.id === room.id) {
      setSelectingRoom(null);
    } else {
      setSelectingRoom(room);
    }
  };

  const onClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    onToggleSelectingRoom();
  };

  const onTap = (e: Konva.KonvaEventObject<TouchEvent>) => {
    e.cancelBubble = true;
    onToggleSelectingRoom();
  };

  const onMouseEnter = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'move';
  };

  const onMouseLeave = (e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;

    if (draggingRoomId) {
      document.body.style.cursor = 'crosshair';
    } else {
      document.body.style.cursor = 'default';
    }
  };

  const onDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'move';
    setIsEditing(true);
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    e.cancelBubble = true;
    const node = shapeRef.current;

    if (!node || !room?.shape) return;

    const newShape: RectShapePropEntity = {
      ...room?.shape,
      x: (node.x() * 100) / stageSize.width,
      y: (node.y() * 100) / stageSize.height,
    };

    onUpdateRoomShape({
      roomId: room.id,
      shape: newShape,
    });
    setIsEditing(false);
  };

  const onTransformStart = (e: Konva.KonvaEventObject<Event>) => {
    e.cancelBubble = true;
    setIsEditing(true);
  };

  const onTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    e.cancelBubble = true;
    const node = shapeRef.current;

    if (!node || !room?.shape) return;

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const x = (node.x() * 100) / stageSize.width;
    const y = (node.y() * 100) / stageSize.height;
    const rotation = node.rotation();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);

    const newShape = {
      ...room?.shape,
      height: (node.height() * scaleY * 100) / stageSize.height,
      rotation,
      width: (node.width() * scaleX * 100) / stageSize.width,
      x,
      y,
    };

    onUpdateRoomShape({
      roomId: room.id,
      shape: newShape,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Rect
        draggable
        fill={room?.shape?.isOverlapped ? '#FF3B3050' : '#34C75950'}
        height={(room?.shape?.height * stageSize.height) / 100}
        key={room.id}
        offsetX={(room?.shape?.width * stageSize.width) / 200}
        offsetY={(room?.shape?.height * stageSize.height) / 200}
        onClick={onClick}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onTap={onTap}
        onTransformEnd={onTransformEnd}
        onTransformStart={onTransformStart}
        ref={shapeRef}
        stroke={room?.shape?.isOverlapped ? '#FF3B30' : '#34C759'}
        width={(room?.shape?.width * stageSize.width) / 100}
        x={(room?.shape?.x * stageSize.width) / 100}
        y={(room?.shape?.y * stageSize.height) / 100}
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
