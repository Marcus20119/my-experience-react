import { CreateTechnologySectionModal } from '@/app/features/technology';
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
  {
    path: 'technology-section',
    routes: [
      {
        element: CreateTechnologySectionModal,
        match: 'create',
        path: '/create',
      },
    ],
  },
] as const satisfies DeepReadonly<ModalRouter[]>;
