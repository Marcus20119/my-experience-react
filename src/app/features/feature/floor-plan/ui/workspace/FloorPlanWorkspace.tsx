import { Flex } from 'antd';
import type Konva from 'konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useState } from 'react';
import { Layer, Rect, Stage } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';

import { useFloorPlanEditorContext } from '@/app/features/feature/floor-plan/context';
import type { RectShapePropEntity } from '@/app/features/feature/floor-plan/model';

import FloorPlanItem from '../items';
import FloorPlanImageLayer from './FloorPlanImageLayer';

function FloorPlanWorkspace() {
  const {
    draggingRoomId,
    onUpdateRoomShape,
    rooms,
    setDraggingRoomId,
    setSelectingRoom,
    stageRef,
    stageSize,
    workspaceRef,
    workspaceSize,
  } = useFloorPlanEditorContext();

  const [newRoomShape, setNewRoomShape] = useState<RectShapePropEntity>();

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (!draggingRoomId) return;

    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };
    setNewRoomShape({
      height: 0,
      id: uuidv4(),
      width: 0,
      x: (x / stageSize.width) * 100,
      y: (y / stageSize.height) * 100,
      zIndex: 1,
    });
  };

  const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!newRoomShape) return;

    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };
    setNewRoomShape({
      ...newRoomShape,
      height: (y / stageSize.height) * 100 - newRoomShape.y,
      width: (x / stageSize.width) * 100 - newRoomShape.x,
    });
  };

  const handleMouseUp = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!newRoomShape || !draggingRoomId) return;

    const { x, y } = e.target.getStage()?.getPointerPosition() || {
      x: 0,
      y: 0,
    };

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
  };

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
        <Stage
          className="absolute z-10"
          height={stageSize.height}
          onClick={() => setSelectingRoom(null)}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTap={() => setSelectingRoom(null)}
          ref={stageRef}
          width={stageSize.width}
        >
          <Layer>
            {rooms.map(room => {
              if (!room?.shape) {
                return null;
              }

              return <FloorPlanItem.Room key={room.id} room={room} />;
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
      </div>
    </Flex>
  );
}

export default FloorPlanWorkspace;
