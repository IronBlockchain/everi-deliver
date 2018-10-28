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
          notification: NotificationsEnums.TRANSFER_FINISH
        }
    case types.user.transferToAmazonFinish:
      return {...state,
        notification: NotificationsEnums.NEED_VALIDATION
      }
    case types.user.validate:
        return {...state,
          notification: NotificationsEnums.IS_PROVING
        }
    case types.user.proveAccess:
      return {...state,
        notification: NotificationsEnums.PROVING_FINISH
      }
    case types.user.proveFinish:
      return {...state,
        notification: NotificationsEnums.CRETE_ACCESS
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