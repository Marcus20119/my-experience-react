import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

import { useCreateTechnologySection } from '@/app/features/technology/api';
import type { UpsertTechnologySectionFormEntity } from '@/app/features/technology/model';
import { Modal } from '@/shared/components';
import { useAppRouter } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';

import UpsertTechnologySectionForm from './UpsertTechnologySectionForm';

interface Props {
  onCancel: () => void;
}

function CreateTechnologySectionModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const { navigate, param } = useAppRouter(
    '/technology-type/:type/technology-section/:section',
  );
  const [form] = Form.useForm<UpsertTechnologySectionFormEntity>();

  const { handleCreateTechnologySection, isPending } =
    useCreateTechnologySection({
      onSuccess: section => {
        onCancel();

        navigate({
          param: {
            section: section.slug,
            type: section.technologyType,
          },
          path: '/technology-type/:type/technology-section/:section',
        });
      },
      technologyType: param.type as TechnologyType,
    });

  return (
    <Modal.FormWrapper
      okButtonProps={{
        loading: isPending,
        onClick: () => {
          form.submit();
        },
      }}
      okText={t('common.button.create')}
      onCancel={onCancel}
      open={true}
      title={`Create section for ${param.type} ~`}
      width={600}
    >
      <UpsertTechnologySectionForm
        form={form}
        onFinish={handleCreateTechnologySection}
      />
    </Modal.FormWrapper>
  );
}

export default CreateTechnologySectionModal;
