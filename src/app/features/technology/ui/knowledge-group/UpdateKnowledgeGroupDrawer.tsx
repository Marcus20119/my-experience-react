import { useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import { useUpdateKnowledgeGroup } from '@/app/features/technology/api';
import type { UpsertKnowledgeGroupFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useAppRouter, useDrawerRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { knowledgeGroupQueries } from '@/shared/tanstack/queries/technology';

import UpsertKnowledgeGroupForm from './UpsertKnowledgeGroupForm';

interface Props {
  onCancel: () => void;
}

function UpdateKnowledgeGroupDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const { param } = useDrawerRouter('technology-section/update/:id');
  const {
    param: { section, type },
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

  const { data: knowledgeGroup, isFetched } = useQuery({
    ...knowledgeGroupQueries.detail(String(param?.id)),
    enabled: !!param?.id,
  });

  useEffect(() => {
    if (isFetched) {
      form.setFieldsValue({
        description: knowledgeGroup?.description,
        name: knowledgeGroup?.name,
        technologyId: knowledgeGroup?.technologyId,
      });
    }
  }, [isFetched]);

  const { handleUpdateKnowledgeGroup, isPending } = useUpdateKnowledgeGroup({
    id: param?.id,
    onSuccess: () => {
      onCancel();
    },
  });

  return (
    <Drawer.FormWrapper
      okButtonProps={{
        loading: isPending,
        onClick: () => {
          form.submit();
        },
      }}
      okText={t('common.button.update')}
      onClose={onCancel}
      open
      title={`Update knowledge group ~`}
      width={600}
    >
      <UpsertKnowledgeGroupForm
        form={form}
        onFinish={handleUpdateKnowledgeGroup}
        technologySectionId={technologySection?.id}
        technologyType={type as TechnologyType}
      />
    </Drawer.FormWrapper>
  );
}

export default UpdateKnowledgeGroupDrawer;
