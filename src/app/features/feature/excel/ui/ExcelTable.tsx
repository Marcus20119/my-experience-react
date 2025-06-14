import { Typography } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type {
  EditableColumnType,
  EditableTableRow,
} from '@/app/features/component/table';
import { EditableTable } from '@/app/features/component/table';
import { useClickOutside } from '@/shared/hooks';
import { DateTimeTool, NumberTool } from '@/shared/utils';

import { getExcelColumnName } from '../lib';
import type { ExcelTableEntity, RangeAddress, RangeStyle } from '../model';
import {
  EXCEL_ACTION_CLASS,
  EXCEL_ACTION_ID,
  ExcelMode,
  INITIAL_WIDTH,
} from '../model';
import { StyledExcelWrapper } from './styles';

const { Paragraph, Text } = Typography;
const { formatDate } = DateTimeTool;
const { formatMoney } = NumberTool;

interface Props {
  dataSource: EditableTableRow<ExcelTableEntity>[];
  mode: ExcelMode;
  rangeStyles: RangeStyle[];
  selectedRange: null | RangeAddress;
  setDataSource: Dispatch<SetStateAction<EditableTableRow<ExcelTableEntity>[]>>;
  setSelectedRange: Dispatch<SetStateAction<null | RangeAddress>>;
  setWidths: Dispatch<SetStateAction<Record<keyof ExcelTableEntity, number>>>;
  tableHeight: number;
}

function ExcelTable({
  dataSource,
  mode,
  rangeStyles,
  selectedRange,
  setDataSource,
  setSelectedRange,
  setWidths,
  tableHeight,
}: Props) {
  const { t } = useTranslation();

  const [isMouseDown, setIsMouseDown] = useState(false);

  useClickOutside({
    callback: () => setSelectedRange(null),
    exceptions: [
      ...[
        EXCEL_ACTION_ID.bold,
        EXCEL_ACTION_ID.italic,
        EXCEL_ACTION_ID.underline,
      ].map(id => `#${id}`),
      ...[
        EXCEL_ACTION_CLASS.fill,
        EXCEL_ACTION_CLASS.textColor,
        'ant-color-picker',
      ].map(className => `.${className}`),
    ],
    selector: '.ant-table-body',
  });

  const handleSave = useCallback(
    (row: EditableTableRow<ExcelTableEntity>) => {
      const newData = [...dataSource];
      const index = newData.findIndex(item => row.key === item.key);
      const item = newData[index];

      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
    },
    [dataSource, setDataSource],
  );

  const columns = useMemo<
    EditableColumnType<EditableTableRow<ExcelTableEntity>>[]
  >(
    () => [
      {
        align: 'center',
        className: 'bg-neutral-100',
        dataIndex: 'key',
        fixed: 'left',
        inputType: 'text',
        key: 'key',
        render: (_, { key }) => (
          <Text className="row-key-cell w-full text-wrap text-sm font-semibold">
            {key}
          </Text>
        ),
        title: 1,
        width: INITIAL_WIDTH.key,
      },
      {
        dataIndex: 'name',
        editable: mode === ExcelMode.Editing,
        fixed: 'left',
        inputType: 'text',
        key: 'name',
        render: (_, { name }) => (
          <Text className="w-full text-wrap text-sm">{name}</Text>
        ),
        title: t('feature.excel.label.name'),
        width: INITIAL_WIDTH.name,
      },
      {
        dataIndex: 'age',
        editable: mode === ExcelMode.Editing,
        inputNumberProps: {
          min: 0,
        },
        inputType: 'number',
        key: 'age',
        render: (_, { age }) => (
          <Text className="w-full text-wrap text-sm">{age}</Text>
        ),
        title: t('feature.excel.label.age'),
        width: INITIAL_WIDTH.age,
      },
      {
        dataIndex: 'dayOfBirth',
        editable: mode === ExcelMode.Editing,
        inputType: 'date',
        key: 'dayOfBirth',
        render: (_, { dayOfBirth }) => (
          <Text className="w-full text-wrap text-sm">
            {formatDate(dayOfBirth)}
          </Text>
        ),
        title: t('feature.excel.label.dayOfBirth'),
        width: INITIAL_WIDTH.dayOfBirth,
      },
      {
        dataIndex: 'salary',
        editable: mode === ExcelMode.Editing,
        inputNumberProps: {
          min: 0,
        },
        inputType: 'number',
        key: 'salary',
        render: (_, { salary }) =>
          salary ? (
            <Text className="w-full text-wrap text-sm">
              {formatMoney(salary)}
            </Text>
          ) : null,
        title: t('feature.excel.label.salary'),
        width: INITIAL_WIDTH.salary,
      },
      {
        dataIndex: 'otherIncome',
        editable: mode === ExcelMode.Editing,
        inputNumberProps: {
          min: 0,
        },
        inputType: 'number',
        key: 'otherIncome',
        render: (_, { otherIncome }) =>
          otherIncome ? (
            <Text className="w-full text-wrap text-sm">
              {formatMoney(otherIncome)}
            </Text>
          ) : null,
        title: t('feature.excel.label.otherIncome'),
        width: INITIAL_WIDTH.otherIncome,
      },
      {
        dataIndex: 'note',
        editable: mode === ExcelMode.Editing,
        inputTextAreaProps: {
          autoSize: true,
        },
        inputType: 'textarea',
        key: 'note',
        render: (_, { note }) => (
          <Paragraph className="mb-0 w-full whitespace-pre-line text-wrap text-sm">
            {note}
          </Paragraph>
        ),

        title: t('feature.excel.label.note'),
        width: INITIAL_WIDTH.note,
      },
    ],
    [mode, t],
  );

  const formattedColumns = useMemo(() => {
    const excelColumns: EditableColumnType<
      EditableTableRow<ExcelTableEntity>
    >[] = columns.map((col, index) => {
      const colName = getExcelColumnName(index);

      return {
        align: 'center',
        children: [{ ...col, ['data-col-key']: colName }],
        className: 'bg-neutral-100',
        editable: col.editable,
        fixed: col.fixed,
        title: colName,
        width: col.width,
      };
    });

    return excelColumns.map(col => {
      const stylingEvents = {
        onMouseDown: (e: MouseEvent) => {
          if (mode === ExcelMode.Styling) {
            document.body.style.cursor = 'cell';
            const cell = e.currentTarget as HTMLTableCellElement;
            const row = cell.parentElement as HTMLTableRowElement;

            const colKey = cell?.dataset?.colKey;
            const rowKey = row?.dataset?.rowKey;

            if (!colKey || !rowKey) return;

            setIsMouseDown(true);
            setSelectedRange({
              end: {
                col: colKey,
                row: Number(rowKey),
              },
              start: {
                col: colKey,
                row: Number(rowKey),
              },
            });
          }
        },
        onMouseEnter: (e: MouseEvent) => {
          if (mode === ExcelMode.Styling) {
            if (!isMouseDown) return;

            const cell = e.currentTarget as HTMLTableCellElement;
            const row = cell.parentElement as HTMLTableRowElement;

            const colKey = cell?.dataset?.colKey;
            const rowKey = row?.dataset?.rowKey;

            if (!colKey || !rowKey) return;

            setSelectedRange(prev => {
              if (!prev) return null;

              return {
                ...prev,
                end: {
                  col: colKey,
                  row: Number(rowKey),
                },
              };
            });
          }
        },
        onMouseUp: () => {
          if (mode === ExcelMode.Styling) {
            document.body.style.cursor = 'default';
            setIsMouseDown(false);
          }
        },
      };

      if (!col.editable && mode === ExcelMode.Styling) {
        return {
          ...col,
          children: col.children?.map(child => ({
            ...child,

            onCell: (record: EditableTableRow<ExcelTableEntity>) => ({
              ...child,
              ...stylingEvents,
              record,
            }),
          })),
        };
      }

      if (!col.editable && mode === ExcelMode.Editing) {
        return col;
      }

      return {
        ...col,
        children: col.children?.map(child => ({
          ...child,
          onCell: (record: EditableTableRow<ExcelTableEntity>) => ({
            ...child,
            handleSave,
            record,
          }),
        })),
        onCell: (record: EditableTableRow<ExcelTableEntity>) => ({
          ...col,
          handleSave,
          record,
        }),
      };
    });
  }, [columns, handleSave, isMouseDown, mode, setSelectedRange]);

  return (
    <StyledExcelWrapper rangeStyles={rangeStyles} selectedRange={selectedRange}>
      <EditableTable<EditableTableRow<ExcelTableEntity>>
        columns={formattedColumns as EditableColumnType<ExcelTableEntity>[]}
        dataSource={dataSource}
        onResize={columns => {
          const widths = columns.reduce(
            (acc, col) => {
              const key = col.children?.[0].dataIndex as keyof ExcelTableEntity;
              acc[key] = col.children?.[0].width ?? 0;
              return acc;
            },
            {} as Record<keyof ExcelTableEntity, number>,
          );

          setWidths(widths);
        }}
        pagination={false}
        resizable
        scroll={{ x: 'max-content', y: tableHeight }}
      />
    </StyledExcelWrapper>
  );
}

export default ExcelTable;
