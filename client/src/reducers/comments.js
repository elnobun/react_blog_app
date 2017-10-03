import {orderBy, findIndex} from 'lodash'
import {
  FETCH_POST_COMMENTS,
  CREATE_POST_COMMENT,
  EDIT_POST_COMMENT,
  DELETE_POST_COMMENT,
  VOTE_POST_COMMENT
} from '../actions/comments'

export default function comments (state = [], action) {
  switch (action.type) {
    case FETCH_POST_COMMENTS:
      return orderBy(action.data, ['timestamp'], ['asc']);
    case CREATE_POST_COMMENT:
      const newState = state.concat([action.data]);
      return orderBy(newState, ['timestamp'], ['asc']);
    case EDIT_POST_COMMENT:
      const editPostIndex = findIndex(state, o => o.id === action.data.id);
      return [
        ...state.slice(0, editPostIndex),
        {...action.data},
        ...state.slice(editPostIndex + 1)
      ];
    case DELETE_POST_COMMENT:
      return state.filter(comment => comment.id !== action.data.id);
    case VOTE_POST_COMMENT:
      const votePostIndex = findIndex(state, o => o.id === action.data.id);
      return [
        ...state.slice(0, votePostIndex),
        {...action.data},
        ...state.slice(votePostIndex + 1)
      ];
    default:
      return state
  }
}
