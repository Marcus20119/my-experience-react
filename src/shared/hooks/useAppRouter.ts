import type { NavigateOptions } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import { useLocalStore } from '../stores';
import type { PathProps } from '../types';
import { AppTool } from '../utils';

const { scrollToTop } = AppTool;

export type RouterNavigator<T extends RouterPath = RouterPath> = T extends T
  ? {
      param?: PathProps<T>;
      path?: T;
      hash?: string;
      search?: string;
    }
  : never;

export const convertRouteToString = (route?: RouterNavigator): string => {
  if (!route) {
    return '';
  }

  console.log(' route:', route);

  let pathname = String(route.path);

  if (route.param) {
    for (const key in route.param) {
      pathname = pathname.replace(`:${key}`, route.param[key]);
    }
  }

  if (route.hash) {
    pathname += `#${route.hash}`;
  }

  if (route.search) {
    pathname += `?${route.search}`;
  }

  return pathname;
};

const getNavigatePath = ({ param, path }: RouterNavigator) => {
  if (!path) {
    return undefined;
  }

  let newPath = String(path);

  if (param) {
    for (const key in param) {
      newPath = newPath.replace(`:${key}`, param[key]);
    }

    newPath = `${newPath}`;
  }

  return newPath;
};

export const useAppRouter = <P extends RouterPath>(_?: P) => {
  const navig = useNavigate();
  const param = useParams();
  const { prevRoute, setLocalStates } = useLocalStore();

  const navigate = (route: RouterNavigator, options?: NavigateOptions) => {
    const newPath = getNavigatePath(route);

    setLocalStates({
      prevRoute: route?.path
        ? {
            ...route,
          }
        : {
            ...prevRoute,
            ...route,
          },
    });

    navig(
      {
        hash: route.hash,
        pathname: newPath,
        search: route.search,
      },
      options,
    );

    scrollToTop();
  };

  return {
    navigate,
    param: param as PathProps<P>,
  };
};
