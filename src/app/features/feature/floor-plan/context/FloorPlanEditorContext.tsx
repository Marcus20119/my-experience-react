import type Konva from 'konva';
import type { RefObject } from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';
import useImage from 'use-image';

import {
  checkOverlappedRoom,
  useGetContainerSize,
  useInitialFloorPlanEvents,
} from '../lib';
import type {
  CircleShapeEntity,
  DeskEntity,
  FloorPlanSize,
  RectShapeEntity,
  RoomEntity,
} from '../model';
import { FLOOR_PLAN_SIZE } from '../model';

interface UpdateRoomShapeProps {
  roomId: string;
  shape: RectShapeEntity;
}

interface UpdateDeskShapeProps {
  deskId: string;
  shape: CircleShapeEntity;
}

export interface FloorPlanEditorExternalContextProps {
  floorPlanUrl: string;
  height: number;
  initialRooms?: RoomEntity[];
  width: number;
}

interface FloorPlanEditorInternalContextProps {
  draggingRoomId: null | string;
  glowingRoom?: RoomEntity;
  isEditing: boolean;
  onUpdateDeskShape: (props: UpdateDeskShapeProps) => void;
  onUpdateRoomShape: (props: UpdateRoomShapeProps) => void;
  pickingDeskId: null | string;
  rooms: RoomEntity[];
  selectingDesk: DeskEntity | null;
  selectingRoom: null | RoomEntity;
  setDraggingRoomId: React.Dispatch<React.SetStateAction<null | string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setPickingDeskId: React.Dispatch<React.SetStateAction<null | string>>;
  setSelectingDesk: React.Dispatch<React.SetStateAction<DeskEntity | null>>;
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
  onUpdateDeskShape: () => null,
  onUpdateRoomShape: () => null,
  pickingDeskId: null,
  rooms: [],
  selectingDesk: null,
  selectingRoom: null,
  setDraggingRoomId: () => null,
  setIsEditing: () => false,
  setPickingDeskId: () => null,
  setSelectingDesk: () => null,
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
  const [pickingDeskId, setPickingDeskId] = useState<null | string>(null);
  const [selectingDesk, setSelectingDesk] = useState<DeskEntity | null>(null);
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

  const onUpdateRoomShape = ({ roomId, shape }: UpdateRoomShapeProps) => {
    if (roomId) {
      setRooms(currentRooms => {
        const newRooms = currentRooms?.map(room => {
          if (room.id === roomId) {
            const newRoom: RoomEntity = {
              ...room,
              desks: room.desks?.map(desk => ({
                ...desk,
                shape: desk?.shape
                  ? {
                      ...desk.shape,
                      x:
                        shape.x +
                        ((desk.shape.x - (room?.shape?.x || 0)) /
                          (room?.shape?.width || 1)) *
                          shape.width,
                      y:
                        shape.y +
                        ((desk.shape.y - (room?.shape?.y || 0)) /
                          (room?.shape?.height || 1)) *
                          shape.height,
                    }
                  : undefined,
              })),
              shape: {
                ...room.shape,
                ...shape,
              },
            };

            return newRoom;
          }

          return room;
        });

        const checkedOverlappedRooms = newRooms?.map(room => {
          const otherRooms = newRooms?.filter(item => room.id !== item.id);

          const isOverlapped = otherRooms.some(otherRoom =>
            checkOverlappedRoom(room, otherRoom),
          );

          return {
            ...room,
            shape: room.shape
              ? {
                  ...room.shape,
                  isOverlapped,
                }
              : undefined,
          };
        });

        return checkedOverlappedRooms;
      });
    }
  };

  const glowingRoom = useMemo(
    () =>
      rooms?.find(room =>
        room?.desks?.some(
          desk => desk.id === pickingDeskId || desk.id === selectingDesk?.id,
        ),
      ),
    [pickingDeskId, rooms, selectingDesk?.id],
  );

  const onUpdateDeskShape = ({ deskId, shape }: UpdateDeskShapeProps) => {
    if (deskId && glowingRoom) {
      setRooms(currentRooms => {
        const newRooms = currentRooms?.map(room => {
          if (room.id === glowingRoom.id) {
            return {
              ...room,
              desks: room.desks?.map(desk => {
                if (desk.id === deskId) {
                  return {
                    ...desk,
                    shape: {
                      ...desk.shape,
                      ...shape,
                    },
                  };
                }

                return desk;
              }),
            };
          }

          return room;
        });

        return newRooms;
      });
    }
  };

  const internalContext: FloorPlanEditorInternalContextProps = {
    draggingRoomId,
    glowingRoom,
    isEditing,
    onUpdateDeskShape,
    onUpdateRoomShape,
    pickingDeskId,
    rooms,
    selectingDesk,
    selectingRoom,
    setDraggingRoomId,
    setIsEditing,
    setPickingDeskId,
    setSelectingDesk,
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
