const GET_COORDINATES = "GET_COORDINATES"

export const getCoordinates = (coordinates) => ({
  type: GET_COORDINATES,
  payload: coordinates,
})

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
  switch (action.type) {
    case GET_COORDINATES:
      return action.payload
    default:
      return state
  }
}
