import { Button, Flex } from 'antd';
import { Edit2, Trash } from 'iconsax-react';

import { useHeaderStore } from '@/app/features/header';
import { useSidebarStore } from '@/app/features/sidebar';
import { HEIGHT, SPACING, WIDTH } from '@/shared/assets/styles/constants';
import { useCalculateElementSize } from '@/shared/hooks';

import type { UserTableEntity } from '../model';
import { mockUserData, useUserTableColumns } from '../model';
import MyTable from './MyTable';

function FooterActions() {
  return (
    <Flex align="center" gap="0.5rem" justify="center">
      <Button icon={<Edit2 size="20" />} />
      <Button icon={<Trash size="20" />} />
    </Flex>
  );
}

function UserTable() {
  const { columns } = useUserTableColumns();
  const { getHeaderHeight } = useHeaderStore();
  const { getSidebarWidth } = useSidebarStore();
  const { height, width } = useCalculateElementSize({
    heightOffset:
      getHeaderHeight() +
      SPACING.contentPadding * 2 +
      HEIGHT.tableHeader +
      HEIGHT.pagination,
    widthOffset:
      getSidebarWidth() + SPACING.contentPadding * 2 + WIDTH.scrollbar,
  });

  return (
    <MyTable<UserTableEntity>
      columns={columns}
      customizable
      dataSource={mockUserData}
      footerActions={FooterActions}
      resizable
      rowKey="id"
      scroll={{ x: width, y: height }}
      showRowSelection
      tableName="customizableTable"
    />
  );
}

export default UserTable;
