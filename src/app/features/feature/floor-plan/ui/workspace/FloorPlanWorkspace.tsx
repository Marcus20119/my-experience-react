import { Flex } from 'antd';
import type Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import { checkOverflowedDesk } from '@/app/features/feature/floor-plan/lib';
import type { RoomShapeEntity } from '@/app/features/feature/floor-plan/model';

import FloorPlanItem from '../items';
import FloorPlanImageLayer from './FloorPlanImageLayer';
import FloorPlanItemActions from './FloorPlanItemActions';
import OverlayLayer from './OverlayLayer';

function FloorPlanWorkspace() {
  const {
    draggingRoomId,
    glowingRoom,
    onUpdateDeskShape,
    onUpdateRoomShape,
    pickingDeskId,
    rooms,
    setDraggingRoomId,
    setPickingDeskId,
    setSelectingDesk,
    setSelectingRoom,
    stageRef,
    stageSize,
    workspaceRef,
    workspaceSize,
  } = useFloorPlanEditorContext();

  const [newRoomShape, setNewRoomShape] = useState<RoomShapeEntity>();

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    const { x: pointerX, y: pointerY } = e.target
      .getStage()
      ?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

    const x = (pointerX / stageSize.width) * 100;
    const y = (pointerY / stageSize.height) * 100;

    if (draggingRoomId) {
      setNewRoomShape({
        height: 0,
        id: uuidv4(),
        width: 0,
        x,
        y,
        zIndex: 1, // FIX_ME
      });
    }

    if (
      pickingDeskId &&
      glowingRoom &&
      !checkOverflowedDesk({ deskPosition: { x, y }, room: glowingRoom })
    ) {
      onUpdateDeskShape({
        deskId: pickingDeskId,
        shape: {
          id: pickingDeskId,
          x,
          y,
          zIndex: 1, // FIX_ME
        },
      });

      setPickingDeskId(null);
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

      onUpdateRoomShape({
        roomId: draggingRoomId,
        shape: {
          height: Math.abs(height),
          id: draggingRoomId,
          rotation: 0,
          width: Math.abs(width),
          x: roomX,
          y: roomY,
          zIndex: 1,
        },
      });

      setNewRoomShape(undefined);
      setDraggingRoomId(null);
      document.body.style.cursor = 'default';
    }
  };

  const desks = rooms?.flatMap(room => room.desks || []);

  return (
    <Flex
      align="center"
      className="overflow-auto transition-all"
      ref={workspaceRef}
      style={{
        height: workspaceSize.height,
        width: workspaceSize.width,
      }}
    >
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
            {rooms.map(room => {
              if (!room?.shape) return null;

              return <FloorPlanItem.Room key={room.id} room={room} />;
            })}

            {desks.map(desk => {
              if (!desk.shape) return null;

              return <FloorPlanItem.Desk desk={desk} key={desk.id} />;
            })}

            {newRoomShape ? (
              <Rect
                fill="#34C75950"
                height={(newRoomShape?.height * stageSize.height) / 100}
                key="newRoomShape"
                stroke="#34C759"
                width={(newRoomShape?.width * stageSize.width) / 100}
                x={(newRoomShape?.x * stageSize.width) / 100}
                y={(newRoomShape?.y * stageSize.height) / 100}
              />
            ) : null}
          </Layer>
        </Stage>

        <FloorPlanItemActions zIndex={30} />
      </div>
    </Flex>
  );
}

export default FloorPlanWorkspace;
