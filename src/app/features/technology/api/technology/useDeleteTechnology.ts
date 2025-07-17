import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { technologyApi } from '@/shared/tanstack/api/technologies';
import { technologyQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: () => void;
  technologySectionId?: string;
  technologyType: TechnologyType;
}

export const useDeleteTechnology = ({
  id,
  onSuccess,
  technologySectionId,
  technologyType,
}: Props) => {
  const { isPending, mutate: deleteTechnology } = useMutation({
    mutationFn: technologyApi.deleteTechnology,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: technologyQueries.all({
          filter: { technologySectionId, technologyType },
        }).queryKey,
      });

      showSuccess({
        message: 'Technology deleted successfully! ~',
      });
    },
  });

  const handleDeleteTechnology = () => {
    if (!id) return;

    deleteTechnology(id);
  };

  return {
    handleDeleteTechnology,
    isPending,
  };
};
