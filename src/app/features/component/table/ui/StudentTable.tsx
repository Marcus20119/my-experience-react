import { Button, Flex, Popconfirm, Typography } from 'antd';
import dayjs from 'dayjs';
import { Add, Trash } from 'iconsax-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useHeaderStore } from '@/app/features/header';
import { HEIGHT, SPACING } from '@/shared/assets/styles/constants';
import { Select } from '@/shared/components';
import { useCalculateElementSize } from '@/shared/hooks';
import { DateTimeTool } from '@/shared/utils';

import type {
  EditableColumnType,
  EditableTableRow,
  StudentTableEntity,
} from '../model';
import { Gender } from '../model';
import EditableTable from './EditableTable';

const { Paragraph, Text } = Typography;
const { formatDate, formatDateRange } = DateTimeTool;

const ADD_STUDENT_BUTTON_HEIGHT = 48;

interface Props {
  onChange?: (students: StudentTableEntity[]) => void;
  students?: StudentTableEntity[];
}

function StudentTable({ onChange, students }: Props) {
  const { t } = useTranslation();
  const { getHeaderHeight } = useHeaderStore();
  const { height } = useCalculateElementSize({
    heightOffset:
      getHeaderHeight() +
      SPACING.contentPadding * 2 +
      HEIGHT.tableHeader * 2 +
      ADD_STUDENT_BUTTON_HEIGHT,
  });

  const defaultValue: EditableTableRow<StudentTableEntity> = useMemo(
    () => ({
      applyDate: [dayjs(), dayjs().add(1, 'month')],
      birthDate: dayjs(),
      chemistry: 0,
      english: 0,
      gender: undefined,
      key: 0,
      literature: 0,
      math: 0,
      name: 'Student 1',
      note: undefined,
      physics: 0,
    }),
    [],
  );

  const [dataSource, setDataSource] = useState<
    EditableTableRow<StudentTableEntity>[]
  >([defaultValue]);

  const [count, setCount] = useState(1);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter(item => item.key !== key);
    setDataSource(newData);
    onChange?.(newData);
  };

  const handleAdd = () => {
    const newData: EditableTableRow<StudentTableEntity> = {
      ...defaultValue,
      key: count,
      name: `Student ${count + 1}`,
    };
    setDataSource([...dataSource, newData]);
    onChange?.([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: EditableTableRow<StudentTableEntity>) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
    onChange?.(newData);
  };

  const columns: EditableColumnType<EditableTableRow<StudentTableEntity>>[] = [
    {
      dataIndex: 'name',
      editable: true,
      fixed: 'left',
      inputType: 'text',
      key: 'name',
      render: (_, { name }) => (
        <Text className="input-text-cell w-full text-wrap text-sm">{name}</Text>
      ),
      title: t('component.table.name'),
      width: 180,
    },
    {
      dataIndex: 'gender',
      key: 'gender',
      render: (_, student) => (
        <Select
          className="w-full"
          onChange={value =>
            handleSave({
              ...student,
              gender: value,
            })
          }
          options={[
            {
              label: t('common.gender.male'),
              value: Gender.Male,
            },
            {
              label: t('common.gender.female'),
              value: Gender.Female,
            },
            {
              label: t('common.gender.nonBinary'),
              value: Gender.NonBinary,
            },
          ]}
          placeholder={t('common.placeholder.selectGender')}
          rootClassName="input-select-cell"
          value={student.gender}
        />
      ),
      title: t('component.table.gender'),
      width: 180,
    },
    {
      align: 'right',
      dataIndex: 'birthDate',
      editable: true,
      inputType: 'date',
      key: 'birthDate',
      render: (_, { birthDate }) => (
        <Text className="input-date-cell w-full text-wrap text-right text-sm">
          {formatDate(birthDate)}
        </Text>
      ),
      title: t('component.table.birthDate'),
      width: 180,
    },
    {
      align: 'right',
      dataIndex: 'applyDate',
      editable: true,
      inputType: 'rangeDate',
      key: 'applyDate',
      render: (_, { applyDate }) => (
        <Text className="input-range-date-cell w-full text-wrap text-right text-sm">
          {formatDateRange(applyDate?.[0], applyDate?.[1])}
        </Text>
      ),
      title: t('component.table.applyDate'),
      width: 240,
    },
    {
      align: 'center',
      children: [
        {
          align: 'right',
          dataIndex: 'math',
          editable: true,
          inputNumberProps: {
            max: 10,
            min: 0,
            precision: 2,
            step: 0.25,
          },
          inputType: 'number',
          key: 'math',
          render: (_, { math }) => (
            <Text className="input-number-cell w-full text-wrap text-right text-sm">
              {math}
            </Text>
          ),
          title: t('component.table.math'),
          width: 100,
        },
        {
          align: 'right',
          dataIndex: 'literature',
          editable: true,
          inputNumberProps: {
            max: 10,
            min: 0,
            precision: 2,
            step: 0.25,
          },
          inputType: 'number',
          key: 'literature',
          render: (_, { literature }) => (
            <Text className="w-full text-wrap text-right text-sm">
              {literature}
            </Text>
          ),
          title: t('component.table.literature'),
          width: 100,
        },
        {
          align: 'right',
          dataIndex: 'physics',
          editable: true,
          inputNumberProps: {
            max: 10,
            min: 0,
            precision: 2,
            step: 0.25,
          },
          inputType: 'number',
          key: 'physics',
          render: (_, { physics }) => (
            <Text className="w-full text-wrap text-right text-sm">
              {physics}
            </Text>
          ),
          title: t('component.table.physics'),
          width: 100,
        },
        {
          align: 'right',
          dataIndex: 'english',
          editable: true,
          inputNumberProps: {
            max: 10,
            min: 0,
            precision: 2,
            step: 0.25,
          },
          inputType: 'number',
          key: 'english',
          render: (_, { english }) => (
            <Text className="w-full text-wrap text-right text-sm">
              {english}
            </Text>
          ),
          title: t('component.table.english'),
          width: 100,
        },
        {
          align: 'right',
          dataIndex: 'chemistry',
          editable: true,
          inputNumberProps: {
            max: 10,
            min: 0,
            precision: 2,
            step: 0.25,
          },
          inputType: 'number',
          key: 'chemistry',
          render: (_, { chemistry }) => (
            <Text className="w-full text-wrap text-right text-sm">
              {chemistry}
            </Text>
          ),
          title: t('component.table.chemistry'),
          width: 100,
        },
      ],
      editable: true,
      title: t('component.table.academicTranscript'),
      width: 500,
    },
    {
      dataIndex: 'note',
      editable: true,
      inputTextAreaProps: {
        autoSize: true,
      },
      inputType: 'textarea',
      key: 'note',
      render: (_, { note }) => (
        <Paragraph className="input-textarea-cell mb-0 w-full whitespace-pre-line text-wrap text-sm">
          {note}
        </Paragraph>
      ),
      title: t('component.table.note'),
      width: 320,
    },
    {
      align: 'center',
      fixed: 'right',
      key: 'actions',
      render: (_, record) =>
        dataSource.length > 1 ? (
          <Popconfirm
            cancelButtonProps={{
              size: 'small',
              style: { fontSize: '0.875rem' },
            }}
            cancelText={t('common.button.cancel')}
            okButtonProps={{
              size: 'small',
              style: { fontSize: '0.875rem' },
            }}
            okText={t('common.button.delete')}
            onConfirm={() => handleDelete(record?.key ?? '')}
            title={t('common.title.sureDelete')}
          >
            <Button
              icon={<Trash size="20" />}
              rootClassName="delete-student-button"
            />
          </Popconfirm>
        ) : null,
      width: 60,
    },
  ];

  const formattedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      children: col.children?.map(child => ({
        ...child,
        onCell: (record: EditableTableRow<StudentTableEntity>) => ({
          ...child,
          handleSave,
          record,
        }),
      })),
      onCell: (record: EditableTableRow<StudentTableEntity>) => ({
        ...col,
        handleSave,
        record,
      }),
    };
  });

  useEffect(() => {
    if (students && count === 1) {
      setDataSource(
        students.map((student, index) => ({
          ...student,
          key: index,
        })),
      );
      setCount(students.length);
    }

    if (!students && count > 1) {
      setDataSource([defaultValue]);
      setCount(1);
    }
  }, [count, defaultValue, students]);

  return (
    <Flex vertical>
      <EditableTable<EditableTableRow<StudentTableEntity>>
        columns={formattedColumns as EditableColumnType<StudentTableEntity>[]}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content', y: height }}
      />
      <Flex
        align="center"
        className="add-student-button cursor-pointer border border-x-0 border-b border-t-0 border-solid border-neutral-100 border-b-neutral-500 px-3 py-3 hover:bg-primaryLight hover:text-primary"
        gap="0.75rem"
        onClick={handleAdd}
        style={{ height: ADD_STUDENT_BUTTON_HEIGHT }}
      >
        <Add size={20} />
        <Text className="text-sm font-medium text-inherit">
          {t('component.button.student')}
        </Text>
      </Flex>
    </Flex>
  );
}

export default StudentTable;
