import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import { knowledgeItemApi } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: () => void;
}

export const useDeleteKnowledgeItem = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: deleteKnowledgeItem } = useMutation({
    mutationFn: knowledgeItemApi.deleteKnowledgeItem,
    onSuccess: () => {
      onSuccess?.();

      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({}).queryKey,
      });

      showSuccess({
        message: 'Knowledge item deleted successfully! ~',
      });
    },
  });

  const handleDeleteKnowledgeItem = () => {
    if (!id) return;

    deleteKnowledgeItem(id);
  };

  return {
    handleDeleteKnowledgeItem,
    isPending,
  };
};
