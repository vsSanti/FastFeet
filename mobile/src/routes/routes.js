import React from 'react';
import { StatusBar } from 'react-native';

import SignedRoute from '~/routes/SignedRoute';
import SignInRoute from '~/routes/SignInRoute';

export default function(signedIn = false, { barStyle, backgroundColor }) {
  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {!signedIn ? <SignInRoute /> : <SignedRoute />}
    </>
  );
}
