export function setStyle(style) {
  return {
    type: '@statusBar/SET_STYLE',
    payload: { style },
  };
}
