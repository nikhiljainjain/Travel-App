import createDataContext from "./createDataContext";
import trackApi from "../api/trackerApi";

const trackReducer = (state, action) => {
    switch(action.type){
        case "fetch_tracks":
            return action.payload;
        default: 
            return state;
    }
};

const fetchTracks = dispatch => async () => {
    const { data } = await trackApi.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: data});
};

const createTrack = dispatch => async (name, locations) => {
    await trackApi.post("/tracks", { name, locations });
};


export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack},
    []
);