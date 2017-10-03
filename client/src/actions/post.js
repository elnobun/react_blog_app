import uuidv4 from 'uuid/v4'
import api from '../utils/api'

export const FETCH_POST = 'FETCH_POST';
export const RESET_POST = 'RESET_POST';
export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';


/* API Requests to server */
export function fetchPostAsync (postId) {
  return dispatch =>
    api
      .get(`/posts/${postId}`)
      .then(response => response.data)
      .then(data => dispatch(fetchPost(data)), error => console.error(error))
}


export function createPostAsync ({post}) {
  const postData = {...post, id: uuidv4(), timestamp: Date.now()};
  return dispatch =>
    api
      .post(`/posts`, postData)
      .then(response => response.data)
      .then(
        data => {
          dispatch(createPost(postData));
          return postData
        },
        error => console.error(error)
      )
}

export function editPostAsync ({postId, post}) {
  return dispatch =>
    api
      .put(`/posts/${postId}`, post)
      .then(response => response.data)
      .then(data => dispatch(editPost(post)), error => console.error(error))
}

export function deletePostAsync ({postId}) {
  return dispatch =>
    api
      .delete(`/posts/${postId}`)
      .then(response => response.data)
      .then(
        data => dispatch(deletePost({postId})),
        error => console.error(error)
      )
}

export function votePostAsync ({postId, vote}) {
  return dispatch =>
    api
      .post(`/posts/${postId}`, {option: vote})
      .then(response => response.data)
      .then(data => dispatch(votePost(data)), error => console.error(error))
}

/* REFRESH posts if it has empty data */
export function resetPost () {
  return {
    type: RESET_POST,
    data: {}
  }
}

/*  ACTION CREATORS */
function fetchPost (data) {
  return {
    type: FETCH_POST,
    data
  }
}

function createPost (data) {
  return {
    type: CREATE_POST,
    data
  }
}

function editPost (data) {
  return {
    type: EDIT_POST,
    data
  }
}

function deletePost (data) {
  return {
    type: DELETE_POST,
    data
  }
}

function votePost (data) {
  return {
    type: VOTE_POST,
    data
  }
}
