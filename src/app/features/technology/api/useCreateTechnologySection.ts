import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import type {
  TechnologySectionResponse,
  TechnologyType,
} from '@/shared/tanstack/api/technologies';
import { technologySectionApi } from '@/shared/tanstack/api/technologies';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

import type { UpsertTechnologySectionFormEntity } from '../model';

const { showSuccess } = NotiTool;

interface Props {
  onSuccess?: (technologySection: TechnologySectionResponse) => void;
  technologyType: TechnologyType;
}

export const useCreateTechnologySection = ({
  onSuccess,
  technologyType,
}: Props) => {
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
    createTechnologySection({ name: input.name, technologyType });
  };

  return {
    handleCreateTechnologySection,
    isPending,
  };
};
