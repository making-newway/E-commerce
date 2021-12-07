import * as ActionType from "./ActionTypes";
import axios from "../axios";

export const login = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type: ActionType.LOGIN_REQUEST });
        const res = await axios.post('admin/signin', {
            ...user
        });

        if(res.status === 200 || res.status === 201) {
            const { token, User } = res.data;
            localStorage.setItem("Token", token);
            localStorage.setItem("User", JSON.stringify(User));
            dispatch({
                type : ActionType.LOGIN_SUCCESS,
                payload : { token, User },
            });
        } else if(res.status === 400) {
            dispatch({
                type : ActionType.LOGIN_FALIURE,
                payload : {error : res.data.error }
            });
        }
    }
}

export const signup = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type: ActionType.SIGNUP_REQUEST });
        const res = await axios.post('admin/signup', {
            ...user
        });

        if(res.status === 200 || res.status === 201) {
            const { message } = res.data;
            dispatch({
                type : ActionType.SIGNUP_SUCCESS,
                payload : { message },
            });
        } else if(res.status === 400) {
            dispatch({
                type : ActionType.SIGNUP_FALIURE,
                payload : {error : res.data.error }
            });
        }
    }
}

export const isUserLog = () => {
    return async (dispatch) => {
        const token = localStorage.getItem("Token");
        if(token) {
            const User = JSON.parse(localStorage.getItem("User"));
            dispatch({
                type : ActionType.LOGIN_SUCCESS,
                payload : { token, User },
            });
        } else {
            dispatch({
                type : ActionType.LOGIN_FALIURE,
                payload : {error : "Failed to Login" }
            });
        }
    }
}

export const signout = () => {
    return async (dispatch) => {

        dispatch({ type: ActionType.LOGOUT_REQUEST });
        const res = await axios.post("admin/signout");

        if(res.status === 200 || res.status === 201) {
            localStorage.clear();
            dispatch({
                type: ActionType.LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type : ActionType.LOGOUT_FALIURE,
                payload : { error : res.data.error }
            })
        }
    }
}

export const getAllCategory = () => {
    return async (dispatch) => {

        dispatch({ type: ActionType.GET_CAT_REQUEST });
        const res = await axios.get('category/getCategory');

        if(res.status === 200 || res.status === 201) {
            const { categoriesList } = res.data;
            
            dispatch({
                type: ActionType.GET_CAT_SUCCESS,
                payload: { categories: categoriesList }
            })
        } else {
            dispatch({
                type: ActionType.GET_CAT_FALIURE,
                payload: res.data.error
            })
        }
    }
}

export const addCategory = (form) => {
    return async (dispatch) => {

        dispatch({ type: ActionType.ADD_NEW_CAT_REQUEST });
        const res = axios.post('category/create', form);

        if(res.status === 200 || res.status === 201) {
            console.log(res);
            
            dispatch({
                type: ActionType.ADD_NEW_CAT_SUCCESS,
                payload: {category : res.data.category}
            })
        } else {
            dispatch({
                type: ActionType.ADD_NEW_CAT_FALIURE,
                payload: res.data.error
            })
        }
    }
}

export const addProduct = (form) => {
    return async (dispatch) => {
        const res = axios.post('product/create', form);
        console.log(res);
    }
}

export const updateCategory = (form) => {
    return async (dispatch) => {

        const res = await axios.post('category/update', form);
        console.log(res);
        if(res.status === 200 || res.status === 201) {
            return true;
        } else {
            console.log(res);
        }
    }
}

export const getData = () => {
    return async (dispatch) => {
        
        const res = await axios.get('data');

        if(res.status === 200 || res.status === 201) {

            const { categories, products } = res.data;
            dispatch({
                type: ActionType.GET_CAT_SUCCESS,
                payload: {categories}
            });

            dispatch({
                type: ActionType.GET_PRO_SUCCESS,
                payload: {products}
            })

        }

    }
}