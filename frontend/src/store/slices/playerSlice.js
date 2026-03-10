import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    quality: 'auto',
    currentVideoId: null,
};

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
            state.isMuted = action.payload === 0;
        },
        toggleMute: (state) => {
            state.isMuted = !state.isMuted;
        },
        setQuality: (state, action) => {
            state.quality = action.payload;
        },
        resetPlayer: (state) => {
            return initialState;
        },
    },
});

export const {
    togglePlay,
    setPlaying,
    setCurrentTime,
    setDuration,
    setVolume,
    toggleMute,
    setQuality,
    resetPlayer
} = playerSlice.actions;

export default playerSlice.reducer;
