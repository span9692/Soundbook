const GET_FRIENDS = 'users/GET_FRIENDS'
const ADD_FRIENDS = 'users/ADD_FRIENDS'
const ADD_NEW_FRIENDS = 'users/ADD_NEW_FRIENDS'
const CANCEL_REQUEST = 'user/CANCEL_REQUEST'

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

const removeRequest = data => {
  return {
    type: CANCEL_REQUEST,
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

export const cancelRequest = (adderId, recieverId) => async dispatch => {
  const response = await fetch(`/api/friend/cancel`, {
    method: "DELETE",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({adderId, recieverId})
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(removeRequest(data))
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
      case CANCEL_REQUEST:
        newState = {...state}
        for (let key in newState) {
          if (newState[key]['friendAdder_id'] === action.data['friends']['friendAdder_id'] && newState[key]['friendReceiver_id'] === action.data['friends']['friendReceiver_id']) {
            delete newState[key]
          }
        }
        return newState
      default:
        return state;
    }
  }
