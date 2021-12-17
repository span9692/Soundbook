const GET_ALL_Comments = 'users/GET_ALL_Comments'

const showComments = data => {
  return {
    type: GET_ALL_Comments,
    data
  }
}

export const getComments = (id) => async dispatch => {
  const response = await fetch(`/api/comment/${id}`)
  const data = await response.json()
  dispatch(showComments(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_Comments:
        newState = {...state}
        action.data.comments.forEach(comment => newState[comment.id] = comment)
        return newState
      default:
        return state;
    }
  }
