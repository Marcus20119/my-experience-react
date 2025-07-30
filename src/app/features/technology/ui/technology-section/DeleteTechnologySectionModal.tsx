import { useNavigate, useParams } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import { useDeleteTechnologySection } from '@/app/features/technology/api';
import { Modal } from '@/shared/components';
import { useModalRouter } from '@/shared/hooks';

interface Props {
  onCancel: () => void;
}

function DeleteTechnologySectionModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { technologySkeleton } = useSidebarStore();
  const { param } = useModalRouter('technology-section/delete/:id');
  const { sectionId, type } = useParams({
    from: '/technology-type/$type/technology-section/$sectionId',
  });

  const technology = technologySkeleton?.find(
    item => item.technologyType === type,
  );

  const nextSection = technology?.technologySections?.find(
    item => item.id !== sectionId,
  );

  const { handleDeleteTechnologySection, isPending } =
    useDeleteTechnologySection({
      id: param?.id,
      onSuccess: () => {
        onCancel();

        if (nextSection) {
          navigate({
            params: {
              sectionId: nextSection.id,
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
      description={'Are you sure you want to delete this section? ~'}
      mode="error"
      okButtonProps={{
        loading: isPending,
      }}
      okText={t('common.button.delete')}
      onCancel={onCancel}
      onOk={handleDeleteTechnologySection}
      open
      title={`Delete section ~`}
    />
  );
}

export default DeleteTechnologySectionModal;
