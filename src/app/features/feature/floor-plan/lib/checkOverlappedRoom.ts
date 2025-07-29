import type { FloorPlanRoomItemEntity } from '../model';

export const checkOverlappedRoom = (
  roomA: FloorPlanRoomItemEntity,
  roomB: FloorPlanRoomItemEntity,
) => {
  const { shape: shapeA } = roomA;
  const { shape: shapeB } = roomB;

  if (!shapeA || !shapeB) return false;

  const shapeALeft = shapeA.x - shapeA.width / 2;
  const shapeARight = shapeA.x + shapeA.width / 2;
  const shapeATop = shapeA.y - shapeA.height / 2;
  const shapeABottom = shapeA.y + shapeA.height / 2;

  const shapeBLeft = shapeB.x - shapeB.width / 2;
  const shapeBRight = shapeB.x + shapeB.width / 2;
  const shapeBTop = shapeB.y - shapeB.height / 2;
  const shapeBBottom = shapeB.y + shapeB.height / 2;

  return !(
    shapeBLeft > shapeARight ||
    shapeBRight < shapeALeft ||
    shapeBTop > shapeABottom ||
    shapeBBottom < shapeATop
  );
};
