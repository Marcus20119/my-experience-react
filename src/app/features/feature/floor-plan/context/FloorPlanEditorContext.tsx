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
  DeskEntity,
  DeskShapeEntity,
  FloorPlanSize,
  RoomEntity,
  RoomShapeEntity,
} from '../model';
import { FLOOR_PLAN_SIZE } from '../model';

interface UpdateRoomShapeProps {
  roomId: string;
  shape: RoomShapeEntity;
}

interface UpdateDeskShapeProps {
  deskId: string;
  shape: DeskShapeEntity;
}

export interface FloorPlanEditorExternalContextProps {
  floorPlanUrl: string;
  height: number;
  initialDeskSize?: number;
  initialRooms?: RoomEntity[];
  width: number;
}

interface FloorPlanEditorInternalContextProps {
  deskSize: number;
  draggingRoomId: null | string;
  glowingRoom?: RoomEntity;
  isEditing: boolean;
  onRemoveDeskShape: (deskId: string) => void;
  onRemoveRoomShape: (roomId: string) => void;
  onUpdateDeskShape: (props: UpdateDeskShapeProps) => void;
  onUpdateRoomShape: (props: UpdateRoomShapeProps) => void;
  pickingDeskId: null | string;
  rooms: RoomEntity[];
  selectingDesk: DeskEntity | null;
  selectingRoom: null | RoomEntity;
  setDeskSize: React.Dispatch<React.SetStateAction<number>>;
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
  deskSize: 15,
  draggingRoomId: null,
  floorPlanUrl: '',
  height: 0,
  isEditing: false,
  onRemoveDeskShape: () => null,
  onRemoveRoomShape: () => null,
  onUpdateDeskShape: () => null,
  onUpdateRoomShape: () => null,
  pickingDeskId: null,
  rooms: [],
  selectingDesk: null,
  selectingRoom: null,
  setDeskSize: () => 0,
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
  initialDeskSize = 15,
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
  const [deskSize, setDeskSize] = useState(initialDeskSize);

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

  const glowingRoom = useMemo(
    () =>
      rooms?.find(room =>
        room?.desks?.some(
          desk => desk.id === pickingDeskId || desk.id === selectingDesk?.id,
        ),
      ),
    [pickingDeskId, rooms, selectingDesk?.id],
  );

  const onUpdateRoomShape = ({ roomId, shape }: UpdateRoomShapeProps) => {
    if (roomId) {
      setRooms(currentRooms => {
        const newRooms = currentRooms?.map(room => {
          if (room.id === roomId) {
            const isChangedSize =
              room.shape?.width !== shape.width ||
              room.shape?.height !== shape.height;

            const newRoom: RoomEntity = {
              ...room,
              desks: room.desks?.map(desk => ({
                ...desk,
                shape:
                  desk?.shape && !isChangedSize
                    ? {
                        ...desk.shape,
                        x: shape.x + (desk.shape.x - (room?.shape?.x || 0)),
                        y: shape.y + (desk.shape.y - (room?.shape?.y || 0)),
                      }
                    : desk.shape,
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

      if (selectingRoom) {
        setSelectingRoom(room =>
          room
            ? {
                ...room,
                shape: {
                  ...room.shape,
                  ...shape,
                },
              }
            : null,
        );
      }
    }
  };

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

      if (selectingDesk) {
        setSelectingDesk(desk =>
          desk
            ? {
                ...desk,
                shape: {
                  ...desk.shape,
                  ...shape,
                },
              }
            : null,
        );
      }
    }
  };

  const onRemoveRoomShape = (roomId: string) => {
    if (roomId) {
      setRooms(currentRooms => {
        const newRooms = currentRooms?.map(room => {
          if (room.id === roomId) {
            return {
              ...room,
              desks: room.desks?.map(desk => ({
                ...desk,
                shape: undefined,
              })),
              shape: undefined,
            };
          }

          return room;
        });

        return newRooms;
      });
    }

    setSelectingRoom(null);
  };

  const onRemoveDeskShape = (deskId: string) => {
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
                    shape: undefined,
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

    setSelectingDesk(null);
  };

  const internalContext: FloorPlanEditorInternalContextProps = {
    deskSize,
    draggingRoomId,
    glowingRoom,
    isEditing,
    onRemoveDeskShape,
    onRemoveRoomShape,
    onUpdateDeskShape,
    onUpdateRoomShape,
    pickingDeskId,
    rooms,
    selectingDesk,
    selectingRoom,
    setDeskSize,
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
