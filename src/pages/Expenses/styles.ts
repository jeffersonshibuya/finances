import { shade } from 'polished';
import styled, { css, keyframes } from 'styled-components';

interface ExpenseProps {
  isModalOpen: number;
}

const appearFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  padding: 10px 35px;
  margin: 0 38px 30px 42px;
  animation: ${appearFromBottom} 1s;

  width: 95%;
  height: 100%;

  h1 {
    font-size: 40px;
    color: #25282b;
    letter-spacing: 0.2px;

    flex: 1;
    margin: 24px 0 24px 0;
  }
`;

export const Content = styled.div`
  table {
    position: relative;
    width: 100%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 2px 2px 5px lightgray;
  }

  table thead {
    background: #e8e8e8;
    padding: 18px 24px;
    margin: 0;
    opacity: 0.7;
    letter-spacing: 0.1px;
    font-weight: bold;
  }

  table tr {
    height: 56px;
  }

  table tr td {
    border-bottom: 1px solid #e8e8e8;
    padding: 20px;
  }

  table tbody {
    font-size: 14px;
    color: #52575c;
    line-height: 20px;
  }

  table th td {
    color: #25282b;
  }

  .actions {
    text-align: right;

    svg {
      margin-left: 16px;
    }

    button {
      border: none;
      outline: none;
      background: transparent;
    }
  }
`;

export const AddButton = styled.button`
  position: absolute;
  bottom: 24px;
  right: 36px;
  border-radius: 50%;
  background: #336cfb;
  box-shadow: 0px 6px 12px rgba(51, 108, 251, 0.16);
  border: none;
  width: 64px;
  height: 64px;
  transition: background-color 0.5s;

  svg {
    width: 32px;
    height: 32px;
    color: white;
  }

  &:hover {
    background-color: ${shade(0.2, '#336cfb')};
  }
`;

export const Overlay = styled.div<ExpenseProps>`
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */

  ${props =>
    props.isModalOpen &&
    css`
      display: block;
    `}
`;
