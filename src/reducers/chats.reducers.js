const GET_CHAT = 'GET_CHAT'

// ACTIONS 
export const getChat = data => ({
    type: GET_CHAT,
    payload: data
})

// REDUCER
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case GET_CHAT:
            return action.payload
        default:
            return state
    }
}