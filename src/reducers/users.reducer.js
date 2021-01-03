const GET_USERDATA = "GET_USERDATA"
const LOGOUT = "LOGOUT"
// ACTIONS

export const getUserData = (data) => ({
  type: GET_USERDATA,
  payload: data,
})
export const logout = () => ({
  type: LOGOUT,
})

// REDUCER

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
  switch (action.type) {
    case GET_USERDATA:
      return action.payload
    case LOGOUT:
      return null
    default:
      return state
  }
}
