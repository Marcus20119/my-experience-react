import { useMutation } from '@tanstack/react-query';

import type { UpsertKnowledgeItemFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { KnowledgeItemResponse } from '@/shared/tanstack/api/technologies';
import { IconType, knowledgeItemApi } from '@/shared/tanstack/api/technologies';
import {
  knowledgeGroupQueries,
  knowledgeItemQueries,
} from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  onSuccess?: (knowledgeItem: KnowledgeItemResponse) => void;
}

export const useCreateKnowledgeItem = ({ onSuccess }: Props) => {
  const { isPending, mutate: createKnowledgeItem } = useMutation({
    mutationFn: knowledgeItemApi.createKnowledgeItem,
    onSuccess: data => {
      onSuccess?.(data);

      queryClient.invalidateQueries({
        queryKey: knowledgeItemQueries.all({}).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: knowledgeGroupQueries.all({}).queryKey,
      });

      showSuccess({
        message: 'Knowledge group created successfully! ~',
      });
    },
  });

  const handleCreateKnowledgeItem = (input: UpsertKnowledgeItemFormEntity) => {
    createKnowledgeItem({
      color1: input.color1,
      color2: input.color2,
      color3: input.color3,
      content: input.content,
      iconFileKey:
        input.iconType === IconType.Custom ? input.iconFileKey : undefined,
      iconName:
        input.iconType === IconType.Iconify ? input.iconName : undefined,
      iconType: input.iconType,
      imageFileKeys: input.imageFileKeys,
      knowledgeGroupId: input.knowledgeGroupId,
      name: input.name,
      rate: input.rate || 0,
      technologyId: input.technologyId,
    });
  };

  return {
    handleCreateKnowledgeItem,
    isPending,
  };
};
