const GET_FRIENDS = 'users/GET_FRIENDS'

const showFriends = data => {
  return {
    type: GET_FRIENDS,
    data
  }
}

export const getFriends = (id) => async dispatch => {
  const response = await fetch(`/api/friend/${id}`)
  const data = await response.json()
  console.log('data back in the thunk', data)
  dispatch(showFriends(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_FRIENDS:
        newState = action.data.friends
        return newState
      default:
        return state;
    }
  }
