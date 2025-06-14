import { useTranslation } from 'react-i18next';

import { NumberTool } from '@/shared/utils';

import type { IncomeTableEntity, MyTableColumn } from './types';

const { formatMoney } = NumberTool;

export const useIncomeTableColumns = () => {
  const { t } = useTranslation();

  const columns: MyTableColumn<IncomeTableEntity>[] = [
    {
      dataIndex: 'name',
      fixed: 'left',
      key: 'name',
      title: t('component.table.name'),
      titleI18Key: 'component.table.name',
      width: 200,
    },
    {
      children: [
        {
          align: 'right',
          dataIndex: 'salary',
          key: 'salary',
          render: value => formatMoney(value),
          title: t('component.table.salary'),
          titleI18Key: 'component.table.salary',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'freelance',
          key: 'freelance',
          render: value => formatMoney(value),
          title: t('component.table.freelance'),
          titleI18Key: 'component.table.freelance',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'otherIncome',
          key: 'otherIncome',
          render: value => formatMoney(value),
          title: t('component.table.other'),
          titleI18Key: 'component.table.other',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'totalIncome',
          key: 'totalIncome',
          render: value => formatMoney(value),
          title: t('component.table.total'),
          titleI18Key: 'component.table.total',
          width: 200,
        },
      ],
      key: 'income',
      title: t('component.table.income'),
      titleI18Key: 'component.table.income',
      width: 800,
    },
    {
      children: [
        {
          align: 'right',
          dataIndex: 'rental',
          key: 'rental',
          render: value => formatMoney(value),
          title: t('component.table.rental'),
          titleI18Key: 'component.table.rental',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'food',
          key: 'food',
          render: value => formatMoney(value),
          title: t('component.table.food'),
          titleI18Key: 'component.table.food',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'grocery',
          key: 'grocery',
          render: value => formatMoney(value),
          title: t('component.table.grocery'),
          titleI18Key: 'component.table.grocery',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'pharmacy',
          key: 'pharmacy',
          render: value => formatMoney(value),
          title: t('component.table.pharmacy'),
          titleI18Key: 'component.table.pharmacy',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'fuel',
          key: 'fuel',
          render: value => formatMoney(value),
          title: t('component.table.fuel'),
          titleI18Key: 'component.table.fuel',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'entertainment',
          key: 'entertainment',
          render: value => formatMoney(value),
          title: t('component.table.entertainment'),
          titleI18Key: 'component.table.entertainment',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'otherExpense',
          key: 'otherExpense',
          render: value => formatMoney(value),
          title: t('component.table.other'),
          titleI18Key: 'component.table.other',
          width: 200,
        },
        {
          align: 'right',
          dataIndex: 'totalExpense',
          key: 'totalExpense',
          render: value => formatMoney(value),
          title: t('component.table.total'),
          titleI18Key: 'component.table.total',
          width: 200,
        },
      ],
      key: 'expense',
      title: t('component.table.expense'),
      titleI18Key: 'component.table.expense',
      width: 1600,
    },
    {
      dataIndex: 'note',
      key: 'note',
      title: t('component.table.note'),
      titleI18Key: 'component.table.note',
      width: 200,
    },
  ];

  return { columns };
};
