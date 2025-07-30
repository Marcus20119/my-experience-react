import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useDeleteTechnology } from '@/app/features/technology/api';
import { Modal } from '@/shared/components';
import { useModalRouter } from '@/shared/hooks';

interface Props {
  id?: string;
  onCancel: () => void;
  onOk?: () => void;
}

function DeleteTechnologyModal({ id: idFromProps, onCancel, onOk }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { param } = useModalRouter('technology/delete/:id');
  const { sectionId, type } = useParams({
    from: '/technology-type/$type/technology-section/$sectionId',
  });

  const id = idFromProps || param?.id;

  const { handleDeleteTechnology, isPending } = useDeleteTechnology({
    id,
    onSuccess: () => {
      onCancel();
      onOk?.();

      if (sectionId) {
        navigate({
          params: {
            sectionId,
            type,
          },
          to: '/technology-type/$type/technology-section/$sectionId',
        });
      } else {
        navigate({
          params: {
            type,
          },
          to: '/technology-type/$type',
        });
      }
    },
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
