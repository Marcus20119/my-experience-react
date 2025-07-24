import { useMutation } from '@tanstack/react-query';

import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import { useAppRouter } from '@/shared/hooks';
import type { KnowledgeGroupResponse } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupApi } from '@/shared/tanstack/api/technologies';
import {
  knowledgeGroupQueries,
  technologyQueries,
} from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  onSuccess?: (knowledgeGroup: KnowledgeGroupResponse) => void;
}

export const useCreateKnowledgeGroup = ({ onSuccess }: Props) => {
  const {
    param: { sectionId },
  } = useAppRouter(
    '/technology-type/:type/technology-section/:sectionId/technology/:id',
  );

  const { isPending, mutate: createKnowledgeGroup } = useMutation({
    mutationFn: knowledgeGroupApi.createKnowledgeGroup,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({
          filter: { technologyId: data.technologyId },
        }).queryKey,
      });

      if (sectionId) {
        queryClient.invalidateQueries({
          queryKey: technologyQueries.all({
            filter: { technologySectionId: sectionId },
          }).queryKey,
        });
      }

      showSuccess({
        message: 'Knowledge group created successfully! ~',
      });
    },
  });

  const handleCreateKnowledgeGroup = (
    input: UpsertKnowledgeGroupFormEntity,
  ) => {
    createKnowledgeGroup({
      description: input.description,
      name: input.name,
      technologyId: input.technologyId,
    });
  };

  return {
    handleCreateKnowledgeGroup,
    isPending,
  };
};
