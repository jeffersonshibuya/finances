import { shade } from 'polished';
import styled from 'styled-components';
import { inherits } from 'util';

export const Container = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px;
  max-width: 250px;
  height: 300px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: white;
  overflow: hidden;

  &-footer {
    margin-top: auto;
  }

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

export const Content = styled.div``;

export const Header = styled.div`
  border-bottom: 1px solid #eee;
  background: #eee;
  padding: 15px 15px;

  font-size: 18px;
  letter-spacing: 0.5;
  text-transform: uppercase;
  font-weight: bold;
  color: #555;
`;

export const Footer = styled.div`
  background: #eee;
  padding: 10px;
  text-align: right;

  button {
    background: transparent;
    outline: none;
    border: none;
  }

  svg {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    color: #555;
    transition: color 0.5s;
  }
`;
