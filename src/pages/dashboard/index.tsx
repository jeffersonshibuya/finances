import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FiLock, FiMail } from 'react-icons/fi';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import { Container } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useToast } from '../../hooks/ToastContext';

import getValidationErrors from '../../utils/getValidationErrors';

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: object) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          password: Yup.string().min(6, 'Mín. de 6 caracteres'),
        });

        await schema.validate(data, { abortEarly: false });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
        }

        addToast({
          type: 'error',
          title: 'Erro no formulario',
          description: 'Ocorreu um erro no formulário',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <h1>Dashboard</h1>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input icon={FiMail} name="name" />
        <Input icon={FiLock} name="password" type="password" />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default Dashboard;
