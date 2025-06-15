import { faker } from '@faker-js/faker/locale/en';
import { Flex } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { EditableTableRow } from '@/app/features/component/table';
import type {
  ExcelTableEntity,
  RangeAddress,
  RangeStyle,
} from '@/app/features/feature/excel';
import {
  ExcelActions,
  ExcelMode,
  ExcelTable,
  INITIAL_WIDTH,
} from '@/app/features/feature/excel';
import type { BreadcrumbItem } from '@/app/features/header';
import { useHeaderStore } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';
import { HEIGHT, SPACING } from '@/shared/assets/styles/constants';
import { useCalculateElementSize } from '@/shared/hooks';

function ExcelPage() {
  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.excel'),
    },
  ];

  const { getHeaderHeight } = useHeaderStore();
  const { height } = useCalculateElementSize({
    heightOffset:
      getHeaderHeight() +
      SPACING.contentPadding * 3 +
      HEIGHT.tableHeader * 2 +
      HEIGHT.compactAction,
  });

  const defaultValue: EditableTableRow<ExcelTableEntity>[] = useMemo(
    () =>
      Array(19)
        .fill(null)
        .map((_, index) => ({
          key: index + 2,
          name: faker.person.fullName(),
        })),
    [],
  );

  const [dataSource, setDataSource] =
    useState<EditableTableRow<ExcelTableEntity>[]>(defaultValue);
  const [widths, setWidths] =
    useState<Record<keyof ExcelTableEntity, number>>(INITIAL_WIDTH);
  const [mode, setMode] = useState<ExcelMode>(ExcelMode.Editing);
  const [selectedRange, setSelectedRange] = useState<null | RangeAddress>(null);

  // Muốn upgrade logic này thì hãy style cho từng cell, set bộ style cho range với start cell, tạm thời không làm vì mất thời gian
  const [rangeStyles, setRangeStyles] = useState<RangeStyle[]>([]);

  return (
    <ContentLayout breadCrumb={breadCrumb} title={t('layout.title.excel')}>
      <Flex gap="1rem" vertical>
        <ExcelActions
          dataSource={dataSource}
          mode={mode}
          rangeStyles={rangeStyles}
          selectedRange={selectedRange}
          setMode={setMode}
          setRangeStyles={setRangeStyles}
          widths={widths}
        />
        <ExcelTable
          dataSource={dataSource}
          mode={mode}
          rangeStyles={rangeStyles}
          selectedRange={selectedRange}
          setDataSource={setDataSource}
          setSelectedRange={setSelectedRange}
          setWidths={setWidths}
          tableHeight={height}
        />
      </Flex>
    </ContentLayout>
  );
}

export default ExcelPage;
