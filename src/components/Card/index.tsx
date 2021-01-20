import React from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';

import { Container, Content, Header, Footer } from './styles';

interface ModalProps {
  title: string;
  handleEdit: Function;
  handleDelete: Function;
}

const Card: React.FC<ModalProps> = ({
  children,
  title,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Container>
      <Header>{title}</Header>
      <Content>{children}</Content>
      <Footer>
        <button type="button" onClick={() => handleEdit()}>
          <FiEdit />
        </button>
        <button type="button" onClick={() => handleDelete()}>
          <FiTrash color="#c53030" />
        </button>
      </Footer>
    </Container>
  );
};

export default Card;
