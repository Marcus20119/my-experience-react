import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StyledSelect = styled.div<{ hasPrefixIcon: boolean }>`
  position: relative;

  ${({ hasPrefixIcon }) =>
    hasPrefixIcon &&
    css`
      .ant-select-selection-search-input,
      .ant-select-selection-placeholder,
      .ant-select-selection-item {
        padding-left: 1.75rem !important; // 28px
      }

      .prefix-icon {
        position: absolute;
        top: calc(50%);
        transform: translateY(-50%);
        left: 0.75rem; // 12px
        z-index: 1;
      }
    `}
`;
