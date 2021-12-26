const GET_ALL_LIKES = 'likes/GET_ALL_LIKES'

const showLikes = data => {
    return {
        type: GET_ALL_LIKES,
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

export default function reducer(state = {}, action) {
    let newState;
        switch (action.type) {
            case GET_ALL_LIKES:
                newState = {...state}
                action.data.likes.map(like => newState[like.id] = like)
                return newState
            default:
                return state;
        }
}