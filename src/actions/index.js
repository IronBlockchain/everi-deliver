import types from '../reducers/actionTypes';

export const user = {
  issueStart : () => ({type: types.user.issueStart}),
  issueFinish : () => ({type: types.user.issueFinish}),
  transferToAmazonFinish: () => ({type: types.user.transferToAmazonFinish}),
  closeNotification : ()=> ({type: types.user.closeNotification}),
  openVideo: () => ({type: types.user.openVideo}),
  addHash: () => ({type: types.user.addHash}),
  destroyToken: () => ({type: types.user.destroyToken}),
  destroyTokenFinish: () => ({type: types.user.destroyTokenFinish}),

  //we mock all the actions from amazon here for simplicity, later should create a separate reducer for amazon
  validate: () => ({type: types.user.validate}),
  proveAccess: () => ({type: types.user.proveAccess}),
  proveFinish: () => ({type: types.user.proveFinish}),

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