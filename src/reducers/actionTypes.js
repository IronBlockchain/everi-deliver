export const user = {
  issueStart: 'USER_ISSUE_START',
  issueFinish: 'USER_ISSUE_FINISH',
  closeNotification: 'CLOSE_NOTIFICATION',
  proveAccess: 'PROVE_ACCESS',
  proveFinish: 'PROVE_FINISH',
  validate: 'VALIDATE_REQUEST',
  transferToAmazonFinish: 'transferToAmazonFinish',
  openVideo: 'openVideo',
  addHash: 'addHash',
  destroyToken: 'destroyToken',
  destroyTokenFinish: 'destroyTokenFinish',
}

export const deliver = {
  request: 'DELIVER_REQUEST'
}

export const amazon = {

}

export const batchActionsType = 'BATCH_ACTIONS'

const actionTypes = {
  batchActionsType,
  user,
  deliver,
  amazon
}

export default actionTypes;