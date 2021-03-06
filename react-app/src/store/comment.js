const GET_ALL_Comments = 'users/GET_ALL_Comments'
const ADD_NEW_COMMENT ='users/ADD_NEW_COMMENT'
const DELETE_COMMENT ='users/DELETE_COMMENT'
const EDIT_COMMENT = 'users/EDIT_COMMENT'

const showComments = data => {
  return {
    type: GET_ALL_Comments,
    data
  }
}

export const addComment = data => {
  return {
    type: ADD_NEW_COMMENT,
    data
  }
}

export const deleteOneComment = data => {
  return {
    type: DELETE_COMMENT,
    data
  }
}

export const modifyComment = data => {
  return {
    type: EDIT_COMMENT,
    data
  }
}

export const getComments = (id) => async dispatch => {
  const response = await fetch(`/api/comment/${id}`)
  const data = await response.json()
  dispatch(showComments(data))
}

export const newComment = (data) => async dispatch => {
  const response = await fetch('/api/comment/new', {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const comment = await response.json()
    dispatch(addComment(comment))
  }
}

export const removeComment = (commentId) => async dispatch => {
  const response = await fetch(`/api/comment/${commentId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(deleteOneComment(commentId))
  }
}

export const changeComment = (commentId, editCommentValue) => async dispatch => {
  const response = await fetch (`/api/comment/edit`, {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({commentId, editCommentValue})
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(modifyComment(data))
  }
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_Comments:
        newState = {...state}
        action.data.comments.forEach(comment => newState[comment.id] = comment)
        return newState
      case ADD_NEW_COMMENT:
        newState = {...state}
        newState[action.data['id']] = action.data
        return newState
      case DELETE_COMMENT:
        newState = {...state}
        delete newState[action.data]
        return newState
      case EDIT_COMMENT:
        newState = {...state}
        newState[action.data['id']] = action.data
        return newState
      default:
        return state;
    }
  }
