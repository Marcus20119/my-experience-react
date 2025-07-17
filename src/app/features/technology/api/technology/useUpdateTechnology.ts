import { useMutation } from '@tanstack/react-query';

import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type {
  TechnologyResponse,
  TechnologyType,
} from '@/shared/tanstack/api/technologies';
import { IconType, technologyApi } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: (technology: TechnologyResponse) => void;
  technologySectionId?: string;
  technologyType: TechnologyType;
}

export const useUpdateTechnology = ({
  id,
  onSuccess,
  technologySectionId,
  technologyType,
}: Props) => {
  const { isPending, mutate: updateTechnology } = useMutation({
    mutationFn: technologyApi.updateTechnology,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({
          filter: { technologySectionId, technologyType },
        }).queryKey,
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
        color2: input.color2,
        color3: input.color3,
        description: input.description,
        iconName:
          input.iconType === IconType.Iconify ? input.iconName : undefined,
        iconType: input.iconType,
        iconUrl: input.iconType === IconType.Custom ? input.iconUrl : undefined,
        name: input.name,
        rate: input.rate,
      },
    });
  };

  return {
    handleUpdateTechnology,
    isPending,
  };
};
