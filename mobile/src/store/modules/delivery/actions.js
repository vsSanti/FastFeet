export function setDeliveryData(delivery) {
  return {
    type: '@delivery/SET_DELIVERY_DATA',
    payload: { delivery },
  };
}
