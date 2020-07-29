import { useEffect, useState } from "react";
import { requestPermissionsAsync, watchPositionAsync, Accuracy } from "expo-location";


export default (shouldTrack, callback) => {
    const [err, setErr] = useState(null);

    useEffect(() => {
        let subscriber;

        const startTracking = async () => {
            try {
                await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, 
                callback
                ); 
            }catch(e){
                setErr(e);
            }
        };    

        (shouldTrack) ? startTracking() : (( subscriber ?  subscriber.remove(): null) && (subscriber = null));

        return () => {
            subscriber ? (subscriber.remove()) : null;
        };

    }, [shouldTrack, callback]);

    return [err];
};