const GET_LIST = 'GET_LIST'


// ACTIONS
export const getList = data => ({
    type: GET_LIST,
    payload: data
})


// REDUCER

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case GET_LIST:
            return action.payload
        default:
            return state
    }
}
