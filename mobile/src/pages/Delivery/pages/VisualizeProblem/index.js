import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { setStyle } from '~/store/modules/statusBar/actions';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  HeaderTitle,
  List,
  ListItem,
  ListItemDescription,
  ListItemDate,
} from './styles';

export default function VisualizeProblem() {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const delivery = useSelector(state => state.delivery.delivery);

  const [problemList, setProblemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFocused) return;

    async function loadProblems() {
      const response = await api.get(`delivery/${delivery.id}/problems`);
      setProblemList(response.data);
      setLoading(false);
    }

    loadProblems();
  }, [delivery.id, isFocused]);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(true));
  }, [dispatch, isFocused]);

  return (
    <Background>
      <HeaderTitle>Encomenda {delivery.id}</HeaderTitle>
      {loading && <ActivityIndicator color="#fff" />}
      <List
        data={problemList}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <ListItem>
            <ListItemDescription>{item.description}</ListItemDescription>
            <ListItemDate>
              {format(parseISO(item.created_at), 'dd/MM/yyyy', {
                locale: pt,
              })}
            </ListItemDate>
          </ListItem>
        )}
      />
    </Background>
  );
}
