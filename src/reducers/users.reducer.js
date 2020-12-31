const GET_USERDATA = 'GET_USERDATA'

// ACTIONS

export const getUserData = data => ({
    type: GET_USERDATA,
    payload: data
})
//export const getUserData = data => (console.log(data))

//REDUCER

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type) {
        case GET_USERDATA:
            return action.payload
        default:
            return state
    }
}