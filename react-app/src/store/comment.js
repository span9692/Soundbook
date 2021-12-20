const GET_ALL_Comments = 'users/GET_ALL_Comments'
const ADD_NEW_COMMENT ='users/ADD_NEW_COMMENT'

const showComments = data => {
  return {
    type: GET_ALL_Comments,
    data
  }
}

const addComment = data => {
  return {
    type: ADD_NEW_COMMENT,
    data
  }
}

export const getComments = (id) => async dispatch => {
  const response = await fetch(`/api/comment/${id}`)
  const data = await response.json()
  dispatch(showComments(data))
}

export const newComment = (data) => async dispatch => {
  console.log(data)
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
        // console.log('newState', newState)
        // console.log('action.data', action.data)
        return newState
      default:
        return state;
    }
  }
