import createDataContext from "./createDataContext";
import trackerApi from "../api/trackerApi";
import { AsyncStorage } from "react-native";
import { navigate } from "../navigationRef";
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const authReducer = (state, action) => {
    switch(action.type){
        case "clearErrMsg":
            return { ...state, errorMsg: null };
        case "add_error":
            return { ...state, errorMsg: action.payload };
        case "signup" :
            return { ...state, errorMsg: null, token: action.payload.token, name: action.payload.name };
        case "signout":
            return { ...state, token: null, name: null};
        default: 
            return state;
    }
};

const tryLocalSignin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem("token");
    const name = await AsyncStorage.getItem("name");
    const data = { token, name };
    (token && name) ? (navigate("TrackList") && dispatch({ type: "signup", payload: data }) ): navigate("Login");
};

const signup = (dispatch) => async ({ name, email, password }) => {
    try{
        if (!emailRegex.test(String(email).toLowerCase()))
            throw "Invalid email";
        
        const { data } = await trackerApi.post("/signup", { name, email, password });
        
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('name', data.name);
        dispatch({ type: "signup", payload: data});
        navigate("TrackList");
    }catch(err){
        if (err == "Error: Request failed with status code 422")
            return dispatch({ type: "add_error", payload: "Email already exist" });
        dispatch({ type: "add_error", payload: (String(err)) });
    }
};

const login = (dispatch) => async ({ email, password }) => {
    try{
        if (!emailRegex.test(String(email).toLowerCase()))
            throw "Invalid email";
        
        const { data } = await trackerApi.post("/signin", { email, password });
        
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('name', data.name);
        dispatch({ type: "signup", payload: data });
        navigate("TrackList");
    }catch(err){
        if (err == "Error: Request failed with status code 422")
            return dispatch({ type: "add_error", payload: "Check your email and password" });
        dispatch({ type: "add_error", payload: (String(err)) });
    }
};

const signout = (dispatch) => async () => {
    try {
        //const { data } = await trackerApi.get('/signout');
        navigate("Login");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("name");
        dispatch({ type: "signout"});
    } catch(err){
        console.log(err);
    }
};

const clearErrMsg = (dispatch) =>  () => {
    dispatch({ type: "clearErrMsg" });
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signout, login, clearErrMsg, tryLocalSignin },
    { token: null, errorMsg: null, name: null }
);