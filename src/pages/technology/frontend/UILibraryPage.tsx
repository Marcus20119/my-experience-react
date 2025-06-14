import { Flex } from 'antd';

import { useGetTechnologyItems } from '@/app/features/technology';
import { FrontendLayout } from '@/app/layout';
import { Ticket } from '@/shared/components/ticket';

function UILibraryPage() {
  const { technologyItems } = useGetTechnologyItems();

  return (
    <FrontendLayout
      route={{
        path: '/technology/frontend/ui-library',
      }}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {technologyItems.ui.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </FrontendLayout>
  );
}

export default UILibraryPage;
