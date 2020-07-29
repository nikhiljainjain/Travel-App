import React, { useContext } from "react";
import AuthForm from "../components/AuthForm";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrMsg } = useContext(AuthContext);

    let errorMsg=state.errorMsg,
    onSubmit = (name, email, password) => signup({ name, email, password }), 
    header="Signup",
    signUp=true,
    navigationText="Already have an account",
    navigationTo=() => navigation.navigate("Login");
    const variable = [errorMsg, onSubmit, header, signUp, navigationText, navigationTo, clearErrMsg];
    
    return (
        <>  
            <NavigationEvents onWillBlur={clearErrMsg} />	
            <AuthForm variables={variable} />
        </>
    )
};

SignupScreen.navigationOptions = {
    header: null
};

export default  SignupScreen;