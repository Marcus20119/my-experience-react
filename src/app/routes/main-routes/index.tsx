import type { RouteObject } from 'react-router-dom';

import type { DeepReadonly } from '@/shared/types';

import { ANIMATION_ROUTES } from './animationRoutes';
import { COMPONENT_ROUTES } from './componentRoutes';
import { FEATURE_ROUTES } from './featureRoutes';
import { GAME_ROUTES } from './gameRoutes';
import { TECHNOLOGY_ROUTES } from './technologyRoutes';
import { USER_ROUTES } from './userRoutes';

const MAIN_ROUTES = [
  ...TECHNOLOGY_ROUTES,
  ...FEATURE_ROUTES,
  ...ANIMATION_ROUTES,
  ...GAME_ROUTES,
  ...COMPONENT_ROUTES,
  ...USER_ROUTES,
] as const satisfies DeepReadonly<RouteObject[]>;

export default MAIN_ROUTES;
