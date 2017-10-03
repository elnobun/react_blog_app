import {
  FETCH_POST,
  RESET_POST,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from '../actions/post'

function post (state = {}, action) {
  switch (action.type) {
    case RESET_POST:
    case FETCH_POST:
    case CREATE_POST:
    case EDIT_POST:
    case DELETE_POST:
    case VOTE_POST:
      return action.data;
    default:
      return state
  }
}

export default post
