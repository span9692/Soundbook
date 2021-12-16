const GET_ALL_PHOTOS = 'users/GET_ALL_PHOTOS'

const showPhotos = data => {
  return {
    type: GET_ALL_PHOTOS,
    data
  }
}

export const getPhotos = (id) => async dispatch => {
  const response = await fetch(`/api/photo/${id}`)
  const data = await response.json()
  dispatch(showPhotos(data))
}

export default function reducer(state = {}, action) {
  let newState;
    switch (action.type) {
      case GET_ALL_PHOTOS:
        newState = {...state}
        action.data.photos.forEach(photo => newState[photo.id] = photo)
        return newState
      default:
        return state;
    }
  }
