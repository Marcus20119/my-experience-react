import { useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/shared/components';
import { useAppRouter, useModalRouter } from '@/shared/hooks';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';

import { useUpdateTechnologySection } from '../api';
import type { UpsertTechnologySectionFormEntity } from '../model';
import UpsertTechnologySectionForm from './UpsertTechnologySectionForm';

interface Props {
  onCancel: () => void;
}

function UpdateTechnologySectionModal({ onCancel }: Props) {
  const { t } = useTranslation();
  const { param } = useModalRouter('technology-section/update/:id');
  const { navigate } = useAppRouter();
  const [form] = Form.useForm<UpsertTechnologySectionFormEntity>();

  const { data: section, isFetched } = useQuery({
    ...technologySectionQueries.detail(String(param?.id)),
    enabled: !!param?.id,
    staleTime: 30000,
  });

  useEffect(() => {
    if (isFetched) {
      form.setFieldsValue({
        name: section?.name,
      });
    }
  }, [isFetched]);

  const { handleUpdateTechnologySection, isPending } =
    useUpdateTechnologySection({
      id: param?.id,
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
    });

  return (
    <Modal.FormWrapper
      okButtonProps={{
        loading: isPending,
        onClick: () => {
          form.submit();
        },
      }}
      okText={t('common.button.update')}
      onCancel={onCancel}
      open={true}
      title={`Update section ~`}
      width={600}
    >
      <UpsertTechnologySectionForm
        form={form}
        onFinish={handleUpdateTechnologySection}
      />
    </Modal.FormWrapper>
  );
}

export default UpdateTechnologySectionModal;
