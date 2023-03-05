import {signin,signup,getuser} from '../api/serverApi';

export const signUp = (formData) => async (dispatch) => {
    try {
        const {data} = await signup(formData);
        dispatch({type: "auth",payload: data});
    } catch (error) {
        console.log(error);
    } 
}

export const signIn = (formData) => async (dispatch) => {
    try {
        const {data} = await signin(formData);
        dispatch({type: "auth",payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const setUser = (user) => {
    return {type: "set",payload: user};
}

export const getUser = () => async (dispatch) => {
    try {
        const {data} = await getuser();
        dispatch({type:"get",payload: data});
    } catch (error) {
        console.log(error);
    }
}