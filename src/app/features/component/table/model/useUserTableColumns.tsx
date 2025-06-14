import { Button, Flex } from 'antd';
import { Edit2, Trash } from 'iconsax-react';
import { useTranslation } from 'react-i18next';

import { Cell } from '../ui';
import type { MyTableColumn, UserTableEntity } from './types';

export const useUserTableColumns = () => {
  const { t } = useTranslation();

  const columns: MyTableColumn<UserTableEntity>[] = [
    {
      dataIndex: 'user',
      fixed: 'left',
      key: 'user',
      render: (_, { user }) => (
        <Cell.User
          additionalInfo={user.email}
          avatar={user.avatar}
          name={user.name}
        />
      ),
      shouldCellUpdate: (record, prevRecord) =>
        record.user.name !== prevRecord.user.name,
      showSorterTooltip: false,
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
      title: t('component.table.user'),
      titleI18Key: 'component.table.user',
      width: 200,
    },
    {
      dataIndex: 'address',
      ellipsis: true,
      key: 'address',
      shouldCellUpdate: (record, prevRecord) =>
        record.address !== prevRecord.address,
      showSorterTooltip: false,
      sorter: (a, b) => a.address.localeCompare(b.address),
      title: t('component.table.address'),
      titleI18Key: 'component.table.address',
      width: 200,
    },
    {
      dataIndex: 'phoneNumber',
      ellipsis: true,
      key: 'phoneNumber',
      shouldCellUpdate: (record, prevRecord) =>
        record.phoneNumber !== prevRecord.phoneNumber,
      showSorterTooltip: false,
      sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
      title: t('component.table.phoneNumber'),
      titleI18Key: 'component.table.phoneNumber',
      width: 200,
    },
    {
      dataIndex: 'city',
      ellipsis: true,
      key: 'city',
      shouldCellUpdate: (record, prevRecord) => record.city !== prevRecord.city,
      showSorterTooltip: false,
      sorter: (a, b) => a.city.localeCompare(b.city),
      title: t('component.table.city'),
      titleI18Key: 'component.table.city',
      width: 200,
    },
    {
      dataIndex: 'nationality',
      ellipsis: true,
      key: 'nationality',
      shouldCellUpdate: (record, prevRecord) =>
        record.nationality !== prevRecord.nationality,
      showSorterTooltip: false,
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      title: t('component.table.nationality'),
      titleI18Key: 'component.table.nationality',
      width: 200,
    },
    {
      dataIndex: 'gender',
      ellipsis: true,
      key: 'gender',
      shouldCellUpdate: (record, prevRecord) =>
        record.gender !== prevRecord.gender,
      showSorterTooltip: false,
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      title: t('component.table.gender'),
      titleI18Key: 'component.table.gender',
      width: 200,
    },
    {
      dataIndex: 'bio',
      ellipsis: true,
      key: 'bio',
      shouldCellUpdate: (record, prevRecord) => record.bio !== prevRecord.bio,
      showSorterTooltip: false,
      title: t('component.table.bio'),
      titleI18Key: 'component.table.bio',
      width: 200,
    },
    {
      dataIndex: 'vehicle',
      ellipsis: true,
      key: 'vehicle',
      shouldCellUpdate: (record, prevRecord) =>
        record.vehicle !== prevRecord.vehicle,
      showSorterTooltip: false,
      sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),
      title: t('component.table.vehicle'),
      titleI18Key: 'component.table.vehicle',
      width: 200,
    },
    {
      dataIndex: 'job',
      ellipsis: true,
      key: 'job',
      shouldCellUpdate: (record, prevRecord) => record.job !== prevRecord.job,
      showSorterTooltip: false,
      sorter: (a, b) => a.job.localeCompare(b.job),
      title: t('component.table.job'),
      titleI18Key: 'component.table.job',
      width: 200,
    },
    {
      align: 'center',
      dataIndex: 'actions',
      fixed: 'right',
      key: 'actions',
      render: () => (
        <Flex align="center" gap="0.5rem" justify="center">
          <Button icon={<Edit2 size="20" />} />
          <Button icon={<Trash size="20" />} />
        </Flex>
      ),
      titleI18Key: 'component.table.actions',
      width: 100,
    },
  ];

  return { columns };
};
