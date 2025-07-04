import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import { Modal } from '@/shared/components';
import { useAppRouter, useModalRouter } from '@/shared/hooks';

import { useDeleteTechnologySection } from '../api';

interface Props {
  onCancel: () => void;
}

function DeleteTechnologySectionModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const { param } = useModalRouter('technology-section/delete/:id');
  const {
    navigate,
    param: { section, type },
  } = useAppRouter('/technology-type/:type/technology-section/:section');

  const technology = technologySkeleton?.find(
    item => item.technologyType === type,
  );

  const nextSection = technology?.technologySections?.find(
    item => item.slug !== section,
  );

  const { handleDeleteTechnologySection, isPending } =
    useDeleteTechnologySection({
      id: param?.id,
      onSuccess: () => {
        onCancel();

        if (nextSection) {
          navigate({
            param: {
              section: nextSection.slug,
              type,
            },
            path: '/technology-type/:type/technology-section/:section',
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
