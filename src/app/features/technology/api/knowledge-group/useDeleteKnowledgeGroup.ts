import { useMutation, useQuery } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import { knowledgeGroupApi } from '@/shared/tanstack/api/technologies';
import {
  knowledgeGroupQueries,
  technologyQueries,
} from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: () => void;
}

export const useDeleteKnowledgeGroup = ({ id, onSuccess }: Props) => {
  const { data: knowledgeGroup } = useQuery({
    ...knowledgeGroupQueries.detail(String(id)),
    enabled: !!id,
  });

  const { isPending, mutate: deleteKnowledgeGroup } = useMutation({
    mutationFn: knowledgeGroupApi.deleteKnowledgeGroup,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({
          filter: { technologyId: knowledgeGroup?.technologyId },
        }).queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({
          filter: { technologySectionId: knowledgeGroup?.technologySectionId },
        }).queryKey,
      });

      showSuccess({
        message: 'Knowledge group deleted successfully! ~',
      });
    },
  });

  const handleDeleteKnowledgeGroup = () => {
    if (!id) return;

    deleteKnowledgeGroup(id);
  };

  return {
    handleDeleteKnowledgeGroup,
    isPending,
  };
};
