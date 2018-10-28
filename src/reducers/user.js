import _ from "lodash"
import types from './actionTypes'
import {NotificationsEnums} from '../Enums'


const user = (state = {
    notification: NotificationsEnums.NO_NOTIFICATION
}, action) => {
  switch (action.type) {
    case types.deliver.request:
      console.log("request token in user")
      return {...state,
        notification: NotificationsEnums.IS_ISSUE_TOKEN
      };
    case types.user.issueStart:
        return {...state,
          notification: NotificationsEnums.IS_SENDING_TOKEN
        }
    case types.user.issueFinish:
        return {...state,
          notification: NotificationsEnums.NO_NOTIFICATION
        }
    case types.user.closeNotification:
        return {...state,
          notification: NotificationsEnums.NO_NOTIFICATION
        }
    default:
      return state
  }
}

export default user