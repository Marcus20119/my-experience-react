import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import type { PathProps } from '../types';

type ModalRouterNavigator<T extends ModalRouterPath = ModalRouterPath> =
  T extends T
    ? {
        param?: PathProps<T>;
        path: T;
      }
    : never;

const getModalRouterPath = ({ param, path }: ModalRouterNavigator): string => {
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

export const useModalRouter = <P extends ModalRouterPath>(path?: P) => {
  const navigate = useNavigate();
  const location = useLocation();

  const param: PathProps<P> | undefined = useMemo(() => {
    if (!path) {
      return undefined;
    }

    const paramsTmp = {} as Record<string, string>;
    const hashValue = location.hash.split('#modal/')[1].split('/');
    console.log(' hashValue:', hashValue);

    (path as string).split('/').forEach((item: string, key: number) => {
      if (item.includes(':')) {
        paramsTmp[item.replace(':', '')] = hashValue[key];
      }
    });

    return paramsTmp as PathProps<P>;
  }, [location.hash, path]);

  const onCloseModal = () => {
    navigate({
      hash: '',
    });
  };

  const onOpenModal = (props: ModalRouterNavigator) => {
    const newHash = getModalRouterPath(props);

    navigate(
      {
        hash: `modal/${newHash}`,
      },
      {
        replace: true,
      },
    );
  };

  return {
    onCloseModal,
    onOpenModal,
    param,
  };
};
