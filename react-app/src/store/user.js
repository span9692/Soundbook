const GET_ALL_USERS = 'users/GET_ALL_USERS'

const showUsers = data => {
  return {
    type: GET_ALL_USERS,
    data
  }
}

export const getUsers = () => async dispatch => {
  const response = await fetch('/api/users/')
  const data = await response.json()
  dispatch(showUsers(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_USERS:
        newState = {...state}
        action.data.users.forEach(user => newState[user.id] = user)
        return newState
      default:
        return state;
    }
  }
