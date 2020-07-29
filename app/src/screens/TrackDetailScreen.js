import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline} from "react-native-maps";

const TrackDetailScreen = ({ navigation }) => {
    const id = navigation.getParam("_id");
    const { state } = useContext(TrackContext);

    const { locations, name } = state.find(i => i._id === id);

    return (
        <>
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                <Text style={styles.header}>
                    { name }
                </Text>
                <MapView 
                    style={styles.map}
                    initialRegion={{
                        ...(locations[0].coords),
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01
                    }} 
                    >
                    <Polyline coordinates={locations.map(loc => loc.coords)} />
                </MapView>
            </SafeAreaView>
        </>
    );
};

TrackDetailScreen.navigationOptions = {
    title: "Track Detail"
};

const styles = StyleSheet.create({
    header:{
        fontSize: 30,
        textAlign: "center"
    },

    container: {
        marginHorizontal: 10,
        flex: 1,
        //justifyContent: "center",
    },

    map: {
        height: "45%",
        marginVertical: 5,
        //paddingVertical: 2,
        borderRadius: 15
    }
});

export default  TrackDetailScreen;