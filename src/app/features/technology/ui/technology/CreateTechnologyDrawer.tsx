import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

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
  const {
    param: { sectionId, type },
  } = useAppRouter('/technology-type/:type/technology-section/:sectionId');
  const [form] = Form.useForm<UpsertTechnologyFormEntity>();

  const { handleCreateTechnology, isPending } = useCreateTechnology({
    onSuccess: () => {
      onCancel();
    },
    technologySectionId: sectionId,
    technologyType: type as TechnologyType,
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
