const GET_SOCKET_REF = 'GET_SOCKET_REF'

// ACTIONS
export const getSocketRef = (data) => ({
    type: GET_SOCKET_REF,
    payload: data
})

// REDUCER
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
    switch (action.type) {
        case GET_SOCKET_REF:
            return action.payload
        default:
            return state
    }
}
