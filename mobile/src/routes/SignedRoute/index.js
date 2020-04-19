import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Profile from '~/pages/Profile';
import DeliveryRoute from '~/routes/SignedRoute/DeliveryRoute';

const Tabs = createBottomTabNavigator();

export default function SignedRoute() {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7D40E7',
        style: {
          background: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="Delivery"
        component={DeliveryRoute}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="menu" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account" size={30} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
