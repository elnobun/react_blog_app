/* Here we also make API calls, and create the Action Creators */

// UUID is preferable to create random id
import uuid from 'uuid/v4'
import api from '../utils/api'

export const FETCH_POST_COMMENTS = 'FETCH_POST_COMMENTS';
export const CREATE_POST_COMMENT = 'CREATE_POST_COMMENT';
export const EDIT_POST_COMMENT = 'EDIT_POST_COMMENT';
export const DELETE_POST_COMMENT = 'DELETE_POST_COMMENT';
export const VOTE_POST_COMMENT = 'VOTE_POST_COMMENT';

// Make API call to perform CRUD operations on Post comments as well as votes
export function fetchPostCommentsAsync (postId) {
  return dispatch =>
    api
      .get(`/posts/${postId}/comments`)
      .then(response => response.data)
      .then(
        data => dispatch(fetchPostComments(data)),
        error => console.error(error)
      )
}

export function deletePostCommentAsync ({commentId}) {
  return dispatch =>
    api
      .delete(`/comments/${commentId}`)
      .then(response => response.data)
      .then(
        data => dispatch(deletePostComment(data)),
        error => console.error(error)
      )
}

export function createPostCommentAsync ({body, author, parentId}) {
  return dispatch =>
    api
      .post(`/comments`, {
        id: uuid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
      })
      .then(response => response.data)
      .then(
        data => dispatch(createPostComment(data)),
        error => console.error(error)
      )
}

export function editPostCommentAsync ({id, body, author}) {
  return dispatch =>
    api
      .put(`/comments/${id}`, {body, author})
      .then(response => response.data)
      .then(
        data => dispatch(editPostComment(data)),
        error => console.error(error)
      )
}

export function votePostCommentAsync ({commentId, vote}) {
  return dispatch =>
    api
      .post(`/comments/${commentId}`, {option: vote})
      .then(response => response.data)
      .then(
        data => dispatch(votePostComment(data)),
        error => console.error(error)
      )
}

/* ACTION CREATORS */
// Make the ACTION creators, passing in the type and argument
function fetchPostComments (data) {
  return {
    type: FETCH_POST_COMMENTS,
    data
  }
}

function createPostComment (data) {
  return {
    type: CREATE_POST_COMMENT,
    data
  }
}

function editPostComment (data) {
  return {
    type: EDIT_POST_COMMENT,
    data}
}

function deletePostComment (data) {
  return {
    type: DELETE_POST_COMMENT,
    data}
}

function votePostComment (data) {
  return {
    type: VOTE_POST_COMMENT,
    data
  }
}
