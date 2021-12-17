const GET_ALL_Posts = 'users/GET_ALL_Posts'

const showPosts = data => {
  return {
    type: GET_ALL_Posts,
    data
  }
}

export const getPosts = (id) => async dispatch => {
  const response = await fetch(`/api/post/${id}`)
  const data = await response.json()
  console.log('data mmmmmmmmmmmmmmm', data)
  dispatch(showPosts(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_Posts:
        newState = {...state}
        action.data.posts.forEach(post => newState[post.id] = post)
        return newState
      default:
        return state;
    }
  }
