import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  background: rgba(255, 255, 255);
  border-radius: 10px;

  width: 460px;
  min-height: 250px;

  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  background: #e2e2e2;
  padding: 10px;
  margin-bottom: 15px;

  button {
    border: none;
    background: transparent;
  }
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
`;

export const Content = styled.div`
  padding: 15px;
`;

export const Footer = styled.div`
  background: #e2e2e2;
  height: 32px;
`;
