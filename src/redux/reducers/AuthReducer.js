import * as T from '../Types';
const defaultState = {
    isLogin: false,
    user: {}
}

const AuthReducer = (state = defaultState, actions) => {
    switch (actions.type) {
        case T.LOGIN:
            state = {
                ...state,
                isLogin: true,
                user: actions.user
            }
            break;
        case T.LOGOUT:
            state = {
                ...state,
                isLogin: false,
                user: {}
            }
            break;
        default:
            break;
    }
    return state;
}
export default AuthReducer;