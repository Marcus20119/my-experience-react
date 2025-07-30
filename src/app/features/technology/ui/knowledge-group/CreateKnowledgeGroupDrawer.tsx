import { useParams } from '@tanstack/react-router';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateKnowledgeGroup } from '@/app/features/technology/api';
import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertKnowledgeGroupForm from './UpsertKnowledgeGroupForm';

interface Props {
  onCancel: () => void;
}

function CreateKnowledgeGroupDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { sectionId, technologyId, type } = useParams({
    from: '/technology-type/$type/technology-section/$sectionId/technology/$technologyId',
  });
  const [form] = Form.useForm<UpsertKnowledgeGroupFormEntity>();

  const { handleCreateKnowledgeGroup, isPending } = useCreateKnowledgeGroup({
    onSuccess: () => {
      onCancel();
    },
  });

  useEffect(() => {
    form.setFieldsValue({
      technologyId,
    });
  }, [form, technologyId]);

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
      title={`Create knowledge group ~`}
      width={600}
    >
      <UpsertKnowledgeGroupForm
        form={form}
        onFinish={handleCreateKnowledgeGroup}
        technologySectionId={sectionId}
        technologyType={type as TechnologyType}
      />
    </Drawer.FormWrapper>
  );
}

export default CreateKnowledgeGroupDrawer;
