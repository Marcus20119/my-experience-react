/* eslint-disable perfectionist/sort-interfaces */
export interface FloorPlanRoomShapeEntity {
  id: string;
  zIndex: number;
  height: number;
  width: number;
  x: number;
  y: number;
  rotation?: number;
  isOverlapped?: boolean;
}

export interface FloorPlanDeskShapeEntity {
  id: string;
  zIndex: number;
  x: number;
  y: number;
  rotation?: number;
  isDuplicated?: boolean;
}

export interface FloorPlanDeskItemEntity {
  id: string;
  name: string;
  shape?: FloorPlanDeskShapeEntity;
}

export interface FloorPlanRoomItemEntity {
  isActive: boolean;
  desks?: FloorPlanDeskItemEntity[];
  id: string;
  name: string;
  shape?: FloorPlanRoomShapeEntity;
}

export interface FloorPlanSize {
  height: number;
  width: number;
}

export interface FloorPlanValue {
  rooms: FloorPlanRoomItemEntity[];
  floorPlanImage?: string;
  deskSize: number;
}

export interface FloorPlanRef {
  getData: () => FloorPlanValue;
  resetData: () => void;
}
