import {combineReducers} from 'redux'
import categories from './categories'
import posts from './posts'
import comments from './comments'
import post from './post'

export default combineReducers({
  categories,
  posts,
  comments,
  post
})
