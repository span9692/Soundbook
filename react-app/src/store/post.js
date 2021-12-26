const GET_ALL_POSTS = 'posts/GET_ALL_Posts'
const CREATE_NEW_POST = 'posts/CREATE_NEW_POST'
const DELETE_POST = 'posts/DELETE_POST'
const EDIT_POST = 'posts/EDIT_POST'

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

const removeOnePost = data => {
  return {
    type: DELETE_POST,
    data
  }
}

const modifyPost = data => {
  return {
    type: EDIT_POST,
    data
  }
}

export const getAllPosts = () => async dispatch => {
  const response = await fetch(`/api/post/`)
  const data = await response.json()
  dispatch(showPosts(data))
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

export const deletePost = (postId) => async dispatch => {
  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE"
  })
  if (response.ok) {
    dispatch(removeOnePost(postId))
  }
}

export const changePost = (postId, editValue) => async dispatch => {
  const response = await fetch('/api/post/edit', {
    method: "PUT",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({postId, editValue})
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(modifyPost(data))
  }
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
        case EDIT_POST:
          newState = {...state}
          newState[action.data.id] = action.data
          return newState
        case DELETE_POST:
          newState = {...state}
          delete newState[action.data]
          return newState
      default:
        return state;
    }
  }
