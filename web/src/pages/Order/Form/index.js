import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import FormComponent from '~/components/Form';
import Input from '~/components/Shared/Input';
import Select from '~/components/Shared/Select';

import SchemaValidation from '~/utils/SchemaValidation';

// import { Container } from './styles';

const schema = Yup.object().shape({
  recipient_id: Yup.number()
    .typeError('O destinatário é obrigatório')
    .required('O destinatário é obrigatório'),
  deliveryman_id: Yup.number()
    .typeError('O entregador é obrigatório')
    .required('O entregador é obrigatório'),
  product: Yup.string()
    .min(4, 'O nome do produto deve conter mais de 4 caracteres')
    .required('O nome do produto é obrigatório'),
});

export default function OrderForm() {
  const { orderId } = useParams();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  async function submitHandler(data) {
    setLoading(true);
    try {
      if (await SchemaValidation(schema, data, formRef)) {
        if (orderId) {
          await api.put(`orders/${orderId}`, data);
        } else {
          await api.post('orders', data);
        }
        toast.success('Encomenda cadastrada com sucesso.');
        history.push('/orders');
      }
    } catch (err) {
      toast.error('Erro ao cadastrar a encomenda.');
    } finally {
      setLoading(false);
    }
  }

  function loadRecipientsOptions(inputValue) {
    return api
      .get('recipients', { params: { name: inputValue } })
      .then(response => {
        const options = response.data.recipients.map(recipient => ({
          value: recipient.id,
          label: recipient.name,
        }));

        return options;
      })
      .catch(error => {
        console.tron.log(error);
      });
  }

  function loadDeliverymenOptions(inputValue) {
    return api
      .get('deliverymen', { params: { name: inputValue } })
      .then(response => {
        const options = response.data.deliverymen.map(recipient => ({
          value: recipient.id,
          label: recipient.name,
        }));

        return options;
      })
      .catch(error => {
        console.tron.log(error);
      });
  }

  useMemo(() => {
    async function loadData() {
      setLoading(true);
      try {
        const response = await api.get(`orders/${orderId}`);

        const { product, recipient, deliveryman } = response.data;
        formRef.current.setData({
          product,
          deliveryman_id: deliveryman.id,
          recipient_id: recipient.id,
        });
        formRef.current.setFieldValue('deliveryman_id', {
          value: deliveryman.id,
          label: deliveryman.name,
        });
        formRef.current.setFieldValue('recipient_id', {
          value: recipient.id,
          label: recipient.name,
        });
      } catch (error) {
        toast.error(`Entrega com identificador ${orderId} não encontrada.`);
        history.push('/orders/form');
      } finally {
        setLoading(false);
      }
    }

    if (orderId) loadData();
  }, [orderId]);

  return (
    <FormComponent
      title="Cadastro de encomendas"
      saveButtonHandler={() => formRef.current.submitForm()}
      goBackButtonHandler={() => history.push('/orders')}
      loading={loading}
    >
      <Form ref={formRef} onSubmit={submitHandler}>
        <section>
          <Select
            type="text"
            label="Destinatário"
            name="recipient_id"
            placeholder="Destinatário"
            defaultOptions
            cacheOptions
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            loadOptions={loadRecipientsOptions}
          />
          <Select
            type="text"
            label="Entregador"
            name="deliveryman_id"
            placeholder="Entregador"
            defaultOptions
            cacheOptions
            noOptionsMessage={() => 'Nenhum destinatário encontrado'}
            loadOptions={loadDeliverymenOptions}
          />
        </section>
        <Input
          name="product"
          type="text"
          placeholder="Nome do produto"
          label="Nome do produto"
        />
      </Form>
    </FormComponent>
  );
}
