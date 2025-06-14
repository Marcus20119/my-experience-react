import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DRAWER_ROUTES } from './drawerRoutes';

const getDrawerRoute = (hash: string) => {
  const path = hash.replace('drawer/', '').split('/')?.[0];

  const drawerRoute = DRAWER_ROUTES.find(route => `#${route.path}` === path);

  if (drawerRoute) {
    const route = drawerRoute.routes.find(route => hash.includes(route.match));

    if (route) {
      return route;
    }
  }
};

function DrawerRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const closeDrawer = () => {
    navigate(
      {
        hash: '',
      },
      {
        replace: true,
      },
    );
  };

  const drawerRoute = useMemo(
    () => getDrawerRoute(location.hash),
    [location.hash],
  );

  if (!drawerRoute) {
    return null;
  }

  return <drawerRoute.element onCancel={closeDrawer} />;
}

export default DrawerRouter;
