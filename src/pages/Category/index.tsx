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

interface CategoryData {
  name: string;
  id: string;
  expenses_count: number;
  total_price: number;
  total_percentage: number;
}

const Category: React.FC = () => {
  const { toggleModal, isModalOpen } = useModal();

  const { addToast } = useToast();

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryData>(
    {} as CategoryData,
  );

  useEffect(() => {
    api.get<CategoryData[]>('/category').then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleCategorySelect = useCallback(
    (category: CategoryData) => {
      setCategorySelected(category);
      toggleModal();
    },
    [toggleModal],
  );

  const handleNewCategory = useCallback(() => {
    setCategorySelected({} as CategoryData);
    toggleModal();
  }, [toggleModal]);

  const handleSubmit = useCallback(
    (data: CategoryData) => {
      console.log('submit', data);

      if (categorySelected.id) {
        api
          .put('/category', { name: data.name, id: categorySelected.id })
          .then(response => {
            addToast({
              type: 'success',
              title: 'Categoria cadastrada com sucesso',
            });

            setCategories([
              ...categories.filter(
                category => category.id !== categorySelected.id,
              ),
              response.data,
            ]);
          });

        toggleModal();
      } else {
        try {
          api.post('/category', data).then(response => {
            addToast({
              type: 'success',
              title: 'Categoria cadastrada com sucesso',
            });

            setCategories([...categories, response.data]);
          });

          toggleModal();
        } catch (error) {
          console.log(error);
        }
      }
    },
    [addToast, categories, categorySelected.id, toggleModal],
  );

  return (
    <Container>
      <Overlay isModalOpen={isModalOpen ? 1 : 0} />
      <h1>Categories</h1>
      <Content>
        {categories.map(category => (
          <Card
            key={category.id}
            title={category.name}
            handleEdit={() => {
              handleCategorySelect(category);
            }}
            handleDelete={() => {
              console.log('delete');
            }}
          >
            <h4>Despesas</h4>
            <p>
              Total:
              {category.expenses_count}
            </p>
            <p>
              Valor: R$
              {category.total_price}
            </p>
            <p> {category.total_percentage ? category.total_percentage : 0}%</p>
          </Card>
        ))}

        <AddButton onClick={handleNewCategory}>
          <MdCreate />
        </AddButton>

        {isModalOpen && (
          <Modal
            title={
              categorySelected.id ? 'Editar Categoria' : 'Adicionar Categoria'
            }
          >
            <Form
              initialData={{
                name: categorySelected.name,
              }}
              onSubmit={handleSubmit}
            >
              <Input
                icon={RiMenuAddFill}
                name="name"
                placeholder="Nome da categoria"
              />
              <Button type="submit">Salvar</Button>
            </Form>
          </Modal>
        )}
      </Content>
    </Container>
  );
};

export default Category;
