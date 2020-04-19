import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '~/pages/SignIn';

const Stack = createStackNavigator();

export default function SignInRoute() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Sign" component={SignIn} />
    </Stack.Navigator>
  );
}
