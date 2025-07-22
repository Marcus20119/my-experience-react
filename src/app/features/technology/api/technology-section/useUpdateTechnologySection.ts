import { useMutation } from '@tanstack/react-query';

import type { UpsertTechnologySectionFormEntity } from '@/app/features/technology/model';
import { queryClient } from '@/lib/tanstack-client';
import type { TechnologySectionResponse } from '@/shared/tanstack/api/technologies';
import { technologySectionApi } from '@/shared/tanstack/api/technologies';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: (technologySection: TechnologySectionResponse) => void;
}

export const useUpdateTechnologySection = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: updateTechnologySection } = useMutation({
    mutationFn: technologySectionApi.updateTechnologySection,
    onSuccess: data => {
      onSuccess?.(data);
      queryClient.invalidateQueries({
        queryKey: technologySectionQueries.skeleton().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: technologySectionQueries.detail(String(id)).queryKey,
      });

      showSuccess({
        message: 'Section updated successfully! ~',
      });
    },
  });

  const handleUpdateTechnologySection = (
    input: UpsertTechnologySectionFormEntity,
  ) => {
    if (!id) return;

    updateTechnologySection({
      id,
      input: {
        name: input.name,
      },
    });
  };

  return {
    handleUpdateTechnologySection,
    isPending,
  };
};
