import { Table } from 'antd';
import { useTranslation } from 'react-i18next';

import { useHeaderStore } from '@/app/features/header';
import { HEIGHT, SPACING } from '@/shared/assets/styles/constants';
import { useCalculateElementSize } from '@/shared/hooks';
import { NumberTool } from '@/shared/utils';

import type { IncomeTableEntity } from '../model';
import { mockIncomeTable, useIncomeTableColumns } from '../model';
import MyTable from './MyTable';

const { formatMoney } = NumberTool;

function IncomeTable() {
  const { t } = useTranslation();
  const { columns } = useIncomeTableColumns();
  const { getHeaderHeight } = useHeaderStore();
  const { height } = useCalculateElementSize({
    heightOffset:
      getHeaderHeight() +
      SPACING.contentPadding * 2 +
      HEIGHT.tableHeader * 2 +
      40 * 2, // Summary row height
  });

  return (
    <MyTable<IncomeTableEntity>
      bordered
      columns={columns}
      dataSource={mockIncomeTable}
      expandable={{
        defaultExpandedRowKeys: [mockIncomeTable[3].id],
        expandedRowRender: () =>
          'This is a nested table. We can customize the row rendering by providing a function.',
        rowExpandable: ({ type }) => type === 'month',
      }}
      pagination={false}
      rowKey="id"
      scroll={{ x: 'max-content', y: height }}
      summary={data => {
        const salary = data.reduce((acc, item) => acc + item.salary, 0);
        const freelance = data.reduce((acc, item) => acc + item.freelance, 0);
        const otherIncome = data.reduce(
          (acc, item) => acc + item.otherIncome,
          0,
        );
        const rental = data.reduce((acc, item) => acc + item.rental, 0);
        const food = data.reduce((acc, item) => acc + item.food, 0);
        const grocery = data.reduce((acc, item) => acc + item.grocery, 0);
        const pharmacy = data.reduce((acc, item) => acc + item.pharmacy, 0);
        const fuel = data.reduce((acc, item) => acc + item.fuel, 0);
        const entertainment = data.reduce(
          (acc, item) => acc + item.entertainment,
          0,
        );
        const otherExpense = data.reduce(
          (acc, item) => acc + item.otherExpense,
          0,
        );
        const totalIncome = salary + freelance + otherIncome;
        const totalExpense =
          rental +
          food +
          grocery +
          pharmacy +
          fuel +
          entertainment +
          otherExpense;
        const remaining = totalIncome - totalExpense;

        return (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} />
              <Table.Summary.Cell index={1}>
                {t('component.table.summary')}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={2}>
                {formatMoney(salary)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={3}>
                {formatMoney(freelance)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={4}>
                {formatMoney(otherIncome)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={5}>
                {formatMoney(totalIncome)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={6}>
                {formatMoney(rental)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={7}>
                {formatMoney(food)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={8}>
                {formatMoney(grocery)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={9}>
                {formatMoney(pharmacy)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={10}>
                {formatMoney(fuel)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={11}>
                {formatMoney(entertainment)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={12}>
                {formatMoney(otherExpense)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={13}>
                {formatMoney(totalExpense)}
              </Table.Summary.Cell>
              <Table.Summary.Cell index={14} />
            </Table.Summary.Row>

            <Table.Summary.Row>
              <Table.Summary.Cell index={0} />
              <Table.Summary.Cell index={1}>
                {t('component.table.remaining')}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={2}>
                {formatMoney(remaining)}
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" colSpan={12} index={3} />
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
      tableName="expandableTable"
    />
  );
}

export default IncomeTable;
