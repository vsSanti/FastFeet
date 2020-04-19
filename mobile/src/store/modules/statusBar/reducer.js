import produce from 'immer';

const INITIAL_STATE = {
  barStyle: 'light-content',
  backgroundColor: '#7d40e7',
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@statusBar/SET_STYLE': {
        draft.barStyle = action.payload.style
          ? 'light-content'
          : 'dark-content';
        draft.backgroundColor = action.payload.style ? '#7d40e7' : '#fff';
        break;
      }
      default:
    }
  });
}
