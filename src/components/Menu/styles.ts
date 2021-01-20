import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 250px;
  height: 100vh;
  box-shadow: 2px 2px 8px lightgray;
  background: #f9f9f9;
  position: absolute;
  left: 0;
  top: 0;
  padding-right: 2px;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;

  margin-left: 24px;

  h2 {
    margin: 24px 0 32px 0;
  }
`;

export const LinkMenu = styled(NavLink)`
  color: #52575c;
  font-size: 16px;
  text-decoration: none;
  padding: 14px 0;
  display: flex;
  align-items: center;
  letter-spacing: 0.1em;
  transition: color 0.5s;
  margin-bottom: 15px;

  svg {
    margin-right: 12px;
  }

  &:hover {
    color: #558eff;
  }

  &.active {
    color: #336cfb;
    font-weight: bold;
  }
`;
