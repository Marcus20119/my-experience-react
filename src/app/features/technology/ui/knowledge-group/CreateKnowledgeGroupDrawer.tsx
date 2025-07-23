import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import { useCreateKnowledgeGroup } from '@/app/features/technology/api';
import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useAppRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertKnowledgeGroupForm from './UpsertKnowledgeGroupForm';

interface Props {
  onCancel: () => void;
}

function CreateKnowledgeGroupDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const {
    param: { id: technologyId, section, type },
  } = useAppRouter(
    '/technology-type/:type/technology-section/:section/technology/:id',
  );
  const [form] = Form.useForm<UpsertKnowledgeGroupFormEntity>();

  const technology = technologySkeleton?.find(
    item => item.technologyType === type,
  );
  const technologySection = technology?.technologySections?.find(
    item => item.slug === section,
  );

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
        technologySectionId={technologySection?.id}
        technologyType={type as TechnologyType}
      />
    </Drawer.FormWrapper>
  );
}

export default CreateKnowledgeGroupDrawer;
