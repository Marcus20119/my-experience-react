/* eslint-disable max-lines */
import type Konva from 'konva';
import type { RefObject } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import useImage from 'use-image';

import type { ToastMessageRef } from '@/shared/components';
import { FileTool } from '@/shared/utils/file';

import {
  checkOverlappedRoom,
  useFloorPlanZoomEvents,
  useGetContainerSize,
} from '../lib';
import type {
  FloorPlanDeskItemEntity,
  FloorPlanDeskShapeEntity,
  FloorPlanRoomItemEntity,
  FloorPlanRoomShapeEntity,
  FloorPlanSize,
  FloorPlanValue,
} from '../model';
import { DEFAULT_DESK_SIZE, FLOOR_PLAN_EDITOR_SIZE } from '../model';

const { splitFileUrl } = FileTool;

interface UpdateRoomShapeProps {
  roomId: string;
  shape: FloorPlanRoomShapeEntity;
}

interface UpdateDeskShapeProps {
  deskId: string;
  shape: FloorPlanDeskShapeEntity;
}

export interface FloorPlanEditorExternalContextProps {
  allowEdit?: boolean;
  getDataLoading?: boolean;
  height: number;
  initialDeskSize?: number;
  initialFloorPlanImage?: string;
  initialRooms?: FloorPlanRoomItemEntity[];
  onChange?: (value: FloorPlanValue) => void;
  width: number;
}

interface FloorPlanEditorInternalContextProps {
  deskSize: number;
  draggingRoomId: null | string;
  floorPlanImage?: string;
  glowingRoom?: FloorPlanRoomItemEntity;
  handleChangeDeskSize: (deskSize: number) => void;
  handleChangeFloorPlanImage: (floorPlanImage?: string) => void;
  handleResetFloorPlan: () => void;
  isEditing: boolean;
  onRemoveDeskShape: (deskId: string) => void;
  onRemoveRoomShape: (roomId: string) => void;
  onUpdateDeskShape: (props: UpdateDeskShapeProps) => void;
  onUpdateRoomShape: (props: UpdateRoomShapeProps) => void;
  pickingDeskId: null | string;
  rooms: FloorPlanRoomItemEntity[];
  selectingDesk: FloorPlanDeskItemEntity | null;
  selectingRoom: FloorPlanRoomItemEntity | null;
  setDraggingRoomId: React.Dispatch<React.SetStateAction<null | string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setPickingDeskId: React.Dispatch<React.SetStateAction<null | string>>;
  setSelectingDesk: React.Dispatch<
    React.SetStateAction<FloorPlanDeskItemEntity | null>
  >;
  setSelectingRoom: React.Dispatch<
    React.SetStateAction<FloorPlanRoomItemEntity | null>
  >;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;
  stageRef: null | RefObject<Konva.Stage>;
  stageSize: FloorPlanSize;
  toastMessageRef: null | RefObject<ToastMessageRef>;
  workspaceRef: null | RefObject<HTMLDivElement>;
  workspaceSize: FloorPlanSize;
  zoomLevel: number;
}

const FloorPlanEditorContext = createContext<
  FloorPlanEditorExternalContextProps & FloorPlanEditorInternalContextProps
>({
  allowEdit: true,
  deskSize: DEFAULT_DESK_SIZE,
  draggingRoomId: null,
  floorPlanImage: undefined,
  handleChangeDeskSize: () => null,
  handleChangeFloorPlanImage: () => null,
  handleResetFloorPlan: () => null,
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
  setDraggingRoomId: () => null,
  setIsEditing: () => false,
  setPickingDeskId: () => null,
  setSelectingDesk: () => null,
  setSelectingRoom: () => null,
  setZoomLevel: () => 0,
  stageRef: null,
  stageSize: { height: 0, width: 0 },
  toastMessageRef: null,
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
  initialDeskSize = DEFAULT_DESK_SIZE,
  initialFloorPlanImage,
  initialRooms = [],
  onChange,
  ...props
}: ProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const toastMessageRef = useRef<ToastMessageRef>(null);

  const { t } = useTranslation();

  const [floorPlanImage, setFloorPlanImage] = useState(initialFloorPlanImage);
  const [rooms, setRooms] = useState<FloorPlanRoomItemEntity[]>(initialRooms);
  const [deskSize, setDeskSize] = useState(initialDeskSize);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [draggingRoomId, setDraggingRoomId] = useState<null | string>(null);
  const [selectingRoom, setSelectingRoom] =
    useState<FloorPlanRoomItemEntity | null>(null);
  const [pickingDeskId, setPickingDeskId] = useState<null | string>(null);
  const [selectingDesk, setSelectingDesk] =
    useState<FloorPlanDeskItemEntity | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { url } = splitFileUrl(floorPlanImage);
  const [img] = useImage(url || '');

  const workspaceSize = {
    height: props.height - FLOOR_PLAN_EDITOR_SIZE.padding * 2,
    width:
      props.width -
      (FLOOR_PLAN_EDITOR_SIZE.roomMenuWidth +
        FLOOR_PLAN_EDITOR_SIZE.padding * 3),
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

  useFloorPlanZoomEvents({
    floorPlanImage,
    setZoomLevel,
    workspaceRef,
  });

  const handleResetFloorPlan = () => {
    setFloorPlanImage(initialFloorPlanImage);
    setRooms(initialRooms);
    setDeskSize(initialDeskSize || DEFAULT_DESK_SIZE);
    setZoomLevel(1);
    setSelectingRoom(null);
    setSelectingDesk(null);
    setDraggingRoomId(null);
    setPickingDeskId(null);
    setIsEditing(false);
  };

  const handleChangeFloorPlan = useCallback(
    (value: Partial<FloorPlanValue>) => {
      setTimeout(() => {
        onChange?.({
          deskSize,
          floorPlanImage,
          rooms,
          ...value,
        });
      }, 0);
    },
    [deskSize, floorPlanImage, onChange, rooms],
  );

  const handleChangeDeskSize = useCallback(
    (deskSize: number) => {
      setDeskSize(deskSize);
      handleChangeFloorPlan({
        deskSize,
      });
    },
    [handleChangeFloorPlan],
  );

  const handleChangeFloorPlanImage = useCallback(
    (floorPlanImage?: string) => {
      setFloorPlanImage(floorPlanImage);
      handleChangeFloorPlan({
        floorPlanImage,
      });
      setZoomLevel(1);

      if (!rooms?.length) {
        toastMessageRef.current?.showWarning({
          description: t('feature.floorPlan.error.uploadNoRooms'),
        });
      }
    },
    [handleChangeFloorPlan, rooms?.length, t],
  );

  const glowingRoom = useMemo(
    () =>
      rooms?.find(room =>
        room?.desks?.some(
          desk => desk.id === pickingDeskId || desk.id === selectingDesk?.id,
        ),
      ),
    [pickingDeskId, rooms, selectingDesk?.id],
  );

  const onUpdateRoomShape = useCallback(
    ({ roomId, shape }: UpdateRoomShapeProps) => {
      if (roomId) {
        setRooms(currentRooms => {
          const newRooms = currentRooms?.map(room => {
            if (room.id === roomId) {
              const isChangedSize =
                room.shape?.width !== shape.width ||
                room.shape?.height !== shape.height;

              const newRoom: FloorPlanRoomItemEntity = {
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

          handleChangeFloorPlan({
            rooms: checkedOverlappedRooms,
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
    },
    [handleChangeFloorPlan, selectingRoom],
  );

  const onUpdateDeskShape = useCallback(
    ({ deskId, shape }: UpdateDeskShapeProps) => {
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

          handleChangeFloorPlan({
            rooms: newRooms,
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
    },
    [glowingRoom, handleChangeFloorPlan, selectingDesk],
  );

  const onRemoveRoomShape = useCallback(
    (roomId: string) => {
      if (roomId) {
        const removedRoom = rooms?.find(room => room.id === roomId);

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

            if (
              room?.shape &&
              removedRoom?.shape &&
              room?.shape?.zIndex > removedRoom?.shape?.zIndex
            ) {
              const newRoomZIndex = room?.shape?.zIndex - 1;

              return {
                ...room,
                desks: room.desks?.map(desk => ({
                  ...desk,
                  shape: desk?.shape
                    ? {
                        ...desk.shape,
                        zIndex: newRoomZIndex * 100 + (desk.shape.zIndex % 100),
                      }
                    : undefined,
                })),
                shape: {
                  ...room.shape,
                  zIndex: newRoomZIndex,
                },
              };
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

          handleChangeFloorPlan({
            rooms: checkedOverlappedRooms,
          });

          return checkedOverlappedRooms;
        });
      }

      setSelectingRoom(null);
    },
    [handleChangeFloorPlan, rooms],
  );

  const onRemoveDeskShape = useCallback(
    (deskId: string) => {
      if (deskId && glowingRoom) {
        const removedDesk = glowingRoom?.desks?.find(
          desk => desk.id === deskId,
        );

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

                  if (
                    desk?.shape &&
                    removedDesk?.shape &&
                    desk?.shape?.zIndex >= removedDesk?.shape?.zIndex
                  ) {
                    return {
                      ...desk,
                      shape: {
                        ...desk.shape,
                        zIndex: desk.shape.zIndex - 1,
                      },
                    };
                  }

                  return desk;
                }),
              };
            }

            return room;
          });

          handleChangeFloorPlan({
            rooms: newRooms,
          });

          return newRooms;
        });
      }

      setSelectingDesk(null);
    },
    [glowingRoom, handleChangeFloorPlan],
  );

  const internalContext: FloorPlanEditorInternalContextProps = {
    deskSize,
    draggingRoomId,
    floorPlanImage,
    glowingRoom,
    handleChangeDeskSize,
    handleChangeFloorPlanImage,
    handleResetFloorPlan,
    isEditing,
    onRemoveDeskShape,
    onRemoveRoomShape,
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
    toastMessageRef,
    workspaceRef,
    workspaceSize,
    zoomLevel,
  };

  useEffect(() => {
    setFloorPlanImage(initialFloorPlanImage);
    setRooms(initialRooms);
    setDeskSize(initialDeskSize || DEFAULT_DESK_SIZE);
    setZoomLevel(1);
    setSelectingDesk(null);
    setSelectingRoom(null);
    setDraggingRoomId(null);
    setPickingDeskId(null);
    setIsEditing(false);
    // Long Nguyen (15/07/25): Do not change the dependency
  }, [props.getDataLoading]);

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
