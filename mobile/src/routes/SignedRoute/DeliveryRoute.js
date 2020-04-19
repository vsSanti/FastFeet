import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Delivery from '~/pages/Delivery';
import Detail from '~/pages/Delivery/pages/Detail';
import ReportProblem from '~/pages/Delivery/pages/ReportProblem';
import VisualizeProblem from '~/pages/Delivery/pages/VisualizeProblem';
import ConfirmDelivery from '~/pages/Delivery/pages/ConfirmDelivery';

const Stack = createStackNavigator();

export default function DeliveryRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFF',
        headerStyle: {
          backgroundColor: '#7D40E7',
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          elevation: 0,
        },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },
      }}
    >
      <Stack.Screen
        name="Delivery"
        component={Delivery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeliveryDetail"
        component={Detail}
        options={{
          title: 'Detalhes da encomenda',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="DeliveryReportProblem"
        component={ReportProblem}
        options={{
          title: 'Informar problema',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="DeliveryVisualizeProblem"
        component={VisualizeProblem}
        options={{
          title: 'Visualizar problemas',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="DeliveryConfirmDelivery"
        component={ConfirmDelivery}
        options={{
          title: 'Confirmar entrega',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
