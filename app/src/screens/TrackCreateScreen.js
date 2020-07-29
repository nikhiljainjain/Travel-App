//import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import { Text, Header } from "react-native-elements";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext"; 
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
    const { state: { recording }, addLocation } = useContext(LocationContext);
    const callback = useCallback(location => {
        addLocation(location, recording);
    }, [recording]);//rebuild add-location callback function when recording change
    const [err] = useLocation( isFocused || recording, callback);

    return (
        <>
            <Header backgroundColor="#fff"
                centerComponent={{ text: 'Record Track', style: {fontSize: 30, color: '#000'}}}
                />
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                    <Map />
                    { err ? <Text style={styles.error}>Please grant permission for location to use this app</Text> : null}
                    <TrackForm />
            </SafeAreaView>
        </>
    );
};

TrackCreateScreen.navigationOptions = {
    title: "Add Track",
    tabBarIcon: <MaterialCommunityIcons  name="map-marker-plus" size={30} />
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: '#fff',
        textAlign: "center"
    },

    container: {
        //marginBottom: 150,
        marginHorizontal: 10,
        flex: 1
    },

    error: {
        color: "red",
        fontSize: 30,
        textAlign: "center"
    }
});

export default  withNavigationFocus(TrackCreateScreen);