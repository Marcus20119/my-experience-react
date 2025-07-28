import { Flex, Typography } from 'antd';

import { useDrawerRouter } from '@/shared/hooks';
import type { BaseKnowledgeItemResponse } from '@/shared/tanstack/api/technologies';

import KnowledgeItemTicket from './KnowledgeItemTicket';

const { Text } = Typography;

interface Props {
  knowledgeItems?: BaseKnowledgeItemResponse[];
}

function KnowledgeItemList({ knowledgeItems }: Props) {
  const { onOpenDrawer } = useDrawerRouter();

  if (!knowledgeItems?.length) {
    return <Text>{'No knowledge item found ~'}</Text>;
  }

  return (
    <Flex className="h-fit" gap="1.5rem" wrap>
      {knowledgeItems.map(knowledgeItem => (
        <KnowledgeItemTicket
          key={knowledgeItem.id}
          knowledgeItem={knowledgeItem}
          onClick={() => {
            onOpenDrawer({
              param: {
                id: knowledgeItem.id,
              },
              path: 'knowledge-item/update/:id',
            });
          }}
        />
      ))}
    </Flex>
  );
}

export default KnowledgeItemList;
