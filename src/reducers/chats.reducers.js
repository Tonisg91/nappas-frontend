const GET_CHAT = 'GET_CHAT'
const ADD_MSG = 'ADD_MSG'

// ACTIONS
export const getChat = (data) => ({
    type: GET_CHAT,
    payload: data
})

export const addMessage = (data) => ({
    type: ADD_MSG,
    payload: data
})

// REDUCER
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type) {
        case GET_CHAT:
            return action.payload
        case ADD_MSG:
            console.log('REDUCER', action.payload)
            return Object.assign([], state, action.payload)
        default:
            return state
    }
}
