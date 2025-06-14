import { Flex } from 'antd';

import { useGetFrontendTechnologyItems } from '@/app/features/technology';
import { FrontendLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';

function UILibraryPage() {
  const { uiItems } = useGetFrontendTechnologyItems();

  return (
    <FrontendLayout
      route={{
        path: '/technology/frontend/ui-library',
      }}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {uiItems.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </FrontendLayout>
  );
}

export default UILibraryPage;
