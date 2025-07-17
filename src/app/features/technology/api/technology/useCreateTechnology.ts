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
  onSuccess?: (technology: TechnologyResponse) => void;
  technologySectionId?: string;
  technologyType: TechnologyType;
}

export const useCreateTechnology = ({
  onSuccess,
  technologySectionId,
  technologyType,
}: Props) => {
  const { isPending, mutate: createTechnology } = useMutation({
    mutationFn: technologyApi.createTechnology,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({
          filter: { technologySectionId },
        }).queryKey,
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
      iconName:
        input.iconType === IconType.Iconify ? input.iconName : undefined,
      iconType: input.iconType,
      iconUrl: input.iconType === IconType.Custom ? input.iconUrl : undefined,
      name: input.name,
      rate: input.rate,
      technologySectionId,
      technologyType,
    });
  };

  return {
    handleCreateTechnology,
    isPending,
  };
};
