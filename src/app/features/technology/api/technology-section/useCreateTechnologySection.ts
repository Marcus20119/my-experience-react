import { useMutation } from '@tanstack/react-query';

import type { UpsertTechnologySectionFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { TechnologySectionResponse } from '@/shared/tanstack/api/technologies';
import { technologySectionApi } from '@/shared/tanstack/api/technologies';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  onSuccess?: (technologySection: TechnologySectionResponse) => void;
}

export const useCreateTechnologySection = ({ onSuccess }: Props) => {
  const { isPending, mutate: createTechnologySection } = useMutation({
    mutationFn: technologySectionApi.createTechnologySection,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: technologySectionQueries.skeleton().queryKey,
      });

      showSuccess({
        message: 'Section created successfully! ~',
      });
    },
  });

  const handleCreateTechnologySection = (
    input: UpsertTechnologySectionFormEntity,
  ) => {
    createTechnologySection({
      name: input.name,
      technologyType: input.technologyType,
    });
  };

  return {
    handleCreateTechnologySection,
    isPending,
  };
};
