import styled from '@emotion/styled';

export const StyledRoomMenu = styled.div`
  width: 15rem;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid var(--neutral-200-color);
  background-color: var(--neutral-0-color);

  .ant-menu {
    border: none !important;
  }

  .ant-menu-submenu-title {
    gap: 0.25rem;
    padding: 0rem 0.75rem !important;

    &:active {
      background-color: var(--neutral-100-color) !important;
    }
  }

  .ant-menu-item-only-child {
    padding: 0rem 0.75rem !important;
  }
`;
