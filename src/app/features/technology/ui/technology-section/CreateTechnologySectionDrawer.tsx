import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCreateTechnologySection } from '@/app/features/technology/api';
import type { UpsertTechnologySectionFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useAppRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertTechnologySectionForm from './UpsertTechnologySectionForm';

interface Props {
  onCancel: () => void;
}

function CreateTechnologySectionDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const {
    navigate,
    param: { type },
  } = useAppRouter('/technology-type/:type/technology-section/:sectionId');
  const [form] = Form.useForm<UpsertTechnologySectionFormEntity>();

  const { handleCreateTechnologySection, isPending } =
    useCreateTechnologySection({
      onSuccess: section => {
        onCancel();

        navigate({
          param: {
            sectionId: section.id,
            type: section.technologyType,
          },
          path: '/technology-type/:type/technology-section/:sectionId',
        });
      },
    });

  useEffect(() => {
    form.setFieldsValue({
      technologyType: type as TechnologyType,
    });
  }, [form, type]);

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
      title={`Create section for ${type} ~`}
      width={600}
    >
      <UpsertTechnologySectionForm
        form={form}
        onFinish={handleCreateTechnologySection}
      />
    </Drawer.FormWrapper>
  );
}

export default CreateTechnologySectionDrawer;
