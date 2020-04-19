import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import FormComponent from '~/components/Form';
import ImageInput from '~/components/Shared/Input/Image';
import Input from '~/components/Shared/Input';

import SchemaValidation from '~/utils/SchemaValidation';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'O nome do entregador deve ter mais de 4 caracteres')
    .required('O nome do entregador é obrigatório'),
  email: Yup.string()
    .email()
    .required('O e-mail do entregador é obrigatório'),
  avatar_id: Yup.number()
    .integer()
    .positive()
    .nullable(),
});

export default function DeliverymenForm() {
  const { deliverymanId } = useParams();

  const formRef = useRef(null);

  const [deliveryman, setDeliveryman] = useState(null);

  const [loading, setLoading] = useState(false);

  async function submitHandler(data) {
    setLoading(true);
    try {
      if (await SchemaValidation(schema, data, formRef)) {
        if (deliverymanId) {
          await api.put(`deliverymen/${deliverymanId}`, data);
        } else {
          await api.post('deliverymen', data);
        }
        toast.success('Entregador cadastrado com sucesso.');
        history.push('/deliverymen');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar o entregador.');
    } finally {
      setLoading(false);
    }
  }

  useMemo(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await api.get(`deliverymen/${deliverymanId}`);
        const { avatar, name, email } = response.data.user;

        formRef.current.setData({
          avatar_id: avatar && avatar.url,
          name,
          email,
        });
        setDeliveryman(response.data);
      } catch (error) {
        toast.error(
          `Entregador com identificador ${deliverymanId} não encontrado.`
        );
        history.push('/deliverymen/form');
      } finally {
        setLoading(false);
      }
    }

    if (deliverymanId) loadData();
  }, [deliverymanId]);

  return (
    <FormComponent
      title="Cadastro de entregadores"
      saveButtonHandler={() => formRef.current.submitForm()}
      goBackButtonHandler={() => history.push('/deliverymen')}
      loading={loading}
    >
      <Form ref={formRef} onSubmit={submitHandler}>
        <ImageInput
          name="avatar_id"
          placeholderName={deliveryman && deliveryman.name}
          accept="image/*"
        />
        <Input
          name="name"
          type="text"
          placeholder="Nome do entregador"
          label="Nome"
        />
        <Input
          name="email"
          type="email"
          placeholder="exemplo@fastfeet.com"
          label="E-mail"
        />
      </Form>
    </FormComponent>
  );
}
