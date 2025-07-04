import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { PathProps } from '../types';

type DrawerRouterNavigator<T extends DrawerRouterPath = DrawerRouterPath> =
  T extends T
    ? {
        param?: PathProps<T>;
        path: T;
      }
    : never;

const getDrawerRouterPath = ({
  param,
  path,
}: DrawerRouterNavigator): string => {
  let newHash = String(path);

  if (param) {
    for (const key in param) {
      newHash = newHash.replace(
        `:${key}`,
        (param as unknown as Record<string, string>)[key].toString(),
      );
    }
  }

  return newHash;
};

export const useDrawerRouter = <P extends DrawerRouterPath>(path?: P) => {
  const navigate = useNavigate();
  const location = useLocation();

  const param: PathProps<P> | undefined = useMemo(() => {
    if (!path) {
      return undefined;
    }

    const paramsTmp = {} as Record<string, string>;
    const hashValue = location.hash.split('#')[1].split('/');

    (path as string).split('/').forEach((item: string, key: number) => {
      if (item.includes(':')) {
        paramsTmp[item.replace(':', '')] = hashValue[key];
      }
    });

    return paramsTmp as PathProps<P>;
  }, [location.hash, path]);

  const onCloseDrawer = () => {
    navigate({
      hash: '',
    });
  };

  const onOpenDrawer = (props: DrawerRouterNavigator) => {
    const newHash = getDrawerRouterPath(props);

    navigate(
      {
        hash: `drawer/${newHash}`,
      },
      {
        replace: true,
      },
    );
  };

  return {
    onCloseDrawer,
    onOpenDrawer,
    param,
  };
};
