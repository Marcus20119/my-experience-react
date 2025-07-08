import type { RoomEntity } from '../model';

interface Props {
  deskPosition: {
    x: number;
    y: number;
  };
  room?: RoomEntity;
}

export const checkOverflowedDesk = ({ deskPosition, room }: Props) => {
  if (!room?.shape) {
    return false;
  }

  const { height, width, x, y } = room.shape;

  const halfW = width / 2;
  const halfH = height / 2;

  const left = x - halfW;
  const right = x + halfW;
  const top = y - halfH;
  const bottom = y + halfH;

  return (
    deskPosition.x < left ||
    deskPosition.x > right ||
    deskPosition.y < top ||
    deskPosition.y > bottom
  );
};
