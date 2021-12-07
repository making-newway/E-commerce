import * as ActionType from "../ActionTypes";

const initialState = {
    loading: false,
    products: []
}

export const prodReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.GET_PRO_SUCCESS:
            state = {
                ...initialState,
                products: action.payload.products
            }
            break;

        case ActionType.GET_PRO_REQUEST:
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
