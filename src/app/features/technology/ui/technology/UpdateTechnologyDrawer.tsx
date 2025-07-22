import { useQuery } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateTechnology } from '@/app/features/technology/api';
import type { UpsertTechnologyFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useDrawerRouter, useToggle } from '@/shared/hooks';
import { technologyQueries } from '@/shared/tanstack/queries/technology';

import DeleteTechnologyModal from './DeleteTechnologyModal';
import UpsertTechnologyForm from './UpsertTechnologyForm';

interface Props {
  onCancel: () => void;
}

function UpdateTechnologyDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { onCloseDrawer, param } = useDrawerRouter('technology/update/:id');
  const [form] = Form.useForm<UpsertTechnologyFormEntity>();
  const {
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
    open: openDeleteModal,
  } = useToggle();

  const { data: technology, isFetched } = useQuery({
    ...technologyQueries.detail(String(param?.id)),
    enabled: !!param?.id,
  });

  useEffect(() => {
    if (isFetched) {
      form.setFieldsValue({
        color1: technology?.color1,
        color2: technology?.color2,
        color3: technology?.color3,
        description: technology?.description,
        iconFileKey: technology?.iconFileKey,
        iconName: technology?.iconName,
        iconType: technology?.iconType,
        name: technology?.name,
        rate: technology?.rate,
      });
    }
  }, [isFetched]);

  const { handleUpdateTechnology, isPending } = useUpdateTechnology({
    id: param?.id,
    onSuccess: () => {
      onCloseDrawer();
    },
  });

  return (
    <>
      <Drawer.FormWrapper
        extraAction={
          <Button
            danger
            onClick={onOpenDeleteModal}
            size="middle"
            type="primary"
          >
            {t('common.button.delete')}
          </Button>
        }
        hidden={openDeleteModal}
        okButtonProps={{
          loading: isPending,
          onClick: () => {
            form.submit();
          },
        }}
        okText={t('common.button.save')}
        onClose={onCancel}
        open
        title={`Update technology~`}
        width={600}
      >
        <UpsertTechnologyForm form={form} onFinish={handleUpdateTechnology} />
      </Drawer.FormWrapper>
      {openDeleteModal ? (
        <DeleteTechnologyModal
          id={param?.id}
          onCancel={onCloseDeleteModal}
          onOk={onCancel}
          technologySectionId={technology?.technologySectionId}
          technologyType={technology?.technologyType}
        />
      ) : null}
    </>
  );
}

export default UpdateTechnologyDrawer;
