/* eslint-disable perfectionist/sort-objects */
import { Splitter } from 'antd';
import type ReactEcharts from 'echarts-for-react';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { EditableTableRow } from '@/app/features/component/table';
import type { BarTableEntity } from '@/app/features/feature/chart-playground';
import { BarChart, BarTable } from '@/app/features/feature/chart-playground';
import type { BreadcrumbItem } from '@/app/features/header';
import { ContentLayout } from '@/app/layout';

function ChartPlaygroundPage() {
  const chartRef = useRef<ReactEcharts>(null);

  const { t } = useTranslation();

  const breadCrumb: BreadcrumbItem[] = [
    {
      title: t('layout.title.feature'),
    },
    {
      title: t('layout.title.chartPlayground'),
    },
  ];

  const defaultValue: EditableTableRow<BarTableEntity[]> = useMemo(
    () => [
      {
        id: '0',
        key: 0,
        name: 'Transportation',
        stackId: undefined,
        monday: 50,
        tuesday: 45,
        wednesday: 40,
        thursday: 42,
        friday: 38,
        saturday: 55,
        sunday: 60,
      },
      {
        id: '1',
        key: 1,
        name: 'Entertainment',
        stackId: undefined,
        monday: 15 + 25,
        tuesday: 18 + 28,
        wednesday: 20 + 30,
        thursday: 22 + 32,
        friday: 24 + 35,
        saturday: 28 + 38,
        sunday: 30 + 40,
      },
      {
        id: '2',
        key: 2,
        name: 'Coffee',
        stackId: '1',
        monday: 15,
        tuesday: 18,
        wednesday: 20,
        thursday: 22,
        friday: 24,
        saturday: 28,
        sunday: 30,
      },
      {
        id: '3',
        key: 3,
        name: 'Movies',
        stackId: '1',
        monday: 25,
        tuesday: 28,
        wednesday: 30,
        thursday: 32,
        friday: 35,
        saturday: 38,
        sunday: 40,
      },
      {
        id: '4',
        key: 4,
        name: 'Food & Groceries',
        stackId: undefined,
        monday: 20 + 35 + 40 + 25 + 30,
        tuesday: 15 + 20 + 30 + 35 + 25,
        wednesday: 18 + 28 + 35 + 22 + 27,
        thursday: 22 + 33 + 37 + 30 + 29,
        friday: 25 + 30 + 45 + 28 + 35,
        saturday: 30 + 40 + 50 + 35 + 40,
        sunday: 28 + 38 + 48 + 32 + 36,
      },
      {
        id: '5',
        key: 5,
        name: 'Breakfast',
        stackId: '4',
        monday: 20,
        tuesday: 15,
        wednesday: 18,
        thursday: 22,
        friday: 25,
        saturday: 30,
        sunday: 28,
      },
      {
        id: '6',
        key: 6,
        name: 'Lunch',
        stackId: '4',
        monday: 35,
        tuesday: 20,
        wednesday: 28,
        thursday: 33,
        friday: 30,
        saturday: 40,
        sunday: 38,
      },
      {
        id: '7',
        key: 7,
        name: 'Dinner',
        stackId: '4',
        monday: 40,
        tuesday: 30,
        wednesday: 35,
        thursday: 37,
        friday: 45,
        saturday: 50,
        sunday: 48,
      },
      {
        id: '8',
        key: 8,
        name: 'Groceries',
        stackId: '4',
        monday: 25,
        tuesday: 35,
        wednesday: 22,
        thursday: 30,
        friday: 28,
        saturday: 35,
        sunday: 32,
      },
      {
        id: '9',
        key: 9,
        name: 'Snacks and Drinks',
        stackId: '4',
        monday: 30,
        tuesday: 25,
        wednesday: 27,
        thursday: 29,
        friday: 35,
        saturday: 40,
        sunday: 36,
      },
    ],
    [],
  );

  const [dataSource, setDataSource] =
    useState<EditableTableRow<BarTableEntity>[]>(defaultValue);

  return (
    <ContentLayout
      breadCrumb={breadCrumb}
      title={t('layout.title.chartPlayground')}
    >
      <Splitter>
        <Splitter.Panel defaultSize="50%">
          <BarTable
            chartRef={chartRef}
            dataSource={dataSource}
            setDataSource={setDataSource}
          />
        </Splitter.Panel>
        <Splitter.Panel defaultSize="50%">
          <BarChart dataSource={dataSource} ref={chartRef} />
        </Splitter.Panel>
      </Splitter>
    </ContentLayout>
  );
}

export default ChartPlaygroundPage;
