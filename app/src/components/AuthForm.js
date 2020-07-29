import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Input, Text, Header } from "react-native-elements";
import Spacer from "./Spacer";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const AuthForm = ({ variables }) => {
    const [errorMsg, onSubmit, header, signUp, navigationText, navigationTo, clearErrMsg] = variables;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [disable, setDisable] = useState(false);
    const [name, setName] = useState("");

    return (<>
        <View style={styles.header}>
            <Header backgroundColor="#fff"
                centerComponent={{ text: `${header} for Tracker`, style: {fontSize: 30, color: '#000'}}}
                />
        </View>
        <View style={styles.container}>
            <Spacer />
            { signUp ? (<Input 
                    autoCapitalize="words"
                    autoCorrect={false}
                    label="Name" 
                    value={name} 
                    rightIcon={<AntDesign 
                        name="user" size={30} color="black"
                    />}
                    onChangeText={(newName) => setName(newName)} />): null }
            <Spacer />
            <Input 
                autoCapitalize="none"
                autoCorrect={false}
                label="Email" 
                rightIcon={
                    <MaterialCommunityIcons name='email-outline' size={30}
                    /> }
                value={email} 
                onChangeText={(newEmail) => setEmail(newEmail)} />
            <Spacer />
            
            <Input
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false} 
                rightIcon={
                    <MaterialCommunityIcons name='lock-outline' size={30}
                    /> }
                label="Password" 
                value={password} 
                onChangeText={(newPassword) => setPassword(newPassword)} 
                />
            
            <Spacer />
            { errorMsg ?  (<Spacer><Text style={styles.error}>{errorMsg}</Text></Spacer>) : null }
            <Button 
                title={header} 
                type="outline" 
                loading={loader}
                raised={true}
                disabled={disable}
                style={styles.btn}
                onPress={() => {
                    clearErrMsg();
                    setLoader(true);
                    setDisable(true);
                    signUp ? onSubmit(name, email, password): onSubmit(email, password);
                    setTimeout(() => {
                        setLoader(false);
                        setDisable(false);
                    }, 5000);
                }}    
            />
            <Spacer />
            <Button 
                type="clear" 
                title={navigationText} 
                onPress={navigationTo}    
            />
        </View>
    </>);
};

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        color: "black",
        justifyContent: "flex-start"
    },

    container: {
        marginHorizontal: 10,
        flex: 1,
        justifyContent: "space-evenly",
    },

    error: {
        color: "red",
        fontSize: 30,
        textAlign: "center"
    },

    btn:{
        borderColor: "black",
        color: "black"
    }
});

export default  AuthForm;