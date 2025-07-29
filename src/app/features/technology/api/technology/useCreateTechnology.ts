import { useMutation } from '@tanstack/react-query';

import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { TechnologyResponse } from '@/shared/tanstack/api/technologies';
import { IconType, technologyApi } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  onSuccess?: (technology: TechnologyResponse) => void;
}

export const useCreateTechnology = ({ onSuccess }: Props) => {
  const { isPending, mutate: createTechnology } = useMutation({
    mutationFn: technologyApi.createTechnology,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({}).queryKey,
      });

      showSuccess({
        message: 'Technology created successfully! ~',
      });
    },
  });

  const handleCreateTechnology = (input: UpsertTechnologyFormEntity) => {
    createTechnology({
      color1: input.color1,
      color2: input.color2,
      color3: input.color3,
      description: input.description,
      iconFileKey:
        input.iconType === IconType.Custom ? input.iconFileKey : undefined,
      iconName:
        input.iconType === IconType.Iconify ? input.iconName : undefined,
      iconType: input.iconType,
      name: input.name,
      rate: input.rate || 0,
      technologySectionId: input.technologySectionId,
      technologyType: input.technologyType,
    });
  };

  return {
    handleCreateTechnology,
    isPending,
  };
};
