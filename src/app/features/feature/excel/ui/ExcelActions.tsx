import { Button, ColorPicker, Segmented } from 'antd';
import dayjs from 'dayjs';
import {
  DocumentDownload,
  Text,
  TextBold,
  TextItalic,
  TextUnderline,
} from 'iconsax-react';
import merge from 'lodash-es/merge';
import type { Dispatch, SetStateAction } from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx-js-style';

import type { EditableTableRow } from '@/app/features/component/table';
import { cn } from '@/lib/tailwind';
import { COLOR } from '@/shared/assets/styles/constants';
import type { CompactActionEntity } from '@/shared/components';
import { Action } from '@/shared/components';

import { getExcelRange, isSameRange } from '../lib';
import type {
  ExcelExportTableEntity,
  ExcelTableEntity,
  RangeAddress,
  RangeStyle,
} from '../model';
import { EXCEL_ACTION_CLASS, EXCEL_ACTION_ID, ExcelMode } from '../model';

interface Props {
  dataSource: EditableTableRow<ExcelTableEntity>[];
  mode: ExcelMode;
  rangeStyles: RangeStyle[];
  selectedRange: null | RangeAddress;
  setMode: Dispatch<SetStateAction<ExcelMode>>;
  setRangeStyles: Dispatch<SetStateAction<RangeStyle[]>>;
  widths: Record<keyof ExcelTableEntity, number>;
}

function ExcelActions({
  dataSource,
  mode,
  rangeStyles,
  selectedRange,
  setMode,
  setRangeStyles,
  widths,
}: Props) {
  const { t } = useTranslation();

  const currentRangeStyle = useMemo(
    () => rangeStyles.find(style => isSameRange(style.range, selectedRange)),
    [selectedRange, rangeStyles],
  );

  const onSetStyle = useCallback(
    (style: XLSX.CellStyle) => {
      if (!selectedRange) return;

      const newStyles = [...rangeStyles];
      const index = newStyles.findIndex(item =>
        isSameRange(item.range, selectedRange),
      );

      if (index >= 0) {
        const currentStyle = newStyles[index];
        // Use Lodash's merge to deeply merge objects
        newStyles.splice(index, 1, {
          range: currentStyle.range,
          style: merge({}, currentStyle.style, style), // Merge the styles
        });
      } else {
        newStyles.push({
          range: selectedRange,
          style,
        });
      }

      setRangeStyles(newStyles);
    },
    [selectedRange, setRangeStyles, rangeStyles],
  );

  const handleExport = useCallback(() => {
    const wb = XLSX.utils.book_new();
    const order: (keyof ExcelExportTableEntity)[] = [
      'name',
      'age',
      'dayOfBirth',
      'salary',
      'otherIncome',
      'note',
    ];
    const header: Record<keyof ExcelExportTableEntity, string> = {
      age: t('feature.excel.label.age'),
      dayOfBirth: t('feature.excel.label.dayOfBirth'),
      name: t('feature.excel.label.name'),
      note: t('feature.excel.label.note'),
      otherIncome: t('feature.excel.label.otherIncome'),
      salary: t('feature.excel.label.salary'),
    };

    const mappedHeader = order.map(key => header[key]);
    const mappedData: (Date | number | string)[][] = dataSource.map(row =>
      order.map(key => {
        if (key === 'dayOfBirth' && row[key]) {
          return dayjs(row[key] as string).toDate();
        }

        return row[key] ?? '';
      }),
    );

    const ws = XLSX.utils.aoa_to_sheet([mappedHeader, ...mappedData], {
      cellDates: true,
    });

    // Set column widths
    ws['!cols'] = order.map(key => ({
      wpx: widths[key],
    }));

    const headerRange = XLSX.utils.decode_range(
      getExcelRange(mappedData, 'A1'),
    );
    const bodyRange = XLSX.utils.decode_range(getExcelRange(mappedData, 'A2'));

    const headerCellStyle: XLSX.CellStyle = {
      fill: { fgColor: { rgb: 'f5f5f5' } },
      font: {
        bold: true,
        sz: 14,
      },
    };

    // Set header style
    for (let R = headerRange.s.r; R <= headerRange.e.r; ++R) {
      for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
        const cell: XLSX.CellObject =
          ws[XLSX.utils.encode_cell({ c: C, r: R })];

        if (!cell) {
          continue;
        }

        cell.s = headerCellStyle;
      }
    }

    const defaultBodyCellStyle: XLSX.CellStyle = {
      font: {
        sz: 14,
      },
    };

    // Set body style
    for (let R = bodyRange.s.r; R <= bodyRange.e.r; ++R) {
      for (let C = bodyRange.s.c; C <= bodyRange.e.c; ++C) {
        const cell: XLSX.CellObject =
          ws[XLSX.utils.encode_cell({ c: C, r: R })];

        if (!cell) {
          continue;
        }

        cell.s = defaultBodyCellStyle;
      }
    }

    // Set custom styles
    rangeStyles.forEach(({ range, style }) => {
      const { end, start } = range;
      const customRange = XLSX.utils.decode_range(
        `${start.col}${start.row}:${end.col}${end.row}`,
      );

      for (let R = customRange.s.r; R <= customRange.e.r; ++R) {
        for (let C = customRange.s.c; C <= customRange.e.c; ++C) {
          const cell: XLSX.CellObject =
            ws[XLSX.utils.encode_cell({ c: C, r: R })];

          if (!cell) {
            continue;
          }

          cell.s = merge({}, cell.s, style);
        }
      }
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'excel_feature.xlsx');
  }, [dataSource, rangeStyles, t, widths]);

  const actions = useMemo<CompactActionEntity[]>(
    () => [
      {
        element: (
          <Segmented<ExcelMode>
            onChange={setMode}
            options={[
              {
                label: t('feature.excel.label.editing'),
                value: ExcelMode.Editing,
              },
              {
                label: t('feature.excel.label.styling'),
                value: ExcelMode.Styling,
              },
            ]}
            rootClassName="rounded-r-none"
            value={mode}
          />
        ),
        type: 'custom',
      },
      {
        active: currentRangeStyle?.style?.font?.bold,
        disabled: !selectedRange,
        icon: <TextBold size="16" />,
        id: EXCEL_ACTION_ID.bold,
        label: t('feature.excel.label.bold'),
        onClick: () => {
          onSetStyle({
            font: {
              bold: !currentRangeStyle?.style?.font?.bold,
            },
          });
        },
        type: 'button',
      },
      {
        active: currentRangeStyle?.style?.font?.italic,
        disabled: !selectedRange,
        icon: <TextItalic size="16" />,
        id: EXCEL_ACTION_ID.italic,
        label: t('feature.excel.label.italic'),
        onClick: () => {
          onSetStyle({
            font: {
              italic: !currentRangeStyle?.style?.font?.italic,
            },
          });
        },
        type: 'button',
      },
      {
        active: currentRangeStyle?.style?.font?.underline,
        disabled: !selectedRange,
        icon: <TextUnderline size="20" />,
        id: EXCEL_ACTION_ID.underline,
        label: t('feature.excel.label.underline'),
        onClick: () => {
          onSetStyle({
            font: {
              underline: !currentRangeStyle?.style?.font?.underline,
            },
          });
        },
        type: 'button',
      },
      {
        element: (
          // Need Fragment to Tooltip work
          <>
            <ColorPicker
              disabled={!selectedRange}
              onChange={color => {
                if (selectedRange) {
                  onSetStyle({
                    font: {
                      color: { rgb: color.toHexString().replace('#', '') },
                    },
                  });
                }
              }}
              value={
                selectedRange && currentRangeStyle?.style?.font?.color?.rgb
                  ? `#${currentRangeStyle?.style?.font?.color?.rgb}`
                  : COLOR.neutral['800']
              }
            >
              <Button
                className={cn(
                  EXCEL_ACTION_CLASS.textColor,
                  'flex w-8 items-center justify-center border-neutral-300',
                  !selectedRange
                    ? 'cursor-not-allowed bg-neutral-100'
                    : 'cursor-pointer bg-neutral-0 hover:border-neutral-600 hover:bg-neutral-100',
                )}
                icon={
                  <Text
                    color={
                      selectedRange &&
                      currentRangeStyle?.style?.font?.color?.rgb
                        ? `#${currentRangeStyle?.style?.font?.color?.rgb}`
                        : COLOR.neutral['800']
                    }
                    size="16"
                  />
                }
              />
            </ColorPicker>
          </>
        ),
        label: t('feature.excel.label.textColor'),
        type: 'custom',
      },
      {
        element: (
          <ColorPicker
            className={cn(
              'flex w-8 items-center justify-center',
              EXCEL_ACTION_CLASS.fill,
              !selectedRange
                ? 'bg-neutral-100'
                : 'bg-neutral-0 hover:border-neutral-600 hover:bg-neutral-100',
            )}
            disabled={!selectedRange}
            onChange={color => {
              if (selectedRange) {
                onSetStyle({
                  fill: {
                    fgColor: { rgb: color.toHexString().replace('#', '') },
                  },
                });
              }
            }}
            value={
              selectedRange && currentRangeStyle?.style?.fill?.fgColor?.rgb
                ? `#${currentRangeStyle?.style?.fill?.fgColor?.rgb}`
                : '#ffffff'
            }
          />
        ),
        label: t('feature.excel.label.fill'),
        type: 'custom',
      },
      {
        icon: <DocumentDownload size="20" />,
        label: 'download',
        onClick: () => {
          handleExport();
        },
        type: 'button',
      },
    ],
    [
      currentRangeStyle?.style?.fill?.fgColor?.rgb,
      currentRangeStyle?.style?.font?.bold,
      currentRangeStyle?.style?.font?.color?.rgb,
      currentRangeStyle?.style?.font?.italic,
      currentRangeStyle?.style?.font?.underline,
      handleExport,
      mode,
      onSetStyle,
      selectedRange,
      setMode,
      t,
    ],
  );

  return <Action.Compact actions={actions} />;
}

export default ExcelActions;
