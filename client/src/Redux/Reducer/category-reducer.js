import * as ActionType from "../ActionTypes";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategory = (id, categories, category) => {
    let newCatgory = [];

    if(id == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ]
    }

    for(let cate of categories) {
        if(cate._id == id) {
            newCatgory.push({
                ...cate,
                children: cate.children ? buildNewCategory(id, [...cate.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            })
        } else {
            newCatgory.push({
                ...cate,
                children: cate.children ? buildNewCategory(id, cate.children, category) : []
            })
        }
    }

    return newCatgory;
}

export const catReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionType.GET_CAT_REQUEST:
        case ActionType.ADD_NEW_CAT_REQUEST:
            state = {
                ...initialState,
                loading: true
            }
            break;

        case ActionType.GET_CAT_SUCCESS:
            state = {
                ...initialState,
                categories: action.payload.categories
            }
            break;

        case ActionType.ADD_NEW_CAT_SUCCESS:
            const newCat = action.payload.category;
            state = {
                ...state,
                loading:false,
                categories: buildNewCategory(newCat.parentId, state.categories, newCat)
            }
            break;

        case ActionType.GET_CAT_FALIURE:
        case ActionType.ADD_NEW_CAT_FALIURE:
            state = {
                ...initialState,
                error: action.payload.error
            }
            break;

        
        default:
            break;
    }

    return state;
}