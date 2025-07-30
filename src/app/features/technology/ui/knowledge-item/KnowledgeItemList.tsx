import { Flex, Typography } from 'antd';

import type { BaseKnowledgeItemResponse } from '@/shared/tanstack/api/technologies';

import KnowledgeItemTicket from './KnowledgeItemTicket';

const { Text } = Typography;

interface Props {
  knowledgeItems?: BaseKnowledgeItemResponse[];
}

function KnowledgeItemList({ knowledgeItems }: Props) {
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
            // FIX_ME
            // onOpenDrawer({
            //   param: {
            //     id: knowledgeItem.id,
            //   },
            //   path: 'knowledge-item/update/:id',
            // });
          }}
        />
      ))}
    </Flex>
  );
}

export default KnowledgeItemList;
