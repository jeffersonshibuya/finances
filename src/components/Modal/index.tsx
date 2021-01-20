import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useModal } from '../../hooks/ModalContext';

import { Container, Header, Content, Title, Footer } from './styles';

interface ModalProps {
  title: string;
}

const Modal: React.FC<ModalProps> = ({ children, title }) => {
  const { toggleModal } = useModal();
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <button type="button" onClick={toggleModal}>
          <FiXCircle size={20} />
        </button>
      </Header>
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default Modal;
