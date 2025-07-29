import { useTranslation } from 'react-i18next';

import { useDeleteKnowledgeItem } from '@/app/features/technology/api';
import { Modal } from '@/shared/components';
import { useModalRouter } from '@/shared/hooks';

interface Props {
  id?: string;
  onCancel: () => void;
  onOk?: () => void;
}

function DeleteKnowledgeItemModal({ id: idFromProps, onCancel, onOk }: Props) {
  const { t } = useTranslation();
  const { param } = useModalRouter('knowledge-item/delete/:id');

  const id = idFromProps || param?.id;

  const { handleDeleteKnowledgeItem, isPending } = useDeleteKnowledgeItem({
    id,
    onSuccess: () => {
      onCancel();
      onOk?.();
    },
  });

  return (
    <Modal.Confirm
      description={'Are you sure you want to delete this knowledge item? ~'}
      mode="error"
      okButtonProps={{
        loading: isPending,
      }}
      okText={t('common.button.delete')}
      onCancel={onCancel}
      onOk={handleDeleteKnowledgeItem}
      open
      title={`Delete knowledge item ~`}
    />
  );
}

export default DeleteKnowledgeItemModal;
