import { Button, Flex, Tooltip, Typography } from 'antd';
import type ReactEcharts from 'echarts-for-react';
import { Eye, EyeSlash, Rank } from 'iconsax-react';
import type { Dispatch, SetStateAction } from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  type EditableColumnType,
  EditableTable,
  type EditableTableRow,
} from '@/app/features/component/table';
import { useHeaderStore } from '@/app/features/header';
import { HEIGHT, SPACING } from '@/shared/assets/styles/constants';
import { useCalculateElementSize } from '@/shared/hooks';
import { NumberTool } from '@/shared/utils';

import type { BarTableEntity } from '../model';

const { Text } = Typography;
const { formatMoney } = NumberTool;

interface Props {
  chartRef: React.RefObject<ReactEcharts>;
  dataSource: EditableTableRow<BarTableEntity>[];
  setDataSource: Dispatch<SetStateAction<EditableTableRow<BarTableEntity>[]>>;
}

function BarTable({ chartRef, dataSource, setDataSource }: Props) {
  const { t } = useTranslation();
  const { getHeaderHeight } = useHeaderStore();
  const { height } = useCalculateElementSize({
    heightOffset:
      getHeaderHeight() + SPACING.contentPadding * 2 + HEIGHT.tableHeader,
  });

  const calculateTotals = (children: EditableTableRow<BarTableEntity>[]) => {
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];

    return days.reduce(
      (acc, day) => {
        acc[day as keyof BarTableEntity] = children.reduce(
          (sum, child) =>
            sum + ((child[day as keyof BarTableEntity] as number) ?? 0),
          0,
        );
        return acc;
      },
      {} as Record<string, number>,
    );
  };

  const updateParentTotals = (
    data: EditableTableRow<BarTableEntity>[],
    stackId: string,
  ) => {
    const parent = data.find(item => item.id === stackId);
    if (!parent) return data;

    const children = data.filter(item => item.stackId === stackId);
    const totals = calculateTotals(children);

    return data.map(item =>
      item.key === parent.key ? { ...item, ...totals } : item,
    );
  };

  const updateRow = (
    data: EditableTableRow<BarTableEntity>[],
    row: EditableTableRow<BarTableEntity>,
  ) => data.map(item => (item.key === row.key ? { ...item, ...row } : item));

  const handleSave = (row: EditableTableRow<BarTableEntity>) => {
    let updatedData = updateRow(dataSource, row);

    if (row.stackId) {
      updatedData = updateParentTotals(updatedData, row.stackId);
    }

    setDataSource(updatedData);
  };

  const columns: EditableColumnType<EditableTableRow<BarTableEntity>>[] = [
    {
      dataIndex: 'name',
      editable: true,
      fixed: 'left',
      inputType: 'text',
      key: 'name',
      render: (_, { name }) => (
        <Text className="input-text-cell w-full text-wrap text-sm">{name}</Text>
      ),
      title: t('feature.chart.label.name'),
      width: 156,
    },
    {
      dataIndex: 'monday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'monday',
      render: (_, { monday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(monday)}
        </Text>
      ),
      title: t('feature.chart.label.mon'),
      width: 80,
    },
    {
      dataIndex: 'tuesday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'tuesday',
      render: (_, { tuesday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(tuesday)}
        </Text>
      ),
      title: t('feature.chart.label.tue'),
      width: 80,
    },
    {
      dataIndex: 'wednesday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'wednesday',
      render: (_, { wednesday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(wednesday)}
        </Text>
      ),
      title: t('feature.chart.label.wed'),
      width: 80,
    },
    {
      dataIndex: 'thursday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'thursday',
      render: (_, { thursday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(thursday)}
        </Text>
      ),
      title: t('feature.chart.label.thu'),
      width: 80,
    },
    {
      dataIndex: 'friday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'friday',
      render: (_, { friday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(friday)}
        </Text>
      ),
      title: t('feature.chart.label.fri'),
      width: 80,
    },
    {
      dataIndex: 'saturday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'saturday',
      render: (_, { saturday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(saturday)}
        </Text>
      ),
      title: t('feature.chart.label.sat'),
      width: 80,
    },
    {
      dataIndex: 'sunday',
      disabled: record => !record.stackId && !!record?.children?.length,
      editable: true,
      inputType: 'number',
      key: 'sunday',
      render: (_, { sunday }) => (
        <Text className="input-number-cell w-full text-wrap text-sm">
          {formatMoney(sunday)}
        </Text>
      ),
      title: t('feature.chart.label.sun'),
      width: 80,
    },
    {
      dataIndex: 'id',
      fixed: 'right',
      key: 'id',
      render: (_, record) => (
        <Flex align="center" gap="0.5rem">
          <Tooltip
            title={
              record?.hidden
                ? t('feature.chart.button.show')
                : t('feature.chart.button.hide')
            }
          >
            <Button
              icon={record?.hidden ? <EyeSlash size="20" /> : <Eye size="20" />}
              onClick={() => {
                handleSave({ ...record, hidden: !record.hidden });
                chartRef.current?.getEchartsInstance().dispatchAction({
                  name: record.name,
                  type: 'legendToggleSelect',
                });
              }}
            />
          </Tooltip>
          <Tooltip
            title={
              record?.emphasis
                ? t('feature.chart.button.deEmphasis')
                : t('feature.chart.button.emphasis')
            }
          >
            <Button
              icon={
                record?.emphasis ? (
                  <Rank size="20" variant="Bulk" />
                ) : (
                  <Rank size="20" />
                )
              }
              onClick={() => {
                handleSave({ ...record, emphasis: !record.emphasis });
              }}
            />
          </Tooltip>
        </Flex>
      ),
      width: 80,
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
        onCell: (record: EditableTableRow<BarTableEntity>) => ({
          ...child,
          handleSave,
          record,
        }),
      })),
      onCell: (record: EditableTableRow<BarTableEntity>) => ({
        ...col,
        handleSave,
        record,
      }),
    };
  });

  const formattedDataSource = useMemo(() => {
    const groupedData: EditableTableRow<BarTableEntity>[] = [];

    // Sort items: those without stackId first
    const sortedDataSource = [...dataSource].sort((a, b) => {
      if (a.stackId && !b.stackId) return 1;
      if (!a.stackId && b.stackId) return -1;
      return 0;
    });

    sortedDataSource.forEach(item => {
      const itemCopy = { ...item, children: [] }; // Single copy with an empty children array

      if (item.stackId) {
        const parent = groupedData.find(gItem => gItem.id === item.stackId);

        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(itemCopy);
        } else {
          // If parent is missing, treat this as a standalone item
          groupedData.push(itemCopy);
        }
      } else {
        groupedData.push(itemCopy);
      }
    });

    return groupedData;
  }, [dataSource]);

  return (
    <EditableTable<EditableTableRow<BarTableEntity>>
      columns={formattedColumns as EditableColumnType<BarTableEntity>[]}
      dataSource={formattedDataSource}
      expandable={{
        expandedRowRender: record =>
          `These are the details for ${record.name.toLowerCase()}, edit them as you wish.`,
        rowExpandable: ({ children, stackId }) =>
          !stackId && !!children?.length,
      }}
      pagination={false}
      resizable
      rowKey="id"
      scroll={{ x: 'max-content', y: height }}
    />
  );
}

export default BarTable;
