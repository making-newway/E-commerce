import * as ActionType from "../ActionTypes";

const initialState = {
    loading: false,
    products: []
}

export const prodReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_PRO_BY_SLUG_SUCCESS:
            state = {
                ...initialState,
                products: action.payload
            }
            break;

        case ActionType.GET_PRO_BY_SLUG_REQUEST:
            state = {
                ...initialState,
                loading:true
            }
            break;
    
        default:
            break;
    }

    return state
}
