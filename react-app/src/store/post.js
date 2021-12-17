const GET_ALL_POSTS = 'users/GET_ALL_Posts'
const CREATE_NEW_POST = 'users/CREATE_NEW_POST'

const showPosts = data => {
  return {
    type: GET_ALL_POSTS,
    data
  }
}

const newPost = data => {
  return {
    type: CREATE_NEW_POST,
    data
  }
}

export const getPosts = (id) => async dispatch => {
  const response = await fetch(`/api/post/${id}`)
  const data = await response.json()
  dispatch(showPosts(data))
}

export const createPost = (data) => async dispatch => {
  const response = await fetch('/api/post/new', {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  })
  const post = await response.json()
  dispatch(newPost(post))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_POSTS:
        newState = {...state}
        action.data.posts.forEach(post => newState[post.id] = post)
        return newState
        case CREATE_NEW_POST:
          newState = {...state}
          newState[action.data['id']] = action.data
          return newState
      default:
        return state;
    }
  }
