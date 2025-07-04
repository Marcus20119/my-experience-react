export interface DeskEntity {
  id: number;
  name: string;
}

export interface RoomEntity {
  desks: DeskEntity[];
  id: number;
  name: string;
}
