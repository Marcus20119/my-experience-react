import { useParams } from '@tanstack/react-router';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateKnowledgeItem } from '@/app/features/technology/api';
import type { UpsertKnowledgeItemFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useDrawerRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertKnowledgeItemForm from './UpsertKnowledgeItemForm';

interface Props {
  onCancel: () => void;
}

function CreateKnowledgeItemDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { sectionId, technologyId, type } = useParams({
    strict: false,
  });
  const { param } = useDrawerRouter('knowledge-item/create/:groupId');
  const [form] = Form.useForm<UpsertKnowledgeItemFormEntity>();

  const { handleCreateKnowledgeItem, isPending } = useCreateKnowledgeItem({
    onSuccess: () => {
      onCancel();
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      knowledgeGroupId: param?.groupId,
      technologyId,
    });
  }, [form, param?.groupId, technologyId]);

  return (
    <Drawer.FormWrapper
      okButtonProps={{
        loading: isPending,
        onClick: () => {
          form.submit();
        },
      }}
      okText={t('common.button.create')}
      onClose={onCancel}
      open
      title={`Create knowledge item ~`}
      width={600}
    >
      <UpsertKnowledgeItemForm
        form={form}
        onFinish={handleCreateKnowledgeItem}
        technologySectionId={sectionId}
        technologyType={type as TechnologyType}
      />
    </Drawer.FormWrapper>
  );
}

export default CreateKnowledgeItemDrawer;
