import React, { useContext, useEffect } from "react";
import { Context as AuthContext } from "../context/AuthContext";
import { EvilIcons } from "@expo/vector-icons";

const LoadingScreen = () => {
    const { tryLocalSignin } = useContext(AuthContext);

    useEffect(() => {
        tryLocalSignin(); 
    }, []);

    return (
        <>
            <EvilIcons name="spinner" size={200} style={{top: "40%", left: "25%"}} />
        </>
    );
    nav
};

export default LoadingScreen;