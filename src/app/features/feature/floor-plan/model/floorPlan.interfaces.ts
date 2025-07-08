/* eslint-disable perfectionist/sort-interfaces */
export interface DeskEntity {
  id: string;
  name: string;
  shape?: CircleShapeEntity;
}

export interface RoomEntity {
  desks: DeskEntity[];
  id: string;
  name: string;
  shape?: RectShapeEntity;
}

export interface FloorPlanSize {
  height: number;
  width: number;
}

export interface RectShapeEntity {
  id: string;
  zIndex: number;
  height: number;
  width: number;
  x: number;
  y: number;
  rotation?: number;
  isOverlapped?: boolean;

  // Currently haven't used
  strokeColor?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  fill?: string;
}

export interface CircleShapeEntity {
  id: string;
  zIndex: number;
  x: number;
  y: number;
  rotation?: number;
  isOverlapped?: boolean;
  radiusInPx: number;

  // Currently haven't used
  strokeColor?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  fill?: string;
}
