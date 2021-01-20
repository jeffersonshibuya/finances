import React, { useCallback, useEffect, useState } from 'react';
import { RiMenuAddFill } from 'react-icons/ri';
import { MdCreate } from 'react-icons/md';
import { Form } from '@unform/web';
import api from '../../services/api';

import { Container, Content, AddButton, Overlay } from './styles';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useModal } from '../../hooks/ModalContext';
import { useToast } from '../../hooks/ToastContext';
import Card from '../../components/Card';

interface ReferenceData {
  month: string;
  year: number;
  id: string;
}

const Reference: React.FC = () => {
  const { toggleModal, isModalOpen } = useModal();

  const { addToast } = useToast();

  const [references, setReferences] = useState<ReferenceData[]>([]);
  const [referenceSelected, setReferenceSelected] = useState<ReferenceData>(
    {} as ReferenceData,
  );

  useEffect(() => {
    api.get<ReferenceData[]>('/reference').then(response => {
      setReferences(response.data);
    });
  }, []);

  const handleReferenceSelect = useCallback(
    (reference: ReferenceData) => {
      setReferenceSelected(reference);
      toggleModal();
    },
    [toggleModal],
  );

  const handleNewReference = useCallback(() => {
    setReferenceSelected({} as ReferenceData);
    toggleModal();
  }, [toggleModal]);

  const handleSubmit = useCallback(
    (data: ReferenceData) => {
      if (referenceSelected.id) {
        api
          .put('/reference', { month: data.month, id: referenceSelected.id })
          .then(response => {
            addToast({
              type: 'success',
              title: 'Referencia cadastrada com sucesso',
            });

            setReferences([
              ...references.filter(
                reference => reference.id !== referenceSelected.id,
              ),
              response.data,
            ]);
          });

        toggleModal();
      } else {
        try {
          api
            .post('/reference', { month: data.month, year: Number(data.year) })
            .then(response => {
              addToast({
                type: 'success',
                title: 'Referencia cadastrada com sucesso',
              });

              setReferences([...references, response.data]);
            })
            .catch(error => {
              addToast({
                type: 'error',
                title: error.response.data.message,
              });
            });

          toggleModal();
        } catch (error) {
          addToast({
            type: 'error',
            title: error.message,
          });
        }
      }
    },
    [addToast, referenceSelected.id, references, toggleModal],
  );

  const handleReferenceDelete = useCallback(
    async (id: string) => {
      await api.delete('/reference', { data: { id } });
      addToast({
        type: 'success',
        title: 'Referencia excluída com sucesso',
      });

      setReferences(references.filter(reference => reference.id !== id));
    },
    [addToast],
  );

  return (
    <Container>
      <Overlay isModalOpen={isModalOpen ? 1 : 0} />
      <h1>Data Referencia</h1>
      <Content>
        {references.map(reference => (
          <Card
            key={reference.id}
            title={`${reference.month}/${reference.year}`}
            handleEdit={() => {
              handleReferenceSelect(reference);
            }}
            handleDelete={() => {
              handleReferenceDelete(reference.id);
            }}
          >
            <p> Lorem ipsum dolor sit amet. </p>
          </Card>
        ))}

        <AddButton onClick={handleNewReference}>
          <MdCreate />
        </AddButton>

        {isModalOpen && (
          <Modal
            title={
              referenceSelected.id
                ? 'Editar Referencia'
                : 'Adicionar Referencia'
            }
          >
            <Form
              initialData={{
                month: referenceSelected.month,
                year: referenceSelected.year,
              }}
              onSubmit={handleSubmit}
            >
              <Input
                icon={RiMenuAddFill}
                name="month"
                placeholder="Mês referencia"
              />
              <Input
                icon={RiMenuAddFill}
                name="year"
                placeholder="Ano referencia"
              />
              <Button type="submit">Salvar</Button>
            </Form>
          </Modal>
        )}
      </Content>
    </Container>
  );
};

export default Reference;
