import { Icon } from '@iconify/react/dist/iconify.js';
import { Image } from 'antd';

import { Ticket } from '@/shared/components';
import type { ThreeDTicketProps } from '@/shared/components/ticket/ThreeDTicket';
import type { BaseKnowledgeItemResponse } from '@/shared/tanstack/api/technologies';
import { IconType } from '@/shared/tanstack/api/technologies';
import { FileTool } from '@/shared/utils/file';

const { splitFileUrl } = FileTool;

interface Props extends Partial<ThreeDTicketProps> {
  knowledgeItem: BaseKnowledgeItemResponse;
}

function KnowledgeItemTicket({ knowledgeItem, ...props }: Props) {
  return (
    <Ticket.ThreeD
      color1={knowledgeItem.color1}
      color2={knowledgeItem.color2}
      color3={knowledgeItem.color3}
      icon={
        knowledgeItem.iconType === IconType.Custom &&
        knowledgeItem.iconFileKey ? (
          <Image
            height="50"
            preview={false}
            src={splitFileUrl(knowledgeItem.iconFileKey).url}
            width="50"
          />
        ) : (
          <Icon height="56" icon={String(knowledgeItem.iconName)} width="56" />
        )
      }
      key={knowledgeItem.id}
      rate={knowledgeItem.rate}
      title={knowledgeItem.name}
      {...props}
    />
  );
}

export default KnowledgeItemTicket;
