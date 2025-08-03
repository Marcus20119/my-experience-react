import type { NavigateOptions } from '@tanstack/react-router';
import { useMatchRoute } from '@tanstack/react-router';

export const useMatchRoutes = (paths: NavigateOptions['to'][]) => {
  const matchRoute = useMatchRoute();

  for (const path of paths) {
    const isMatch = !!matchRoute({
      to: path,
    });

    if (!isMatch) return false;
  }

  return true;
};
