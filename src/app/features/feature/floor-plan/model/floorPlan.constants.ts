import { COLOR } from '@/shared/assets/styles/constants';

export const FLOOR_PLAN_EDITOR_SIZE = {
  itemNameWidth: 240,
  minHeight: 400,
  padding: 16,
  roomMenuWidth: 240,
  rotateStickHeight: 48,
};

export const MIN_ZOOM_LEVEL = 0.5;
export const MAX_ZOOM_LEVEL = 3;

export const MAX_DESK_SIZE = 100;
export const MIN_DESK_SIZE = 10;
export const DEFAULT_DESK_SIZE = 30;

export const ROOM_COLOR = {
  default: {
    bg: `${COLOR.system.success}40`,
    border: `${COLOR.system.success}80`,
  },
  error: {
    bg: `${COLOR.system.error}40`,
    border: `${COLOR.system.error}80`,
  },
  glowing: {
    bg: `${COLOR.system.success}66`,
    border: COLOR.system.success,
  },
};
