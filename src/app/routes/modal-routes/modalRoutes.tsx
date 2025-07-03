import {
  CreateTechnologySectionModal,
  DeleteTechnologySectionModal,
  UpdateTechnologySectionModal,
} from '@/app/features/technology';
import FormModal from '@/pages/component/form/FormModal';
import type { DeepReadonly } from '@/shared/types';

export const MODAL_ROUTES = [
  {
    path: 'user',
    routes: [
      {
        element: FormModal,
        match: 'update',
        path: '/update',
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
      {
        element: DeleteTechnologySectionModal,
        match: 'delete',
        path: '/delete/:id',
      },
      {
        element: UpdateTechnologySectionModal,
        match: 'update',
        path: '/update/:id',
      },
    ],
  },
] as const satisfies DeepReadonly<ModalRouter[]>;
