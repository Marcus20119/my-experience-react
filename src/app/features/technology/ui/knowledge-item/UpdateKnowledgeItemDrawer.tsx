import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button, Form } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useUpdateKnowledgeItem } from '@/app/features/technology/api';
import type { UpsertKnowledgeItemFormEntity } from '@/app/features/technology/model';
import { Drawer } from '@/shared/components';
import { useDrawerRouter, useToggle } from '@/shared/hooks';
import type { TechnologyType } from '@/shared/tanstack/api/technologies';
import { knowledgeItemQueries } from '@/shared/tanstack/queries/technology';

import DeleteKnowledgeItemModal from './DeleteKnowledgeItemModal';
import UpsertKnowledgeItemForm from './UpsertKnowledgeItemForm';

interface Props {
  onCancel: () => void;
}

function UpdateKnowledgeItemDrawer({ onCancel }: Props) {
  const { t } = useTranslation();
  const { param } = useDrawerRouter('knowledge-item/update/:id');
  const { sectionId, type } = useParams({
    strict: false,
  });
  const [form] = Form.useForm<UpsertKnowledgeItemFormEntity>();
  const {
    onClose: onCloseDeleteModal,
    onOpen: onOpenDeleteModal,
    open: openDeleteModal,
  } = useToggle();

  const { data: knowledgeItem, isFetched } = useQuery({
    ...knowledgeItemQueries.detail(String(param?.id)),
    enabled: !!param?.id,
  });

  useEffect(() => {
    if (isFetched) {
      form.setFieldsValue({
        color1: knowledgeItem?.color1,
        color2: knowledgeItem?.color2,
        color3: knowledgeItem?.color3,
        content: knowledgeItem?.content,
        iconFileKey: knowledgeItem?.iconFileKey,
        iconName: knowledgeItem?.iconName,
        iconType: knowledgeItem?.iconType,
        imageFileKeys: knowledgeItem?.imageFileKeys || [],
        knowledgeGroupId: knowledgeItem?.knowledgeGroupId,
        name: knowledgeItem?.name,
        rate: knowledgeItem?.rate || 0,
        technologyId: knowledgeItem?.technologyId,
      });
    }
  }, [isFetched]);

  const { handleUpdateKnowledgeItem, isPending } = useUpdateKnowledgeItem({
    id: param?.id,
    onSuccess: () => {
      onCancel();
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
        okButtonProps={{
          loading: isPending,
          onClick: () => {
            form.submit();
          },
        }}
        okText={t('common.button.update')}
        onClose={onCancel}
        open
        title={`Update knowledge item ~`}
        width={600}
      >
        <UpsertKnowledgeItemForm
          form={form}
          onFinish={handleUpdateKnowledgeItem}
          technologySectionId={sectionId}
          technologyType={type as TechnologyType}
        />
      </Drawer.FormWrapper>
      {openDeleteModal ? (
        <DeleteKnowledgeItemModal
          id={param?.id}
          onCancel={onCloseDeleteModal}
          onOk={onCancel}
        />
      ) : null}
    </>
  );
}

export default UpdateKnowledgeItemDrawer;
