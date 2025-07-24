import { useQuery } from '@tanstack/react-query';
import { Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateTechnologySection } from '@/app/features/technology/api';
import type { UpsertTechnologySectionFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useAppRouter, useDrawerRouter } from '@/shared/hooks';
import { technologySectionQueries } from '@/shared/tanstack/queries/technology';

import UpsertTechnologySectionForm from './UpsertTechnologySectionForm';

interface Props {
  onCancel: () => void;
}

function UpdateTechnologySectionDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { param } = useDrawerRouter('technology-section/update/:id');
  const { navigate } = useAppRouter();
  const [form] = Form.useForm<UpsertTechnologySectionFormEntity>();

  const { data: section, isFetched } = useQuery({
    ...technologySectionQueries.detail(String(param?.id)),
    enabled: !!param?.id,
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
            sectionId: section.id,
            type: section.technologyType,
          },
          path: '/technology-type/:type/technology-section/:sectionId',
        });
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
      title={`Update section ~`}
      width={600}
    >
      <UpsertTechnologySectionForm
        form={form}
        onFinish={handleUpdateTechnologySection}
      />
    </Drawer.FormWrapper>
  );
}

export default UpdateTechnologySectionDrawer;
