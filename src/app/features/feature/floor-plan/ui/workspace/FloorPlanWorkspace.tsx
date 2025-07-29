import type Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layer, Rect, Stage } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import {
  checkOverflowedDesk,
  checkOverlappedRoom,
} from '@/app/features/feature/floor-plan/lib';
import {
  type FloorPlanRoomShapeEntity,
  ROOM_COLOR,
} from '@/app/features/feature/floor-plan/model';
import { ToastMessage } from '@/shared/components';

import FloorPlanAction from '../actions';
import FloorPlanItem from '../items';
import FloorPlanImageLayer from './FloorPlanImageLayer';
import NameLayer from './NameLayer';
import OverlayLayer from './OverlayLayer';
import { StyledFloorPlanWorkspace } from './styles';
import UploadFloorPlan from './UploadFloorPlan';

function FloorPlanWorkspace() {
  const { t } = useTranslation();
  const {
    allowEdit,
    draggingRoomId,
    floorPlanImage,
    getDataLoading,
    glowingRoom,
    isEditing,
    onUpdateDeskShape,
    onUpdateRoomShape,
    pickingDeskId,
    rooms,
    selectingDesk,
    selectingRoom,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
    setZoomLevel,
    stageRef,
    stageSize,
    toastMessageRef,
    workspaceRef,
    workspaceSize,
    zoomLevel,
  } = useFloorPlanEditorContext();

  const [newRoomShape, setNewRoomShape] = useState<FloorPlanRoomShapeEntity>();

  const renderedRooms = rooms?.filter(room => room.shape) || [];
  const renderedDesks =
    renderedRooms
      ?.flatMap(room => room.desks || [])
      ?.filter(desk => desk.shape) || [];

  /**
   * Long Nguyen (16/07/25): Handle add new item to the floor plan
   * - Room: Only add new room when the mouse is up (create a fake room in the process: mouse down - move - up)
   * - Desk: Add new desk when the mouse is down immediately
   */

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const { x: pointerX, y: pointerY } = e.target
      .getStage()
      ?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

    const x = (pointerX / stageSize.width) * 100;
    const y = (pointerY / stageSize.height) * 100;

    if (draggingRoomId && !newRoomShape) {
      setNewRoomShape({
        height: 0,
        id: uuidv4(),
        width: 0,
        x,
        y,
        zIndex: renderedRooms?.length || 0,
      });
    }

    if (pickingDeskId && glowingRoom) {
      const isOverflowed = checkOverflowedDesk({
        deskPosition: { x, y },
        room: glowingRoom,
      });

      if (isOverflowed) {
        toastMessageRef?.current?.showError({
          description: t('feature.floorPlan.error.overflowDesk'),
        });
      } else {
        const mappedDesks = glowingRoom?.desks?.filter(desk => desk?.shape);
        const roomZIndex = glowingRoom?.shape?.zIndex || 0;

        onUpdateDeskShape({
          deskId: pickingDeskId,
          shape: {
            id: pickingDeskId,
            x,
            y,
            /**
             * Long Nguyen (16/07/25): Make sure all the desks will not be overlapped with each other zIndex
             * Assume each room has less than 100 desks
             */
            zIndex: roomZIndex * 100 + (mappedDesks?.length || 0),
          },
        });

        setPickingDeskId(null);
      }
    }
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

    if (newRoomShape) {
      setNewRoomShape({
        ...newRoomShape,
        height: (y / stageSize.height) * 100 - newRoomShape.y,
        width: (x / stageSize.width) * 100 - newRoomShape.x,
      });
    }
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

    if (newRoomShape && draggingRoomId) {
      const height = (y / stageSize.height) * 100 - newRoomShape.y;
      const width = (x / stageSize.width) * 100 - newRoomShape.x;

      const roomX = (x / stageSize.width) * 100 - width / 2;
      const roomY = (y / stageSize.height) * 100 - height / 2;

      const newShape: FloorPlanRoomShapeEntity = {
        height: Math.max(Math.abs(height), 5),
        id: draggingRoomId,
        rotation: 0,
        width: Math.max(Math.abs(width), 5),
        x: roomX,
        y: roomY,
        zIndex: newRoomShape.zIndex,
      };

      onUpdateRoomShape({
        roomId: draggingRoomId,
        shape: newShape,
      });

      const otherRooms =
        rooms?.filter(item => item.id !== draggingRoomId) || [];
      const room = rooms?.find(item => item.id === draggingRoomId);

      if (room) {
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
            description: t('feature.floorPlan.error.overlappedMappedRoom'),
          });
        }
      }

      setNewRoomShape(undefined);
      setDraggingRoomId(null);
      document.body.style.cursor = 'default';
    }
  };

  return (
    <StyledFloorPlanWorkspace
      className="flex items-center overflow-auto rounded-xl bg-neutral-200 transition-all"
      ref={workspaceRef}
      style={{
        height: workspaceSize.height,
        width: workspaceSize.width,
      }}
    >
      {floorPlanImage ? (
        <>
          <div
            className="relative m-auto flex-shrink-0 bg-neutral-0 shadow-card-lg"
            onMouseEnter={e => {
              e.preventDefault();

              if (draggingRoomId) {
                document.body.style.cursor = 'crosshair';
              }

              if (pickingDeskId) {
                document.body.style.cursor = 'not-allowed';
              }
            }}
            onMouseLeave={e => {
              e.preventDefault();
              document.body.style.cursor = 'default';
            }}
            style={{
              height: stageSize.height,
              width: stageSize.width,
            }}
          >
            <FloorPlanImageLayer zIndex={0} />
            {glowingRoom ? <OverlayLayer zIndex={10} /> : null}

            <Stage
              className="absolute z-20"
              height={stageSize.height}
              onClick={() => {
                setSelectingRoom(null);
                setSelectingDesk(null);
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTap={() => {
                setSelectingRoom(null);
                setSelectingDesk(null);
              }}
              ref={stageRef}
              width={stageSize.width}
            >
              <Layer>
                {renderedRooms.map(room => (
                  <FloorPlanItem.Room key={room.id} room={room} />
                ))}

                {renderedDesks.map(desk => (
                  <FloorPlanItem.Desk desk={desk} key={desk.id} />
                ))}

                {newRoomShape ? (
                  <Rect
                    fill={ROOM_COLOR.default.bg}
                    height={(newRoomShape?.height * stageSize.height) / 100}
                    stroke={ROOM_COLOR.default.border}
                    width={(newRoomShape?.width * stageSize.width) / 100}
                    x={(newRoomShape?.x * stageSize.width) / 100}
                    y={(newRoomShape?.y * stageSize.height) / 100}
                  />
                ) : null}
              </Layer>
            </Stage>

            {selectingRoom && !isEditing ? (
              <NameLayer room={selectingRoom} zIndex={999} />
            ) : null}
            {selectingDesk && !isEditing ? (
              <NameLayer desk={selectingDesk} zIndex={999} />
            ) : null}
            {glowingRoom ? <NameLayer room={glowingRoom} zIndex={999} /> : null}

            <FloorPlanAction.Item zIndex={999} />
          </div>

          {stageSize?.height && stageSize?.width ? (
            <>
              {renderedDesks?.length && allowEdit ? (
                <FloorPlanAction.ResizeDesk zIndex={999} />
              ) : null}
              <FloorPlanAction.Zoom
                setZoomLevel={setZoomLevel}
                zIndex={999}
                zoomLevel={zoomLevel}
              />
            </>
          ) : null}
        </>
      ) : (
        <UploadFloorPlan disabled={getDataLoading} />
      )}

      <ToastMessage ref={toastMessageRef} zIndex={1000} />
    </StyledFloorPlanWorkspace>
  );
}

export default FloorPlanWorkspace;
