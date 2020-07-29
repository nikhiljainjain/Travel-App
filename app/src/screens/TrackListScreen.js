import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { ListItem, Text } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const TrackListScreen = ({ navigation }) => {
    const { fetchTracks, state } = useContext(TrackContext);

    return (
        <>
            <NavigationEvents onWillFocus={fetchTracks} />
            <Header backgroundColor="#fff"
                centerComponent={{ text: 'Track List', style: {fontSize: 30, color: '#000'}}}
                />
            <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
                { state.length > 0 ? (<FlatList
                        data={state}
                        keyExtractor={item => item._id}
                        renderItem={({item: { name, _id}}) => {
                            return (
                                <TouchableOpacity onPress={() =>{
                                    navigation.navigate("TrackDetail", { _id });
                                }}>
                                    <ListItem title={name} />
                                </TouchableOpacity>
                            );
                        }}
                    />) : (<Text h1>
                        No data available
                    </Text>)}    
            </SafeAreaView>
        </>
    );
};

TrackListScreen.navigationOptions = {
    header: null
};

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        textAlign: "center",
        margin: 20,
        top: 0
    },

    container: {
        marginHorizontal: 10,
        flex: 1,
        justifyContent: "flex-start",
    },
});

export default TrackListScreen;