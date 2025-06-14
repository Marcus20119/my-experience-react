import FormModal from '@/pages/component/form/FormModal';
import type { DeepReadonly } from '@/shared/types';

export const MODAL_ROUTES = [
  {
    path: 'user',
    routes: [
      {
        element: FormModal,
        match: 'edit',
        path: '/edit',
      },
    ],
  },
] as const satisfies DeepReadonly<ModalRouter[]>;
