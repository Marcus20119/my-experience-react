/* eslint-disable perfectionist/sort-interfaces */
export interface DeskEntity {
  id: string;
  name: string;
}

export interface RoomEntity {
  desks: DeskEntity[];
  id: string;
  name: string;
  shape?: RectShapePropEntity;
}

export interface FloorPlanSize {
  height: number;
  width: number;
}

export interface RectShapePropEntity {
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
