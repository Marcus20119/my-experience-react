import {
  DeleteKnowledgeGroupModal,
  DeleteTechnologyModal,
  DeleteTechnologySectionModal,
} from '@/app/features/technology';
import { DeleteKnowledgeItemModal } from '@/app/features/technology/ui/knowledge-item';
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
        element: DeleteTechnologySectionModal,
        match: 'delete',
        path: '/delete/:id',
      },
    ],
  },
  {
    path: 'technology',
    routes: [
      {
        element: DeleteTechnologyModal,
        match: 'delete',
        path: '/delete/:id',
      },
    ],
  },
  {
    path: 'knowledge-group',
    routes: [
      {
        element: DeleteKnowledgeGroupModal,
        match: 'delete',
        path: '/delete/:id',
      },
    ],
  },
  {
    path: 'knowledge-item',
    routes: [
      {
        element: DeleteKnowledgeItemModal,
        match: 'delete',
        path: '/delete/:id',
      },
    ],
  },
] as const satisfies DeepReadonly<ModalRouter[]>;
