import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { Text, Button, Header } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AccountScreen = () => {
    const { signout, state: { name } } =  useContext(AuthContext); 

    return (
        <>
            <Header backgroundColor="#fff"
                centerComponent={{ text: 'Account Detail', style: {fontSize: 30, color: '#000'}}}
                />
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                <View style={styles.detailBox}>
                    <MaterialCommunityIcons  name="account" size={30} />
                    <Text style={styles.name}>{name}</Text>
                </View>
                <Button 
                    title="Sign Out"
                    raised={true}
                    type="outline" 
                    style={styles.signout}
                    onPress={signout}
                />
            </SafeAreaView>
        </>
    );
};

AccountScreen.navigationOptions = {
    title: "Account",
    tabBarIcon: <MaterialCommunityIcons  name="account-outline" size={30} />
};

const styles = StyleSheet.create({
    name: {
        fontSize: 30,
    },

    userIcon: {

    },

    detailBox: {
        flexDirection: "row",
        padding: 20,
        justifyContent:"space-evenly"
    },  

    signout:{
        position: "absolute",
        bottom: 3
    },

    header: {
        fontSize: 30,
        padding: 10,
        textAlign: "center"
    },

    text: {
        margin: 10,
        color: "blue",
        textAlign: "center" 
    },

    container: {
        marginBottom: 150,
        marginHorizontal: 10,
        flex: 1,
        //justifyContent: "center",
    },
});

export default  AccountScreen;