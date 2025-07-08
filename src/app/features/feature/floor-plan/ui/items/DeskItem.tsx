import type Konva from 'konva';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { checkOverflowedDesk } from '@/app/features/feature/floor-plan/lib';
import type {
  CircleShapeEntity,
  DeskEntity,
} from '@/app/features/feature/floor-plan/model';
import { COLOR } from '@/shared/assets/styles/constants';

interface Props {
  desk: DeskEntity;
}

function DeskItem({ desk }: Props) {
  const trRef = useRef<Konva.Transformer>(null);
  const imgRef = useRef<Konva.Image>(null);

  const [img] = useImage('/images/desk.png', 'anonymous');
  const {
    draggingRoomId,
    onUpdateDeskShape,
    pickingDeskId,
    rooms,
    selectingDesk,
    setIsEditing,
    setSelectingDesk,
    setSelectingRoom,
    stageSize,
  } = useFloorPlanEditorContext();

  const room = rooms?.find(room =>
    room.desks?.some(item => item.id === desk.id),
  );

  // Attach the transformer to the image
  useEffect(() => {
    if (selectingDesk?.id === desk.id && trRef.current && imgRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [desk.id, selectingDesk?.id]);

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

  const onMouseEnter = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'move';
  }, []);

  const onMouseLeave = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true;
    document.body.style.cursor = 'default';
  }, []);

  const onDragStart = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      document.body.style.cursor = 'move';
      setIsEditing(true);
    },
    [setIsEditing],
  );

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      e.cancelBubble = true;
      const node = imgRef.current;

      if (!node || !desk?.shape) return;

      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;

      const newShape: CircleShapeEntity = {
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
          height: desk.shape.radiusInPx * 2,
          offsetX: desk.shape.radiusInPx,
          offsetY: desk.shape.radiusInPx,
          width: desk.shape.radiusInPx * 2,
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

      const scaleX = node.scaleX();

      // we will reset it back
      node.scaleX(1);
      node.scaleY(1);

      const x = (node.x() * 100) / stageSize.width;
      const y = (node.y() * 100) / stageSize.height;

      const newShape: CircleShapeEntity = {
        ...desk.shape,
        radiusInPx: desk.shape.radiusInPx * scaleX, // FIX_ME
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
          height: desk.shape.radiusInPx * 2,
          offsetX: desk.shape.radiusInPx,
          offsetY: desk.shape.radiusInPx,
          width: desk.shape.radiusInPx * 2,
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
      onUpdateDeskShape,
      room,
      setIsEditing,
      stageSize.height,
      stageSize.width,
    ],
  );

  const events = useMemo(() => {
    if (draggingRoomId || pickingDeskId) return undefined;

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

  if (!desk?.shape) return null;

  return (
    <>
      <Image
        cornerRadius={100}
        draggable
        height={desk.shape.radiusInPx * 2}
        image={img}
        offsetX={desk.shape.radiusInPx}
        offsetY={desk.shape.radiusInPx}
        ref={imgRef}
        rotation={desk.shape.rotation}
        stroke={COLOR.neutral['300']}
        strokeWidth={2}
        width={desk.shape.radiusInPx * 2}
        x={(desk.shape.x * stageSize.width) / 100}
        y={(desk.shape.y * stageSize.height) / 100}
        {...events}
      />

      {selectingDesk?.id === desk.id ? (
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
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ]}
          flipEnabled={false}
          ref={trRef}
          rotateEnabled={false}
          rotationSnaps={[0, 45, 90, 135, 180, 235, 270]}
        />
      ) : null}
    </>
  );
}

export default DeskItem;
