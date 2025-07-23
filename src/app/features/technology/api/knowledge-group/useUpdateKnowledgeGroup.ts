import { useMutation } from '@tanstack/react-query';

import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { KnowledgeGroupResponse } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupApi } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: (knowledgeGroup: KnowledgeGroupResponse) => void;
}

export const useUpdateKnowledgeGroup = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: updateKnowledgeGroup } = useMutation({
    mutationFn: knowledgeGroupApi.updateKnowledgeGroup,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({
          filter: { technologyId: data.technologyId },
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.detail(String(id)).queryKey,
      });

      showSuccess({
        message: 'Knowledge group updated successfully! ~',
      });
    },
  });

  const handleUpdateKnowledgeGroup = (
    input: UpsertKnowledgeGroupFormEntity,
  ) => {
    if (!id) return;

    updateKnowledgeGroup({
      id,
      input: {
        description: input.description,
        name: input.name,
      },
    });
  };

  return {
    handleUpdateKnowledgeGroup,
    isPending,
  };
};
