import { useTranslation } from 'react-i18next';

import { useDeleteKnowledgeGroup } from '@/app/features/technology/api';
import { Modal } from '@/shared/components';
import { useModalRouter } from '@/shared/hooks';

interface Props {
  onCancel: () => void;
}

function DeleteKnowledgeGroupModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const { param } = useModalRouter('technology-section/delete/:id');

  const { handleDeleteKnowledgeGroup, isPending } = useDeleteKnowledgeGroup({
    id: param?.id,
    onSuccess: () => {
      onCancel();
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
      onOk={handleDeleteKnowledgeGroup}
      open
      title={`Delete section ~`}
    />
  );
}

export default DeleteKnowledgeGroupModal;
