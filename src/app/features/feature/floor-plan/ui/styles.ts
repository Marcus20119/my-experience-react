import styled from '@emotion/styled';

export const StyledRoomMenu = styled.div<{ softPrimaryColor: string }>`
  width: 15rem;
  border-radius: 1rem;
  border: 1px solid var(--neutral-300-color);
  background-color: var(--neutral-0-color);

  .ant-menu {
    border: none !important;
  }

  .ant-menu-submenu-title {
    gap: 0.25rem;
    padding: 0rem 0.75rem 0rem 0.375rem !important;

    &:active {
      background-color: var(--neutral-100-color) !important;
    }
  }

  .ant-menu-item,
  .ant-menu-submenu-title {
    height: fit-content !important;
    margin: 0.25rem 0.75rem !important;
    width: calc(100% - 1.5rem) !important;
    border: 1px solid #00000000 !important;
  }

  .ant-menu-item:active {
    background-color: var(--neutral-100-color) !important;
  }

  .ant-menu-item-only-child {
    padding: 0rem 0.75rem 0rem 0.375rem !important;
  }

  .active-room {
    &:not(:has(.ant-menu-submenu-title)),
    .ant-menu-submenu-title {
      background-color: ${({ softPrimaryColor }) =>
        `${softPrimaryColor} !important`};
      border: 1px solid var(--primary-color) !important;
    }
  }

  .active-desk {
    background-color: ${({ softPrimaryColor }) =>
      `${softPrimaryColor} !important`};
    border: 1px solid var(--primary-color) !important;
  }
`;
