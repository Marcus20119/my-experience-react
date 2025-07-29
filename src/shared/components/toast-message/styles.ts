import styled from '@emotion/styled';

export const StyledToastMessage = styled.div`
  animation:
    slide-in 0.3s ease,
    fade-out 0.3s ease 2.7s forwards;

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fade-out {
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
`;
