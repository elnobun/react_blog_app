import {orderBy} from 'lodash'
import {FETCH_POSTS, FETCH_CATEGORY_POSTS, SORT_POSTS} from '../actions/posts'

function posts (state = [], action) {
  switch (action.type) {
    case FETCH_POSTS:
      return action.data;
    case FETCH_CATEGORY_POSTS:
      return action.data;
    case SORT_POSTS:
      const desc = action.sortBy[0] === '-';
      const sortProperty = desc ? action.sortBy.slice(1) : action.sortBy;
      return orderBy([...state], [sortProperty], [desc ? 'desc' : 'asc']);
    default:
      return state
  }
}

export default posts
