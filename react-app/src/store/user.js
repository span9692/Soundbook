const GET_ALL_USERS = 'users/GET_ALL_USERS'
const UPDATE_USER = 'users/UPDATE_USER'

const showUsers = data => {
  return {
    type: GET_ALL_USERS,
    data
  }
}

const updateUser = data => {
  return {
    type: UPDATE_USER,
    data
  }
}

export const getUsers = () => async dispatch => {
  const response = await fetch('/api/users/')
  const data = await response.json()
  dispatch(showUsers(data))
}

export const updateNameAlias = ({userId, firstName, lastName, alias}) => async dispatch => {
  const response = await fetch(`/api/auth/display/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName,
      lastName,
      alias
    }),
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
  }
}

export const updatePerson = ({userId, education, work, location, birthday, gender}) => async dispatch => {
  const response = await fetch(`/api/auth/update/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      education,
      work,
      location,
      birthday,
      gender
    }),
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
  }
}

export const updateCoverPic = ({userId, coverPhoto}) => async dispatch => {
  const response = await fetch(`/api/auth/cover/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      coverPhoto
    }),
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
  }
}

export const updatePicProfile = (formData) => async dispatch => {
  const userId = formData.get('userId')
  const response = await fetch(`/api/auth/profilephoto/${userId}`, {
    method: 'PUT',
    body: formData
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(updateUser(data))
  }
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_USERS:
        newState = {...state}
        action.data.users.forEach(user => newState[user.id] = user)
        return newState
      case UPDATE_USER:
        newState = {...state}
        newState[action.data.id] = action.data
        return newState
      default:
        return state;
    }
  }
