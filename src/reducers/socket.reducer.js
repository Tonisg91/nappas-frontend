const GET_SOCKET_REF = 'GET_SOCKET_REF'
const REMOVE_SOCKET = 'REMOVE_SOCKET'

// ACTIONS
export const getSocketRef = (data) => ({
    type: GET_SOCKET_REF,
    payload: data
})

export const removeSocket = () => ({
    type: REMOVE_SOCKET
})

// REDUCER
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = null, action) => {
    switch (action.type) {
        case GET_SOCKET_REF:
            return action.payload
        case REMOVE_SOCKET:
            return null
        default:
            return state
    }
}
