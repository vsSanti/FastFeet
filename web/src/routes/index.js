import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Deliveryman from '~/pages/Deliveryman';
import DeliverymanForm from '~/pages/Deliveryman/Form';

import Order from '~/pages/Order';
import OrderForm from '~/pages/Order/Form';

import Recipient from '~/pages/Recipient';
import RecipientForm from '~/pages/Recipient/Form';

import Problem from '~/pages/Problem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Order} isPrivate />
      <Route path="/orders/form/:orderId?" component={OrderForm} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliverymen/form/:deliverymanId?"
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route
        path="/recipients/form/:recipientId?"
        component={RecipientForm}
        isPrivate
      />

      <Route path="/problems" exact component={Problem} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
