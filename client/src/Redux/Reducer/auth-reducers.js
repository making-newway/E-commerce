import * as ActionType from "../ActionTypes";

const initialState = {
    token : null,
    user : {
        firstName : '',
        lastName : '',
        email : '',
        mobile : '',
    },
    authenticating : false,
    authenticate : false,
    error : null,
    message: '',
    loading: false
}


export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionType.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating : true
            }
            break;

        case ActionType.LOGIN_SUCCESS:
            state = {
                ...state,
                token : action.payload.token,
                user : action.payload.User,
                authenticate : true,
                authenticating : false
            }
            break;

        case ActionType.LOGOUT_REQUEST:
            state = {
                ...initialState,
                loading: true,
            }
            break;

        case ActionType.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;

        case ActionType.LOGOUT_FALIURE:
            state = {
                ...initialState,
                error : action.payload.error
            }
            break;
            
        default:
            break;

    }

    return state;
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionType.SIGNUP_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case ActionType.SIGNUP_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;

        case ActionType.SIGNUP_FALIURE:
            state = {
                ...state,
                loading: false,
                message: action.payload.error
            }
            break

        default:
            break;
    }

    return state;
}