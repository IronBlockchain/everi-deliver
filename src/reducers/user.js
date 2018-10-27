import _ from "lodash"
import { user as types} from './actionTypes'

const user = (state = {}, action) => {
    switch (action.type) {
        case types.issue:
            console.log("issue token")
            return state
        default:
            return state
    }
}

export default user