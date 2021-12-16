const GET_ALL_USERS = 'users/GET_ALL_USERS'

const getUsers = data => {
  return {
    type: GET_ALL_USERS,
    data
  }
}


export default function reducer(state = {}, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
