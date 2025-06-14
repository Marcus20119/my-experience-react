import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MODAL_ROUTES } from './modalRoutes';

const getModalRoute = (hash: string) => {
  const path = hash.replace('modal/', '').split('/')?.[0];

  const modalRoute = MODAL_ROUTES.find(route => `#${route.path}` === path);

  if (modalRoute) {
    const route = modalRoute.routes.find(route => hash.includes(route.match));

    if (route) {
      return route;
    }
  }
};

function ModalRouter() {
  const location = useLocation();
  const navigate = useNavigate();

  const closeModal = () => {
    navigate(
      {
        hash: '',
      },
      {
        replace: true,
      },
    );
  };

  const modalRoute = useMemo(
    () => getModalRoute(location.hash),
    [location.hash],
  );

  if (!modalRoute) {
    return null;
  }

  return <modalRoute.element onCancel={closeModal} />;
}

export default ModalRouter;
