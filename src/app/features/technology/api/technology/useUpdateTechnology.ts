import { useMutation } from '@tanstack/react-query';

import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { TechnologyResponse } from '@/shared/tanstack/api/technologies';
import { IconType, technologyApi } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: (technology: TechnologyResponse) => void;
}

export const useUpdateTechnology = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: updateTechnology } = useMutation({
    mutationFn: technologyApi.updateTechnology,
    onSuccess: technology => {
      onSuccess?.(technology);

      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({}).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: technologyQueries.detail(technology.id).queryKey,
      });

      showSuccess({
        message: 'Technology updated successfully! ~',
      });
    },
  });

  const handleUpdateTechnology = (input: UpsertTechnologyFormEntity) => {
    if (!id) return;

    updateTechnology({
      id,
      input: {
        color1: input.color1,
        color2: input.color2 || null,
        color3: input.color3 || null,
        description: input.description || null,
        iconFileKey:
          input.iconType === IconType.Custom ? input.iconFileKey : null,
        iconName: input.iconType === IconType.Iconify ? input.iconName : null,
        iconType: input.iconType,
        name: input.name,
        rate: input.rate || 0,
        technologySectionId: input.technologySectionId || null,
        technologyType: input.technologyType,
      },
    });
  };

  return {
    handleUpdateTechnology,
    isPending,
  };
};
