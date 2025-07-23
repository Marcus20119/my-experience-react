import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import { knowledgeGroupApi } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: () => void;
}

export const useDeleteKnowledgeGroup = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: deleteKnowledgeGroup } = useMutation({
    mutationFn: knowledgeGroupApi.deleteKnowledgeGroup,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({}).queryKey,
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
