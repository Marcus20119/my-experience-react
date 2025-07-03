import { useMutation } from '@tanstack/react-query';

import { queryClient } from '@/lib/tanstack-client';
import { technologySectionApi } from '@/shared/tanstack/api/technologies';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';
import { NotiTool } from '@/shared/utils';

const { showSuccess } = NotiTool;

interface Props {
  id?: string;
  onSuccess?: () => void;
}

export const useDeleteTechnologySection = ({ id, onSuccess }: Props) => {
  const { isPending, mutate: deleteTechnologySection } = useMutation({
    mutationFn: technologySectionApi.deleteTechnologySection,
    onSuccess: () => {
      onSuccess?.();
      queryClient.invalidateQueries({
        queryKey: technologySectionQueries.skeleton().queryKey,
      });

      showSuccess({
        message: 'Section deleted successfully! ~',
      });
    },
  });

  const handleDeleteTechnologySection = () => {
    if (!id) return;

    deleteTechnologySection(id);
  };

  return {
    handleDeleteTechnologySection,
    isPending,
  };
};
