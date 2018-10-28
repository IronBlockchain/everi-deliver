import types from '../reducers/actionTypes';

export const user = {
  issueStart : () => ({type: types.user.issueStart}),
  issueFinish : () => ({type: types.user.issueFinish}),
  closeNotification : ()=> ({type: types.user.closeNotification})
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