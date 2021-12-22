const SEARCH_USER = 'users/SEARCH_USER'

const findUser = data => {
  return {
    type: SEARCH_USER,
    data
  }
}

export const searchUser = (searchParam) => async dispatch => {
  const response = await fetch('/api/users/search', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(searchParam)
  })
  const data = await response.json()
  dispatch(findUser(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case SEARCH_USER:
        newState = {}
        action.data.users.forEach(user => newState[user.id] = user)
        return newState
      default:
        return state;
    }
  }