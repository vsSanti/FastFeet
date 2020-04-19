import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content } from './styles';

import logo from '~/assets/logo.svg';

const active = {
  color: '#444',
};

export default function Header() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function signOutHandler() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />

          <NavLink to="/orders" activeStyle={active}>
            Encomendas
          </NavLink>
          <NavLink to="/deliverymen" activeStyle={active}>
            Entregadores
          </NavLink>
          <NavLink to="/recipients" activeStyle={active}>
            Destinatários
          </NavLink>
          <NavLink to="/problems" activeStyle={active}>
            Problemas
          </NavLink>
        </nav>

        <aside>
          <strong>{profile.name}</strong>
          <button type="button" onClick={signOutHandler}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
