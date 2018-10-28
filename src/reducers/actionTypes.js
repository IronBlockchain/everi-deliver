export const user = {
  issueStart: 'USER_ISSUE_START',
  issueFinish: 'USER_ISSUE_FINISH',
  closeNotification: 'CLOSE_NOTIFICATION'
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