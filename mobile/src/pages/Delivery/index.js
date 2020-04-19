import React, { useEffect, useState, useCallback } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { setDeliveryData } from '~/store/modules/delivery/actions';
import { setStyle } from '~/store/modules/statusBar/actions';

import api from '~/services/api';

import Background from '~/components/Background';

import DeliveryItem from './components/Item';
import Profile from './components/Profile';

import { List, ListHeader, ListName, ListSwitch, ListType } from './styles';

export default function Delivery() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const profile = useSelector(state => state.user.profile);

  const [listSwitcher, setListSwitcher] = useState(true);

  const [deliveries, setDeliveries] = useState([]);
  const [deliveriesPage, setDeliveriesPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadDeliveries = useCallback(() => {
    async function loadData() {
      const { data } = await api.get(`deliveryman/${profile.id}/deliveries`, {
        params: {
          page: deliveriesPage,
          status: listSwitcher ? 'pending' : 'finished',
        },
      });

      setDeliveries(d => (deliveriesPage === 1 ? data : [...d, ...data]));
      /** Se a resposta for uma lista vazia objetos, significa que todos os dados já estão apresentados */
      setDeliveriesPage(dp => (data.length === 0 ? -1 : dp + 1));
      setLoading(false);
      setRefreshing(false);
    }

    /** Caso não houver mais paginas ou já estiver carregando dados */
    if (deliveriesPage < 0 || loading) return;

    setLoading(true);
    loadData();
  }, [deliveriesPage, listSwitcher, loading, profile.id]);

  const resetData = useCallback((cleanData = false) => {
    if (cleanData) setDeliveries([]);
    setDeliveriesPage(1);
  }, []);

  useEffect(() => {
    if (!isFocused) return;

    /** Carregará os dados quando a página for igual a 1 */
    if (deliveriesPage === 1) {
      loadDeliveries();
    }
  }, [deliveriesPage, dispatch, isFocused, loadDeliveries, resetData]);

  useEffect(() => {
    if (isFocused) dispatch(setStyle(false));
  }, [dispatch, isFocused]);

  useEffect(() => {
    if (isFocused) return;

    setDeliveriesPage(1);
  }, [isFocused]);

  function toggleList(val) {
    resetData(val !== listSwitcher);
    setListSwitcher(val);
  }

  function renderProfile() {
    return <Profile profile={profile} />;
  }

  function renderListHeader() {
    return (
      <ListHeader>
        <ListName>Entregas</ListName>
        <ListSwitch>
          <TouchableOpacity onPress={() => toggleList(true)}>
            <ListType isActive={listSwitcher}>Pendentes</ListType>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleList(false)}>
            <ListType isActive={!listSwitcher}>Entregues</ListType>
          </TouchableOpacity>
        </ListSwitch>
      </ListHeader>
    );
  }

  function renderList() {
    function handleSeeDetailsPressed(item) {
      dispatch(setDeliveryData(item));
      navigation.push('DeliveryDetail');
    }

    function renderFooter() {
      if (!loading || refreshing) return null;
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <List
        data={deliveries}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <DeliveryItem
            delivery={item}
            handleSeeDetailsPressed={() => handleSeeDetailsPressed(item)}
          />
        )}
        onRefresh={() => {
          setRefreshing(true);
          resetData();
        }}
        refreshing={refreshing}
        onEndReached={loadDeliveries}
        onEndReachedThreshold={0.25}
        ListFooterComponent={() => renderFooter()}
      />
    );
  }

  return (
    <>
      <Background isBoxVisible={false}>
        {renderProfile()}
        {renderListHeader()}
        {renderList()}
      </Background>
    </>
  );
}
