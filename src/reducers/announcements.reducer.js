const GET_LIST = 'GET_LIST'

// Actions

export const getList = data => ({
    type: GET_LIST,
    payload: data
})

// Reducer

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case GET_LIST:
            console.log('GET_LIST')
            break;
        default:
            return state
    }
}