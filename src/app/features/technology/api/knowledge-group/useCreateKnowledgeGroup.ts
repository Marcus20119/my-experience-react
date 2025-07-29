import { useMutation } from '@tanstack/react-query';

import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
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
  const { isPending, mutate: createKnowledgeGroup } = useMutation({
    mutationFn: knowledgeGroupApi.createKnowledgeGroup,
    onSuccess: data => {
      onSuccess?.(data);

      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({}).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({}).queryKey,
      });

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
