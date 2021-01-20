import React, { createContext, useCallback, useContext, useState } from 'react';
import Modal from '../components/Modal';

interface ModalProps {
  title: string;
}

interface ModalContextData {
  toggleModal(): void;
  isModalOpen: boolean;
}

const ModalContext = createContext<ModalContextData>({} as ModalContextData);

const ModalProvider: React.FC = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsModalOpen(!isModalOpen);
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ toggleModal, isModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

function useModal(): ModalContextData {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}
export { ModalProvider, useModal };
