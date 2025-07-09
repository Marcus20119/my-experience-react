/* eslint-disable perfectionist/sort-interfaces */
export interface DeskEntity {
  id: string;
  name: string;
  shape?: DeskShapeEntity;
}

export interface RoomEntity {
  isActive: boolean;
  desks?: DeskEntity[];
  id: string;
  name: string;
  shape?: RoomShapeEntity;
}

export interface FloorPlanSize {
  height: number;
  width: number;
}

export interface RoomShapeEntity {
  id: string;
  zIndex: number;
  height: number;
  width: number;
  x: number;
  y: number;
  rotation?: number;
  isOverlapped?: boolean;
}

export interface DeskShapeEntity {
  id: string;
  zIndex: number;
  x: number;
  y: number;
  rotation?: number;
  isOverlapped?: boolean;
}
