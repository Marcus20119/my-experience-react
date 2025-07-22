import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useSidebarStore } from '@/app/features/sidebar';
import { useCreateTechnology } from '@/app/features/technology/api';
import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useAppRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertTechnologyForm from './UpsertTechnologyForm';

interface Props {
  onCancel: () => void;
}

function CreateTechnologyDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { technologySkeleton } = useSidebarStore();
  const { param } = useAppRouter(
    '/technology-type/:type/technology-section/:section',
  );
  const [form] = Form.useForm<UpsertTechnologyFormEntity>();

  const technologySection = technologySkeleton
    ?.find(item => item.technologyType === param.type)
    ?.technologySections?.find(item => item.slug === param.section);

  const { handleCreateTechnology, isPending } = useCreateTechnology({
    onSuccess: () => {
      onCancel();
    },
    technologySectionId: technologySection?.id,
    technologyType: param.type as TechnologyType,
  });

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
      title={`Create technology~`}
      width={600}
    >
      <UpsertTechnologyForm form={form} onFinish={handleCreateTechnology} />
    </Drawer.FormWrapper>
  );
}

export default CreateTechnologyDrawer;
