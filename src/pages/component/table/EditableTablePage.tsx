import { Form, Tour } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import type { TourProps } from 'antd/lib';
import dayjs from 'dayjs';
import { InfoCircle, TickCircle } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import type { StudentFormEntity } from '@/app/features/component/table';
import { StudentTable, useTableStore } from '@/app/features/component/table';
import { TableLayout } from '@/app/layout';
import { Value } from '@/shared/components';
import { useToggle } from '@/shared/hooks';

function EditableTablePage() {
  const { t } = useTranslation();
  const [form] = Form.useForm<StudentFormEntity>();
  const {
    onClose: onCloseTour,
    onOpen: onOpenTour,
    open: openTour,
  } = useToggle();

  const { setTableStates, students } = useTableStore();

  const tabItems: ItemType[] = [
    {
      icon: <InfoCircle size={16} />,
      key: 'introduction',
      label: t('layout.action.introduction'),
      onClick: onOpenTour,
    },
    {
      icon: <TickCircle size={16} />,
      key: 'save',
      label: t('layout.action.saveData'),
      onClick: () => form.submit(),
    },
  ];

  const steps: TourProps['steps'] = [
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.overall.description.line1'),
            t('component.tour.editableTable.overall.description.line2'),
          ]}
        />
      ),
      placement: 'center',
      title: t('component.tour.editableTable.overall.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.input.description.line1'),
            t('component.tour.editableTable.input.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element =
          document.querySelector('.input-text-cell')?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.input.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.select.description.line1'),
            t('component.tour.editableTable.select.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element =
          document.querySelector('.input-select-cell')?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.select.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.date.description.line1'),
            t('component.tour.editableTable.date.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element =
          document.querySelector('.input-date-cell')?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.date.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.rangeDate.description.line1'),
            t('component.tour.editableTable.rangeDate.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector(
          '.input-range-date-cell',
        )?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.rangeDate.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.number.description.line1'),
            t('component.tour.editableTable.number.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element =
          document.querySelector('.input-number-cell')?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.number.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.textarea.description.line1'),
            t('component.tour.editableTable.textarea.description.line2'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector(
          '.input-textarea-cell',
        )?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.textarea.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.addMoreRow.description.line1'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector('.add-student-button');
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.addMoreRow.title'),
    },
    {
      description: (
        <Value.List
          value={[
            t('component.tour.editableTable.deleteRow.description.line1'),
          ]}
        />
      ),
      target: () => {
        const element = document.querySelector(
          '.delete-student-button',
        )?.parentElement;
        return element as HTMLElement;
      },
      title: t('component.tour.editableTable.deleteRow.title'),
    },
  ];

  return (
    <TableLayout
      route={{
        path: '/component/table/editable',
      }}
      tabItems={tabItems}
    >
      <Form<StudentFormEntity>
        form={form}
        initialValues={{
          students: students?.map(student => ({
            ...student,
            applyDate: [
              dayjs(student?.applyDate?.[0]),
              dayjs(student?.applyDate?.[1]),
            ],
            birthDate: dayjs(student.birthDate),
          })),
        }}
        layout="vertical"
        onFinish={values =>
          setTableStates({
            students: values.students,
          })
        }
        size="small"
      >
        <Form.Item<StudentFormEntity>
          className="mb-0"
          name="students"
          valuePropName="students"
        >
          <StudentTable />
        </Form.Item>
      </Form>
      <Tour onClose={onCloseTour} open={openTour} steps={steps} />
    </TableLayout>
  );
}

export default EditableTablePage;
