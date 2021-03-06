const GET_FRIENDS = 'users/GET_FRIENDS'
const ADD_FRIENDS = 'users/ADD_FRIENDS'
const ADD_NEW_FRIENDS = 'users/ADD_NEW_FRIENDS'
const CANCEL_REQUEST = 'user/CANCEL_REQUEST'
const ACCEPT_REQUEST = 'user/ACCEPT_REQUEST'

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

export const addNewFriend = data => {
  return {
    type: ADD_NEW_FRIENDS,
    data
  }
}

export const removeRequest = data => {
  return {
    type: CANCEL_REQUEST,
    data
  }
}

export const yesRequest = data => {
  return {
    type: ACCEPT_REQUEST,
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
  // if (response.ok) {
  //   const data = await response.json();
  //   dispatch(addNewFriend(data))
  // }
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

export const confirmRequest = (recieverId, adderId) => async dispatch => {
  const response = await fetch('/api/friend/accept', {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({recieverId, adderId})
  })
  if (response.ok) {
    const data = await response.json();
    dispatch(yesRequest(data))
  }
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_FRIENDS:
        newState = action.data.friends
        return newState
      case ADD_FRIENDS:
        newState = [...state]
        newState.push(action.data.friends)
        return newState
      case ADD_NEW_FRIENDS:
        newState = [...state]
        newState.push(action.data.friends)
        return newState
      case CANCEL_REQUEST:
        newState = [...state]
        for (let i = 0; i < newState.length; i++) {
          if ((newState[i]['friendAdder_id'] === action.data['friends']['friendAdder_id'] && newState[i]['friendReceiver_id'] === action.data['friends']['friendReceiver_id']) || (newState[i]['friendAdder_id'] === action.data['friends']['friendReceiver_id'] && newState[i]['friendReceiver_id'] === action.data['friends']['friendAdder_id'])) {
            newState.splice(i,1)
            return newState
          }
        }
        case ACCEPT_REQUEST:
          newState = [...state]
          for (let i = 0; i < newState.length; i++) {
            if ((newState[i]['friendAdder_id'] === action.data['friends']['friendAdder_id'] && newState[i]['friendReceiver_id'] === action.data['friends']['friendReceiver_id']) || (newState[i]['friendAdder_id'] === action.data['friends']['friendReceiver_id'] && newState[i]['friendReceiver_id'] === action.data['friends']['friendAdder_id'])) {
              newState[i]['confirmed'] = true;
              return newState
            }
          }
      default:
        return state;
    }
  }
