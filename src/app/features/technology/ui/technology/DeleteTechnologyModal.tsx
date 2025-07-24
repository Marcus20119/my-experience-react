import { useTranslation } from 'react-i18next';

import { useDeleteTechnology } from '@/app/features/technology/api';
import { Modal } from '@/shared/components';
import { useAppRouter, useModalRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

interface Props {
  id?: string;
  onCancel: () => void;
  onOk?: () => void;
  technologySectionId?: string;
  technologyType?: TechnologyType;
}

function DeleteTechnologyModal({
  id: idFromProps,
  onCancel,
  onOk,
  technologySectionId: technologySectionIdFromProps,
  technologyType: technologyTypeFromProps,
}: Props) {
  const { t } = useTranslation();
  const { param } = useModalRouter('technology/delete/:id');
  const {
    navigate,
    param: { sectionId, type },
  } = useAppRouter('/technology-type/:type/technology-section/:sectionId');

  const id = idFromProps || param?.id;
  const technologySectionId = technologySectionIdFromProps || sectionId;
  const technologyType = technologyTypeFromProps || (type as TechnologyType);

  const { handleDeleteTechnology, isPending } = useDeleteTechnology({
    id,
    onSuccess: () => {
      onCancel();
      onOk?.();

      if (sectionId) {
        navigate({
          param: {
            sectionId,
            type,
          },
          path: '/technology-type/:type/technology-section/:sectionId',
        });
      } else {
        navigate({
          param: {
            type,
          },
          path: '/technology-type/:type',
        });
      }
    },
    technologySectionId,
    technologyType,
  });

  return (
    <Modal.Confirm
      description={'Are you sure you want to delete this technology? ~'}
      mode="error"
      okButtonProps={{
        loading: isPending,
      }}
      okText={t('common.button.delete')}
      onCancel={onCancel}
      onOk={handleDeleteTechnology}
      open
      title={`Delete technology ~`}
    />
  );
}

export default DeleteTechnologyModal;
