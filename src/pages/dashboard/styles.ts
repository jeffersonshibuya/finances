import styled, { keyframes } from 'styled-components';

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  form {
    animation: ${appearFromRight} 1s;
  }
`;
