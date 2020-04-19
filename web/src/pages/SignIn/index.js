import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '~/components/Shared/Input';

import { signInRequest } from '~/store/modules/auth/actions';

import SchemaValidation from '~/utils/SchemaValidation';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  async function handleSubmit({ email, password }) {
    if (await SchemaValidation(schema, { email, password }, formRef)) {
      dispatch(signInRequest(email, password));
    }
  }

  return (
    <>
      <img src={logo} alt="FastFeet" />

      <Form onSubmit={handleSubmit} schema={schema} ref={formRef}>
        <Input
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          label="SEU E-MAIL"
        />
        <Input
          name="password"
          type="password"
          placeholder="***********"
          label="SUA SENHA"
        />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}
