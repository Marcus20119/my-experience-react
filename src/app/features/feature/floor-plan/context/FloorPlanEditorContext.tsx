import type Konva from 'konva';
import type { RefObject } from 'react';
import { createContext, useContext, useRef, useState } from 'react';
import useImage from 'use-image';

import {
  checkOverlappedRoom,
  useGetContainerSize,
  useInitialFloorPlanEvents,
} from '../lib';
import type { FloorPlanSize, RectShapePropEntity, RoomEntity } from '../model';
import { FLOOR_PLAN_SIZE } from '../model';

interface UpdateRoomShapeProps {
  roomId: string;
  shape: RectShapePropEntity;
}

export interface FloorPlanEditorExternalContextProps {
  floorPlanUrl: string;
  height: number;
  initialRooms?: RoomEntity[];
  width: number;
}

interface FloorPlanEditorInternalContextProps {
  draggingRoomId: null | string;
  isEditing: boolean;
  onUpdateRoomShape: (props: UpdateRoomShapeProps) => void;
  rooms: RoomEntity[];
  selectingRoom: null | RoomEntity;
  setDraggingRoomId: React.Dispatch<React.SetStateAction<null | string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectingRoom: React.Dispatch<React.SetStateAction<null | RoomEntity>>;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  stageRef: null | RefObject<Konva.Stage>;
  stageSize: FloorPlanSize;
  workspaceRef: null | RefObject<HTMLDivElement>;
  workspaceSize: FloorPlanSize;
  zoomLevel: number;
}

const FloorPlanEditorContext = createContext<
  FloorPlanEditorExternalContextProps & FloorPlanEditorInternalContextProps
>({
  draggingRoomId: null,
  floorPlanUrl: '',
  height: 0,
  isEditing: false,
  onUpdateRoomShape: () => null,
  rooms: [],
  selectingRoom: null,
  setDraggingRoomId: () => null,
  setIsEditing: () => false,
  setSelectingRoom: () => null,
  setZoomLevel: () => 0,
  stageRef: null,
  stageSize: { height: 0, width: 0 },
  width: 0,
  workspaceRef: null,
  workspaceSize: { height: 0, width: 0 },
  zoomLevel: 1,
});

interface ProviderProps extends FloorPlanEditorExternalContextProps {
  children: React.ReactNode;
}

export function FloorPlanEditorProvider({
  children,
  initialRooms = [],
  ...props
}: ProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [rooms, setRooms] = useState<RoomEntity[]>(initialRooms);
  const [draggingRoomId, setDraggingRoomId] = useState<null | string>(null);
  const [selectingRoom, setSelectingRoom] = useState<null | RoomEntity>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [img] = useImage(props.floorPlanUrl, 'anonymous');

  const workspaceSize = {
    height:
      props.height -
      (FLOOR_PLAN_SIZE.footerHeight +
        FLOOR_PLAN_SIZE.headerHeight +
        FLOOR_PLAN_SIZE.padding * 2),
    width:
      props.width -
      (FLOOR_PLAN_SIZE.roomMenuWidth + FLOOR_PLAN_SIZE.padding * 3),
  };

  const originalStageSize = useGetContainerSize({
    frameSize: workspaceSize,
    stageSize: {
      height: img?.height,
      width: img?.width,
    },
  });

  const stageSize = {
    height: originalStageSize.height * zoomLevel,
    width: originalStageSize.width * zoomLevel,
  };

  useInitialFloorPlanEvents({
    setZoomLevel,
    workspaceRef,
  });

  const onUpdateRoomShape = ({
    roomId,
    shape,
  }: {
    roomId?: null | string;
    shape: RectShapePropEntity;
  }) => {
    if (roomId) {
      setRooms(
        rooms.map(room => {
          if (room.id === roomId) {
            const newRoom = {
              ...room,
              shape: {
                ...room.shape,
                ...shape,
              },
            };

            const otherRooms = rooms.filter(room => room.id !== roomId);
            const isOverlapped = otherRooms.some(otherRoom =>
              checkOverlappedRoom(newRoom, otherRoom),
            );

            return {
              ...newRoom,
              shape: {
                ...newRoom.shape,
                isOverlapped,
              },
            };
          }

          return room;
        }),
      );
    }
  };

  const internalContext: FloorPlanEditorInternalContextProps = {
    draggingRoomId,
    isEditing,
    onUpdateRoomShape,
    rooms,
    selectingRoom,
    setDraggingRoomId,
    setIsEditing,
    setSelectingRoom,
    setZoomLevel,
    stageRef,
    stageSize,
    workspaceRef,
    workspaceSize,
    zoomLevel,
  };

  return (
    <FloorPlanEditorContext.Provider value={{ ...props, ...internalContext }}>
      {children}
    </FloorPlanEditorContext.Provider>
  );
}

export function useFloorPlanEditorContext() {
  const context = useContext(FloorPlanEditorContext);

  if (typeof context === 'undefined') {
    throw new Error(
      'useFloorPlanEditorContext must be used within FloorPlanEditorContext',
    );
  }

  return context;
}
