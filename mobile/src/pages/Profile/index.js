import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { signOut } from '~/store/modules/auth/actions';
import { setStyle } from '~/store/modules/statusBar/actions';

import Avatar from '~/components/Avatar';

import { Container, Label, Text, LogoutButton, PersonalData } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const profile = useSelector(state => state.user.profile);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(false));
  }, [dispatch, isFocused]);

  return (
    <Container isBoxVisible={false}>
      <Avatar url={profile.avatar && profile.avatar.url}>{profile.name}</Avatar>
      <PersonalData>
        <Label>Nome completo</Label>
        <Text>{profile.name}</Text>
        <Label>E-mail</Label>
        <Text>{profile.email}</Text>
        <Label>Data de cadastro</Label>
        <Text>
          {format(parseISO(profile.createdAt), "dd/MM/yyyy 'às' HH:mm", {
            locale: pt,
          })}
        </Text>
      </PersonalData>

      <LogoutButton onPress={() => dispatch(signOut())} background="#E74040">
        Sair
      </LogoutButton>
    </Container>
  );
}
