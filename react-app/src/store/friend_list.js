const GET_FRIENDS = 'users/GET_FRIENDS'
const ADD_FRIENDS = 'users/ADD_FRIENDS'
const ADD_NEW_FRIENDS = 'users/ADD_NEW_FRIENDS'

const showFriends = data => {
  return {
    type: GET_FRIENDS,
    data
  }
}

const first = data => {
  return {
    type: ADD_FRIENDS,
    data
  }
}

const addNewFriend = data => {
  return {
    type: ADD_NEW_FRIENDS,
    data
  }
}

export const getFriends = (id) => async dispatch => {
  const response = await fetch(`/api/friend/${id}`)
  const data = await response.json()
  dispatch(showFriends(data))
}

export const firstFriend = (adderId, recieverId) => async dispatch => {
  const response = await fetch(`/api/friend/first`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({adderId, recieverId})
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(first(data))
  }
}

export const addFriend = (adderId, recieverId) => async dispatch => {
  const response = await fetch(`/api/friend/add`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({adderId, recieverId})
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(addNewFriend(data))
  }
}

export default function reducer(state = {}, action) {
  let newState;
  let count;
    switch (action.type) {
      case GET_FRIENDS:
        newState = action.data.friends
        return newState
      case ADD_FRIENDS:
        newState = {...state}
         count = Object.values(newState).length
        newState[count] = action.data.friends
        return newState
      case ADD_NEW_FRIENDS:
        newState = {...state}
        count = Object.values(newState).length
        newState[count] = action.data.friends
        return newState
      default:
        return state;
    }
  }
