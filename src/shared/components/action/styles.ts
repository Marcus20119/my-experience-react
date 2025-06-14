import styled from '@emotion/styled';
import { Space } from 'antd';

const { Compact } = Space;

export const StyledCompactAction = styled(Compact)`
  .ant-select-selector {
    border-color: var(--neutral-300-color) !important;
  }

  .ant-select-open {
    .ant-select-selector {
      border-color: var(--neutral-700-color) !important;
    }
  }
`;
