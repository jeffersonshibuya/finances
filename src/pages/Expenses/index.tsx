import { Form } from '@unform/web';
import { get } from 'http';
import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import { MdCreate } from 'react-icons/md';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import { useModal } from '../../hooks/ModalContext';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';

import { Container, Content, AddButton, Overlay } from './styles';

interface ExpenseData {
  name: string;
  id: string;
  price: number;
  isPaid: boolean;
  category_id: string;
  category: {
    id: string;
    name: string;
  };
  reference_id: string;
  reference: {
    id: string;
    month: string;
    year: number;
  };
}

interface ReferenceData {
  id: string;
  month: string;
  year: number;
}

interface CategoryData {
  id: string;
  name: string;
}

const Expenses: React.FC = () => {
  const { toggleModal, isModalOpen } = useModal();

  const { addToast } = useToast();

  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<ExpenseData[]>([]);
  const [expenseSelected, setExpenseSelected] = useState<ExpenseData>(
    {} as ExpenseData,
  );

  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [references, setReferences] = useState<ReferenceData[]>([]);

  async function getExpenses() {
    api.get<ExpenseData[]>('/expenses').then(response => {
      setExpenses(response.data);
    });
  }

  useEffect(() => {
    // api.get<ExpenseData[]>('/expenses').then(response => {
    //   setExpenses(response.data);
    // });

    getExpenses();

    api.get('/category').then(response => {
      setCategories(response.data);
    });

    api.get('/reference').then(response => {
      setReferences(response.data);
    });
  }, []);

  const handleExpenseSelect = useCallback(
    (expense: ExpenseData) => {
      setExpenseSelected(expense);
      setIsPaid(expense.isPaid);
      toggleModal();
    },
    [toggleModal],
  );

  const handleNewExpense = useCallback(() => {
    setExpenseSelected({} as ExpenseData);
    toggleModal();
  }, [toggleModal]);

  const handleDeleteExpense = useCallback(
    (id: string) => {
      api.delete('/expense', { data: { id } }).then(() => {
        addToast({
          type: 'success',
          title: 'Despesa excluída com sucesso',
        });

        setExpenses(expenses.filter(expense => expense.id !== id));
      });
    },
    [addToast, expenses],
  );

  const handleSubmit = useCallback(
    (data: ExpenseData) => {
      console.log('submit', {
        ...data,
        price: Number(data.price),
        isPaid,
      });

      if (expenseSelected.id) {
        console.log(expenseSelected);
        api
          .put('/expenses', {
            ...data,
            id: expenseSelected.id,
          })
          .then(() => {
            addToast({
              type: 'success',
              title: 'Despesa atualizada com sucesso',
            });

            getExpenses();
          });

        toggleModal();
      } else {
        try {
          api
            .post('/expenses', {
              ...data,
              price: Number(data.price),
            })
            .then(response => {
              addToast({
                type: 'success',
                title: 'Despesa cadastrada com sucesso',
              });

              getExpenses();
            });

          toggleModal();
        } catch (error) {
          console.log(error);
        }
      }
    },
    [addToast, expenseSelected.id, isPaid, toggleModal],
  );

  return (
    <Container>
      <Overlay isModalOpen={isModalOpen ? 1 : 0} />
      <h1>Expenses</h1>
      <Content>
        <table>
          <thead>
            <tr>
              <td> Referencia </td>
              <td> Expense </td>
              <td> Price </td>
              <td> isPaid </td>
              <td> Category </td>
              <td />
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr>
                <td>
                  {exp.reference
                    ? `${exp.reference?.month}/${exp.reference?.year}`
                    : '-'}
                </td>
                <td>{exp.name}</td>
                <td>{exp.price}</td>
                <td>{exp.isPaid ? 'Sim' : 'Não'}</td>
                <td>{exp.category?.name}</td>
                <td className="actions">
                  <button
                    type="button"
                    onClick={() => handleExpenseSelect(exp)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteExpense(exp.id)}
                  >
                    <FiTrash color="#c53030" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Content>

      {isModalOpen && (
        <Modal
          title={expenseSelected.id ? 'Editar Despesa' : 'Adicionar Despesa'}
        >
          <Form
            initialData={{
              name: expenseSelected.name,
              price: expenseSelected.price,
              category_id: {
                value: expenseSelected.category
                  ? expenseSelected.category.id
                  : '',
                label: expenseSelected.category
                  ? expenseSelected.category.name
                  : '',
              },
              reference_id: {
                value: expenseSelected.reference
                  ? expenseSelected.reference.id
                  : '',
                label: expenseSelected.reference
                  ? `${expenseSelected.reference.month}/${expenseSelected.reference.year}`
                  : '',
              },
            }}
            onSubmit={handleSubmit}
          >
            <Select
              name="reference_id"
              placeholder="Selecione uma referencia..."
              options={[
                ...references.map(reference => {
                  return {
                    value: reference.id,
                    label: `${reference.month}/${reference.year}`,
                  };
                }),
              ]}
            />
            <Select
              name="category_id"
              placeholder="Selecione uma categoria..."
              options={[
                ...categories.map(category => {
                  return {
                    value: category.id,
                    label: category.name,
                  };
                }),
              ]}
            />
            <Input name="name" placeholder="Despesa" />
            <Input type="number" name="price" placeholder="Valor (R$)" />
            <br />
            <br />
            <label htmlFor="isPaid">Pago?</label>
            <input
              type="checkbox"
              name="isPaid"
              checked={isPaid}
              onChange={() => setIsPaid(!isPaid)}
            />
            <Button type="submit">Salvar</Button>
          </Form>
        </Modal>
      )}

      <AddButton onClick={handleNewExpense}>
        <MdCreate />
      </AddButton>
    </Container>
  );
};

export default Expenses;
