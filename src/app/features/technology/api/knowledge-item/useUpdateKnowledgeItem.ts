import { useMutation } from '@tanstack/react-query';

import type { UpsertKnowledgeItemFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { KnowledgeItemResponse } from '@/shared/tanstack/api/technologies';
import { IconType, knowledgeItemApi } from '@/shared/tanstack/api/technologies';
import { knowledgeItemQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: (knowledgeItem: KnowledgeItemResponse) => void;
}

export const useUpdateKnowledgeItem = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: updateKnowledgeItem } = useMutation({
    mutationFn: knowledgeItemApi.updateKnowledgeItem,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: knowledgeItemQueries.all({}).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: knowledgeItemQueries.detail(String(id)).queryKey,
      });

      showSuccess({
        message: 'Knowledge item updated successfully! ~',
      });
    },
  });

  const handleUpdateKnowledgeItem = (input: UpsertKnowledgeItemFormEntity) => {
    if (!id) return;

    updateKnowledgeItem({
      id,
      input: {
        color1: input.color1,
        color2: input.color2 || null,
        color3: input.color3 || null,
        content: input.content || null,
        iconFileKey:
          input.iconType === IconType.Custom ? input.iconFileKey : null,
        iconName: input.iconType === IconType.Iconify ? input.iconName : null,
        iconType: input.iconType,
        imageFileKeys: input.imageFileKeys || null,
        knowledgeGroupId: input.knowledgeGroupId || null,
        name: input.name,
        rate: input.rate || 0,
        technologyId: input.technologyId,
      },
    });
  };

  return {
    handleUpdateKnowledgeItem,
    isPending,
  };
};
