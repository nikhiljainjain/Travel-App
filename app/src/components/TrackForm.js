import React, { useContext} from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from '../components/Spacer';
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
    const { 
        state: { recording, name, locations },
        startRecording,
        stopRecording,
        changeName
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <View style={styles.container}>
            <Input 
                placeholder="Track Name" 
                value={name}
                onChangeText={changeName}    
                />
            <Spacer />
            { recording ? (
                <Button title="Stop" raised={true} onPress={stopRecording} />):(
                <Button title="Start Recording" raised={true} onPress={startRecording} />
            )}
            <Spacer />
            { (!recording && locations.length) ? (
                <Button title="Save Track" raised={true} onPress={saveTrack} />
            ): null}
            <Spacer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //marginTop: 5,
        marginHorizontal: 2,
        flex: 1,
        justifyContent: "center",
    }
});

export default TrackForm;