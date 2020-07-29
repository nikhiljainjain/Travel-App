import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
    const { state, login, clearErrMsg } = useContext(AuthContext);
    let errorMsg=state.errorMsg,
    onSubmit = (email, password) => login({ email, password }), 
    header="Login",
    signUp=false,
    navigationText="Don't have an account",
    navigationTo=() => navigation.navigate("Signup");
    const variable = [errorMsg, onSubmit, header, signUp, navigationText, navigationTo, clearErrMsg];
    
    return (
        <>
            <NavigationEvents onWillBlur={clearErrMsg} />
            <AuthForm variables={variable} />
        </>
    );
};

LoginScreen.navigationOptions = {
    header: null
};

export default  LoginScreen;