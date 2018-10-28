import types from '../reducers/actionTypes';

export const user = {
    issue : () => ({type: types.user.issue})
}

export const deliver = {
    request: () => ({type: types.deliver.request})
}

export function batchActions(...actions) {
  return {
    type: types.batchActionsType,
    actions: actions
  };
}

export default {
  batchActions,
    user,
  deliver
}