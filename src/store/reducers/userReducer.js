const INITIAL_STATE = {
    user: null,
}

export function userReducer(state = INITIAL_STATE,action) {
    switch (action.type) {
        case 'GET_USER':
            return {
                ...state,
                user: {...action.user}
            }
        case 'ADD_MOVE':
            return {
                ...state,
                user: {...state.user.coins - action.user.amount}
            }
        case 'SIGN_OUT':
            return {
                ...state,
                user: {...state.user,user:null}
            }
        default:
            return state
    }
}