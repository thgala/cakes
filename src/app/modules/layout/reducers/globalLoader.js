const defaultState = null;

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'layout/GLOBAL_LOADER_SHOW':
      return true;

    case 'layout/GLOBAL_LOADER_HIDE':
      return false;

    default:
      return state;
  }
}
