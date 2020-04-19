import produce from 'immer';

const INITIAL_STATE = {
  delivery: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@delivery/SET_DELIVERY_DATA': {
        draft.delivery = { ...draft.delivery, ...action.payload.delivery };
        break;
      }
      default:
    }
  });
}
