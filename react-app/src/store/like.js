const GET_ALL_LIKES = 'likes/GET_ALL_LIKES'
const NEW_LIKE_POST = 'likes/NEW_LIKE_POST'
const REMOVE_LIKE_POST = 'likes/REMOVE_LIKE_POST'

const showLikes = data => {
    return {
        type: GET_ALL_LIKES,
        data
    }
}

const newLikePost = data => {
    return {
        type: NEW_LIKE_POST,
        data
    }
}

const deleteLikePost = data => {
    return {
        type: REMOVE_LIKE_POST,
        data
    }
}

export const getAllLikes = () => async dispatch => {
    const response = await fetch('/api/like/')

    if (response.ok) {
        const data = await response.json();
        dispatch(showLikes(data))
    }
}

export const postLike = (postId, userId) => async dispatch => {
    const response = await fetch(`/api/like/post`, {
        method:"POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({postId, userId})
    })

    if (response.ok) {
        const data = await response.json()
        dispatch(newLikePost(data))
    }
}

export const postUnlike = (postId, userId) => async dispatch => {
    const response = await fetch(`/api/like/post/${postId}/${userId}`, {
        method:"DELETE"
    })
    if (response.ok) {
        dispatch(deleteLikePost({postId, userId}))
    }
}

export default function reducer(state = {}, action) {
    let newState;
        switch (action.type) {
            case GET_ALL_LIKES:
                newState = {...state}
                action.data.likes.map(like => newState[like.id] = like)
                return newState
            case NEW_LIKE_POST:
                newState = {...state}
                newState[action.data.id] = action.data
                return newState
            case REMOVE_LIKE_POST:
                newState = {...state}
                // console.log("newState", newState)
                // console.log("action.data", action.data)
                for (let key in newState) {
                    if (newState[key].post_id === action.data.postId && newState[key].user_id === action.data.userId) {
                        delete newState[key]
                    }
                }
                return newState
            default:
                return state;
        }
}