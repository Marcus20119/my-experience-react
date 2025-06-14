import { Flex } from 'antd';

import { useGetFrontendTechnologyItems } from '@/app/features/technology';
import { FrontendLayout } from '@/app/layout';
import { Ticket } from '@/shared/components';

function OtherFrontEndTechnologyPage() {
  const { otherTechnologyItems } = useGetFrontendTechnologyItems();

  return (
    <FrontendLayout
      route={{
        path: '/technology/frontend/other',
      }}
    >
      <Flex className="h-fit" gap="1.5rem" wrap>
        {otherTechnologyItems.map((props, index) => (
          <Ticket.ThreeD key={index} {...props} />
        ))}
      </Flex>
    </FrontendLayout>
  );
}

export default OtherFrontEndTechnologyPage;
